#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import io
import json
import math
import mimetypes
import os
import struct
import threading
import urllib.error
import urllib.parse
import urllib.request
import wave
from dataclasses import dataclass
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any, Callable, Literal


OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses"
DEFAULT_MODEL = "gpt-4.1-mini"
DEFAULT_AIVIS_URL = "http://127.0.0.1:10101"
DEFAULT_TIMEOUT_SEC = 45.0
DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 8765
DEFAULT_STUB_REPLY = "了解だよ。動作確認はいい感じ。"
SYSTEM_PROMPT = (
    "あなたは親しみやすい日本語VTuberアシスタントです。"
    "返答は自然な話し言葉で、1〜2文、合計80文字以内にしてください。"
    "箇条書き、Markdown、絵文字、長い前置きは使わないでください。"
)


class ApiError(Exception):
    def __init__(self, status_code: int, message: str) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.message = message


Mode = Literal["stub", "openai+aivis"]


@dataclass(frozen=True)
class AppConfig:
    static_dir: Path
    mode: Mode
    openai_api_key: str | None
    openai_model: str
    aivis_engine_url: str | None
    aivis_style_id: int | None
    timeout_sec: float = DEFAULT_TIMEOUT_SEC
    stub_reply: str = DEFAULT_STUB_REPLY


def build_stub_wav(duration_sec: float = 0.6, *, sample_rate: int = 22050) -> bytes:
    amplitude = 0.18
    frames = int(duration_sec * sample_rate)
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        for i in range(frames):
            t = i / sample_rate
            env = min(1.0, t * 15.0) * min(1.0, (duration_sec - t) * 12.0)
            value = int(32767 * amplitude * env * math.sin(2.0 * math.pi * 440.0 * t))
            wav_file.writeframesraw(struct.pack("<h", value))
    return buf.getvalue()


def extract_output_text(response_payload: dict[str, Any]) -> str:
    texts: list[str] = []
    for item in response_payload.get("output", []):
        if item.get("type") != "message":
            continue
        for part in item.get("content", []):
            if part.get("type") == "output_text":
                text = part.get("text", "")
                if text:
                    texts.append(text)
    return "".join(texts).strip()


class StubChatService:
    def __init__(self, config: AppConfig) -> None:
        self.config = config

    def chat(self, session_id: str, message: str) -> dict[str, Any]:
        clean_session_id = session_id.strip()
        clean_message = message.strip()
        if not clean_session_id:
            raise ApiError(HTTPStatus.BAD_REQUEST, "sessionId は必須です。")
        if not clean_message:
            raise ApiError(HTTPStatus.BAD_REQUEST, "message は空にできません。")

        reply = self.config.stub_reply
        audio_bytes = build_stub_wav()
        return {
            "sessionId": clean_session_id,
            "assistantText": reply,
            "audioBase64": base64.b64encode(audio_bytes).decode("ascii"),
            "audioMimeType": "audio/wav",
            "responseId": f"stub-{clean_session_id}",
        }

    def health_payload(self) -> dict[str, Any]:
        return {
            "ok": True,
            "mode": "stub",
            "model": "stub",
            "aivisEngineUrl": None,
            "aivisStyleId": None,
        }


