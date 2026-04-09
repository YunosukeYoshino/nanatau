#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np


HERE = Path(__file__).resolve().parent
TEMPLATE_DIR = HERE / "browser_player"


def load_track_json(track_path: Path) -> dict:
    npz = np.load(track_path, allow_pickle=False)
    result = {
        "fps": float(npz["fps"]),
        "width": int(npz["w"]),
        "height": int(npz["h"]),
        "refSpriteSize": [int(npz["ref_sprite_w"]), int(npz["ref_sprite_h"])],
        "frames": [],
    }

    quads = npz["quad"]
    valids = npz["valid"]
    for i in range(len(quads)):
        result["frames"].append(
            {
                "quad": quads[i].tolist(),
                "valid": bool(valids[i]),
            }
        )
    return result


def transcode_h264(src: Path, dst: Path) -> None:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg が見つかりません。ブラウザ用 mp4 変換に必要です。")

    cmd = [
        ffmpeg,
        "-y",
        "-i",
        str(src),
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        str(dst),
    ]
    subprocess.run(cmd, check=True)


def export_bundle(asset_dir: Path, output_dir: Path) -> None:
    loop_video = asset_dir / "loop_mouthless.mp4"
    mouth_dir = asset_dir / "mouth"
    track_path = asset_dir / "mouth_track.npz"

    if not loop_video.is_file():
        raise FileNotFoundError(f"loop_mouthless.mp4 が見つかりません: {loop_video}")
    if not mouth_dir.is_dir():
        raise FileNotFoundError(f"mouth フォルダが見つかりません: {mouth_dir}")
    if not track_path.is_file():
        raise FileNotFoundError(f"mouth_track.npz が見つかりません: {track_path}")
    if not TEMPLATE_DIR.is_dir():
        raise FileNotFoundError(f"browser_player テンプレートが見つかりません: {TEMPLATE_DIR}")

    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "mouth").mkdir(parents=True, exist_ok=True)

    track_json = load_track_json(track_path)
    with open(output_dir / "mouth_track.json", "w", encoding="utf-8") as f:
        json.dump(track_json, f, ensure_ascii=False, indent=2)

    for name in ["closed.png", "half.png", "open.png", "u.png", "e.png"]:
        shutil.copy2(mouth_dir / name, output_dir / "mouth" / name)

    transcode_h264(loop_video, output_dir / "loop_mouthless_h264.mp4")

    for name in ["index.html", "player.js"]:
        shutil.copy2(TEMPLATE_DIR / name, output_dir / name)


def main() -> int:
    parser = argparse.ArgumentParser(description="MotionPNGTuber の静的ブラウザ bundle を出力する")
    parser.add_argument(
        "asset_dir",
        type=Path,
        help="loop_mouthless.mp4 / mouth/ / mouth_track.npz を含むアセットディレクトリ",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=None,
        help="出力先ディレクトリ (省略時: <asset_dir>/browser)",
    )
    args = parser.parse_args()

    asset_dir = args.asset_dir.resolve()
    output_dir = args.output_dir.resolve() if args.output_dir else asset_dir / "browser"

    try:
        export_bundle(asset_dir, output_dir)
    except Exception as e:
        print(f"[error] {e}", file=sys.stderr)
        return 1

    print(f"[ok] browser bundle exported: {output_dir}")
    print(f"      index: {output_dir / 'index.html'}")
    print(f"      video: {output_dir / 'loop_mouthless_h264.mp4'}")
    print(f"      track: {output_dir / 'mouth_track.json'}")
    print(f"      mouth: {output_dir / 'mouth'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