class OpenAiAivisChatService:
    def __init__(
        self,
        config: AppConfig,
        *,
        urlopen: Callable[..., Any] = urllib.request.urlopen,
    ) -> None:
        self.config = config
        self._urlopen = urlopen
        self._previous_response_by_session: dict[str, str] = {}
        self._lock = threading.Lock()

    def chat(self, session_id: str, message: str) -> dict[str, Any]:
        clean_session_id = session_id.strip()
        clean_message = message.strip()
        if not clean_session_id:
            raise ApiError(HTTPStatus.BAD_REQUEST, "sessionId は必須です。")
        if not clean_message:
            raise ApiError(HTTPStatus.BAD_REQUEST, "message は空にできません。")

        with self._lock:
            previous_response_id = self._previous_response_by_session.get(clean_session_id)

        response_payload = self._create_openai_response(clean_message, previous_response_id)
        response_id = response_payload.get("id")
        assistant_text = extract_output_text(response_payload)
        if not response_id or not assistant_text:
            raise ApiError(HTTPStatus.BAD_GATEWAY, "LLM から有効な返答を取得できませんでした。")

        audio_query = self._create_aivis_query(assistant_text)
        audio_bytes = self._synthesize_aivis_audio(audio_query)

        with self._lock:
            self._previous_response_by_session[clean_session_id] = response_id

        return {
            "sessionId": clean_session_id,
            "assistantText": assistant_text,
            "audioBase64": base64.b64encode(audio_bytes).decode("ascii"),
            "audioMimeType": "audio/wav",
            "responseId": response_id,
        }

    def health_payload(self) -> dict[str, Any]:
        return {
            "ok": True,
            "mode": "openai+aivis",
            "model": self.config.openai_model,
            "aivisEngineUrl": self.config.aivis_engine_url,
            "aivisStyleId": self.config.aivis_style_id,
        }

    def _create_openai_response(self, message: str, previous_response_id: str | None) -> dict[str, Any]:
        body = {
            "model": self.config.openai_model,
            "instructions": SYSTEM_PROMPT,
            "input": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": message,
                        }
                    ],
                }
            ],
            "max_output_tokens": 120,
            "store": True,
            "temperature": 0.7,
            "truncation": "auto",
            "text": {"format": {"type": "text"}},
        }
        if previous_response_id:
            body["previous_response_id"] = previous_response_id

        req = urllib.request.Request(
            OPENAI_RESPONSES_URL,
            data=json.dumps(body).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {self.config.openai_api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        return self._read_json(req, upstream_name="OpenAI API", error_status=HTTPStatus.BAD_GATEWAY)

    def _create_aivis_query(self, text: str) -> dict[str, Any]:
        params = urllib.parse.urlencode(
            {"speaker": str(self.config.aivis_style_id), "text": text},
            encoding="utf-8",
        )
        req = urllib.request.Request(
            f"{self.config.aivis_engine_url}/audio_query?{params}",
            data=b"",
            method="POST",
        )
        return self._read_json(req, upstream_name="AivisSpeech", error_status=HTTPStatus.SERVICE_UNAVAILABLE)

    def _synthesize_aivis_audio(self, audio_query: dict[str, Any]) -> bytes:
        params = urllib.parse.urlencode({"speaker": str(self.config.aivis_style_id)})
        req = urllib.request.Request(
            f"{self.config.aivis_engine_url}/synthesis?{params}",
            data=json.dumps(audio_query).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with self._urlopen(req, timeout=self.config.timeout_sec) as res:
                audio_bytes = res.read()
        except urllib.error.HTTPError as exc:
            raise ApiError(HTTPStatus.SERVICE_UNAVAILABLE, f"AivisSpeech の音声生成に失敗しました ({exc.code})。") from exc
        except urllib.error.URLError as exc:
            raise ApiError(HTTPStatus.SERVICE_UNAVAILABLE, f"AivisSpeech に接続できません: {exc.reason}") from exc

        if not audio_bytes:
            raise ApiError(HTTPStatus.SERVICE_UNAVAILABLE, "AivisSpeech から音声データが返りませんでした。")
        return audio_bytes

    def _read_json(self, req: urllib.request.Request, *, upstream_name: str, error_status: int) -> dict[str, Any]:
        try:
            with self._urlopen(req, timeout=self.config.timeout_sec) as res:
                payload = json.loads(res.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            raise ApiError(error_status, f"{upstream_name} 呼び出しに失敗しました ({exc.code})。") from exc
        except urllib.error.URLError as exc:
            raise ApiError(error_status, f"{upstream_name} に接続できません: {exc.reason}") from exc
        except json.JSONDecodeError as exc:
            raise ApiError(error_status, f"{upstream_name} の応答を解釈できませんでした。") from exc
        return payload


def create_handler(static_dir: Path, chat_service: Any):
    class MotionChatHandler(SimpleHTTPRequestHandler):
        def __init__(self, *args: Any, **kwargs: Any) -> None:
            super().__init__(*args, directory=str(static_dir), **kwargs)

        def do_GET(self) -> None:
            path = urllib.parse.urlsplit(self.path).path
            if path == "/healthz":
                self._write_json(HTTPStatus.OK, chat_service.health_payload())
                return
            if path == "/":
                self.path = "/index.html"
            super().do_GET()

        def do_POST(self) -> None:
            path = urllib.parse.urlsplit(self.path).path
            if path != "/api/chat":
                self._write_json(HTTPStatus.NOT_FOUND, {"error": "API が見つかりません。"})
                return
            self._handle_chat()

        def end_headers(self) -> None:
            self.send_header("Cache-Control", "no-store")
            super().end_headers()

        def log_message(self, format: str, *args: Any) -> None:
            return

        def guess_type(self, path: str) -> str:
            mime_type = super().guess_type(path)
            return mime_type or mimetypes.guess_type(path)[0] or "application/octet-stream"

        def _handle_chat(self) -> None:
            try:
                content_length = int(self.headers.get("Content-Length", "0"))
            except ValueError:
                self._write_json(HTTPStatus.BAD_REQUEST, {"error": "Content-Length が不正です。"})
                return

            raw_body = self.rfile.read(content_length)
            try:
                payload = json.loads(raw_body.decode("utf-8"))
            except json.JSONDecodeError:
                self._write_json(HTTPStatus.BAD_REQUEST, {"error": "JSON が不正です。"})
                return

            try:
                result = chat_service.chat(
                    str(payload.get("sessionId", "")),
                    str(payload.get("message", "")),
                )
            except ApiError as exc:
                self._write_json(exc.status_code, {"error": exc.message})
                return
            except Exception:
                self._write_json(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "サーバーで予期しないエラーが発生しました。"})
                return

            self._write_json(HTTPStatus.OK, result)

        def _write_json(self, status_code: int, payload: dict[str, Any]) -> None:
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(status_code)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

    return MotionChatHandler


def create_server(host: str, port: int, static_dir: Path, chat_service: Any) -> ThreadingHTTPServer:
    handler = create_handler(static_dir, chat_service)
    return ThreadingHTTPServer((host, port), handler)


def load_config(args: argparse.Namespace) -> AppConfig:
    static_dir = args.asset_dir.resolve()
    if not static_dir.is_dir():
        raise SystemExit(f"asset dir が見つかりません: {static_dir}")

    mode: Mode = args.mode
    if mode == "stub":
        return AppConfig(
            static_dir=static_dir,
            mode=mode,
            openai_api_key=None,
            openai_model="stub",
            aivis_engine_url=None,
            aivis_style_id=None,
            timeout_sec=float(args.timeout_sec),
            stub_reply=args.stub_reply,
        )

    openai_api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not openai_api_key:
        raise SystemExit("OPENAI_API_KEY が設定されていません。")

    style_id_raw = os.environ.get("AIVIS_STYLE_ID", "").strip()
    if not style_id_raw:
        raise SystemExit("AIVIS_STYLE_ID が設定されていません。")
    try:
        style_id = int(style_id_raw)
    except ValueError as exc:
        raise SystemExit("AIVIS_STYLE_ID は整数で指定してください。") from exc

    return AppConfig(
        static_dir=static_dir,
        mode=mode,
        openai_api_key=openai_api_key,
        openai_model=os.environ.get("OPENAI_MODEL", DEFAULT_MODEL).strip() or DEFAULT_MODEL,
        aivis_engine_url=os.environ.get("AIVIS_ENGINE_URL", DEFAULT_AIVIS_URL).strip() or DEFAULT_AIVIS_URL,
        aivis_style_id=style_id,
        timeout_sec=float(args.timeout_sec),
        stub_reply=args.stub_reply,
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify MotionPNGTuber browser bundle locally.")
    parser.add_argument(
        "--asset-dir",
        type=Path,
        required=True,
        help="browser bundle directory that contains index.html and player.js",
    )
    parser.add_argument("--host", default=DEFAULT_HOST)
    parser.add_argument("--port", type=int, default=DEFAULT_PORT)
    parser.add_argument(
        "--mode",
        choices=["stub", "openai+aivis"],
        default="stub",
        help="stub is default and requires no external secrets.",
    )
    parser.add_argument("--timeout-sec", type=float, default=DEFAULT_TIMEOUT_SEC)
    parser.add_argument("--stub-reply", default=DEFAULT_STUB_REPLY)
    args = parser.parse_args()

    config = load_config(args)
    if config.mode == "stub":
        service = StubChatService(config)
    else:
        service = OpenAiAivisChatService(config)

    server = create_server(args.host, args.port, config.static_dir, service)
    print(f"[ok] verify server listening on http://{args.host}:{args.port}")
    print(f"     asset dir: {config.static_dir}")
    print(f"     mode: {config.mode}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[info] stopping verify server")
    finally:
        server.shutdown()
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
