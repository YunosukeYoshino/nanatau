#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np


@dataclass(frozen=True)
class BaseCandidate:
    start: int
    end: int
    frames: int
    duration: float
    mae: float
    dx: float
    dy: float
    response: float
    score: float


def ensure_even(value: int) -> int:
    value = int(value)
    return value if value % 2 == 0 else value - 1


def parse_blends(raw: str) -> list[int]:
    values: list[int] = []
    for item in raw.split(","):
        item = item.strip()
        if not item:
            continue
        value = max(0, int(item))
        if value not in values:
            values.append(value)
    return values or [4, 6, 8]


def load_search_frames(video_path: Path, downscale_width: int) -> tuple[list[np.ndarray], float, int, int]:
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise RuntimeError(f"failed to open video: {video_path}")

    fps = float(cap.get(cv2.CAP_PROP_FPS) or 24.0)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0)
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0)
    if width <= 0 or height <= 0:
        raise RuntimeError("invalid video size")

    search_frames: list[np.ndarray] = []
    scale = min(1.0, float(downscale_width) / float(width))
    target_w = ensure_even(max(64, round(width * scale)))
    target_h = ensure_even(max(64, round(height * scale)))

    while True:
        ok, frame = cap.read()
        if not ok:
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        if target_w != width or target_h != height:
            gray = cv2.resize(gray, (target_w, target_h), interpolation=cv2.INTER_AREA)
        search_frames.append(gray.astype(np.float32))

    cap.release()
    return search_frames, fps, width, height


def shifted_mae(a: np.ndarray, b: np.ndarray, dx: float, dy: float) -> float:
    tx = int(round(dx))
    ty = int(round(dy))
    matrix = np.float32([[1.0, 0.0, tx], [0.0, 1.0, ty]])
    shifted = cv2.warpAffine(
        b,
        matrix,
        (a.shape[1], a.shape[0]),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_REFLECT,
    )
    return float(np.mean(np.abs(a - shifted)))


def evaluate_pair(a: np.ndarray, b: np.ndarray, target_seconds: float, duration: float, window: np.ndarray) -> tuple[float, float, float, float, float]:
    (dx, dy), response = cv2.phaseCorrelate(a, b, window)
    mae = shifted_mae(a, b, dx, dy)
    score = mae + abs(dy) * 2.0 + abs(dx) * 0.75 + abs(duration - target_seconds) * 0.5 - float(response) * 2.0
    return mae, float(dx), float(dy), float(response), float(score)


def choose_base_candidates(
    frames: list[np.ndarray],
    fps: float,
    top_k: int,
    min_seconds: float,
    max_seconds: float,
    search_step: int,
) -> list[BaseCandidate]:
    min_len = max(2, int(round(min_seconds * fps)))
    max_len = max(min_len, int(round(max_seconds * fps)))
    target_seconds = (min_seconds + max_seconds) / 2.0
    height, width = frames[0].shape[:2]
    window = cv2.createHanningWindow((width, height), cv2.CV_32F)

    scored: list[BaseCandidate] = []
    total = len(frames)

    for start in range(0, max(0, total - min_len), search_step):
        end_min = start + min_len - 1
        end_max = min(total - 1, start + max_len - 1)
        for end in range(end_min, end_max + 1, search_step):
            duration = float(end - start + 1) / fps
            mae, dx, dy, response, score = evaluate_pair(frames[start], frames[end], target_seconds, duration, window)
            scored.append(
                BaseCandidate(
                    start=start,
                    end=end,
                    frames=end - start + 1,
                    duration=duration,
                    mae=mae,
                    dx=dx,
                    dy=dy,
                    response=response,
                    score=score,
                )
            )

    scored.sort(key=lambda item: item.score)
    chosen: list[BaseCandidate] = []
    for candidate in scored:
        duplicate = any(abs(candidate.start - existing.start) <= 3 and abs(candidate.end - existing.end) <= 3 for existing in chosen)
        if duplicate:
            continue
        chosen.append(candidate)
        if len(chosen) >= max(1, top_k):
            break
    return chosen


def read_range(video_path: Path, start: int, end: int) -> list[np.ndarray]:
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise RuntimeError(f"failed to open video: {video_path}")
    cap.set(cv2.CAP_PROP_POS_FRAMES, float(start))
    frames: list[np.ndarray] = []
    for _ in range(start, end + 1):
        ok, frame = cap.read()
        if not ok:
            break
        frames.append(frame)
    cap.release()
    return frames


def blend_tail(frames: list[np.ndarray], blend: int) -> list[np.ndarray]:
    if blend <= 0 or blend >= len(frames):
        return [frame.copy() for frame in frames]
    result = [frame.copy() for frame in frames]
    for offset in range(blend):
        idx = len(result) - blend + offset
        alpha = float(offset + 1) / float(blend + 1)
        result[idx] = cv2.addWeighted(result[idx], 1.0 - alpha, result[offset], alpha, 0.0)
    return result


def write_video(video_path: Path, frames: list[np.ndarray], fps: float) -> None:
    height, width = frames[0].shape[:2]
    writer = cv2.VideoWriter(
        str(video_path),
        cv2.VideoWriter_fourcc(*"mp4v"),
        fps,
        (ensure_even(width), ensure_even(height)),
    )
    if not writer.isOpened():
        raise RuntimeError(f"failed to open writer: {video_path}")
    for frame in frames:
        writer.write(frame)
    writer.release()


def make_boundary_sheet(sheet_path: Path, frames: list[np.ndarray]) -> None:
    chosen_indices = [0, 1, 2, len(frames) - 3, len(frames) - 2, len(frames) - 1]
    tiles: list[np.ndarray] = []
    for idx in chosen_indices:
        frame = frames[idx].copy()
        cv2.putText(
            frame,
            f"frame {idx}",
            (24, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            1.0,
            (24, 24, 24),
            2,
            cv2.LINE_AA,
        )
        tiles.append(frame)

    top = np.hstack(tiles[:3])
    bottom = np.hstack(tiles[3:])
    sheet = np.vstack([top, bottom])
    cv2.imwrite(str(sheet_path), sheet)


def candidate_metrics(frames: list[np.ndarray], fps: float, blend: int) -> dict[str, float]:
    sample_w = min(320, frames[0].shape[1])
    sample_h = ensure_even(max(64, round(frames[0].shape[0] * sample_w / frames[0].shape[1])))
    gray_frames = [
        cv2.resize(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), (sample_w, sample_h), interpolation=cv2.INTER_AREA).astype(np.float32)
        for frame in frames
    ]
    window = cv2.createHanningWindow((sample_w, sample_h), cv2.CV_32F)
    a = gray_frames[0]
    b = gray_frames[-1]
    seam_mae, dx, dy, response, _ = evaluate_pair(a, b, 0.0, float(len(frames)) / fps, window)

    if blend > 0 and blend < len(gray_frames):
        tail_values = [
            float(np.mean(np.abs(gray_frames[-blend + idx] - gray_frames[idx])))
            for idx in range(blend)
        ]
        tail_mae = float(np.mean(tail_values))
    else:
        tail_mae = seam_mae

    return {
        "frames": len(frames),
        "duration": float(len(frames)) / fps,
        "seam_mae": seam_mae,
        "tail_mae": tail_mae,
        "dx": dx,
        "dy": dy,
        "cc": response,
    }


def render_candidates(
    video_path: Path,
    output_dir: Path,
    fps: float,
    base_candidates: list[BaseCandidate],
    blend_values: list[int],
) -> list[dict[str, object]]:
    results: list[dict[str, object]] = []
    rank = 0
    for base in base_candidates:
        source_frames = read_range(video_path, base.start, base.end)
        for blend in blend_values:
            if blend >= len(source_frames):
                continue
            rank += 1
            frames = blend_tail(source_frames, blend)
            stem = f"candidate_rank{rank:02d}_s{base.start:03d}_e{base.end:03d}_b{blend}"
            video_out = output_dir / f"{stem}.mp4"
            sheet_out = output_dir / f"{stem}_boundary.jpg"
            write_video(video_out, frames, fps)
            make_boundary_sheet(sheet_out, frames)
            metrics = candidate_metrics(frames, fps, blend)
            results.append(
                {
                    "name": stem,
                    "start": base.start,
                    "end": base.end,
                    "blend": blend,
                    "video": str(video_out),
                    "boundary": str(sheet_out),
                    "base": {
                        "score": base.score,
                        "mae": base.mae,
                        "dx": base.dx,
                        "dy": base.dy,
                        "response": base.response,
                    },
                    "metrics": metrics,
                }
            )
    results.sort(key=lambda item: (item["metrics"]["seam_mae"], abs(item["metrics"]["dy"]), item["metrics"]["tail_mae"]))  # type: ignore[index]
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description="Compare loop candidates for MotionPNGTuber source videos.")
    parser.add_argument("--video", required=True, help="source video")
    parser.add_argument("--output-dir", required=True, help="directory for candidate outputs")
    parser.add_argument("--top-k", type=int, default=3, help="how many base ranges to keep before blend variants")
    parser.add_argument("--blend-values", default="4,6,8", help="comma-separated blend frame counts")
    parser.add_argument("--min-seconds", type=float, default=4.0, help="minimum loop duration")
    parser.add_argument("--max-seconds", type=float, default=6.0, help="maximum loop duration")
    parser.add_argument("--search-step", type=int, default=1, help="frame step for start/end search")
    parser.add_argument("--downscale-width", type=int, default=320, help="search width for grayscale analysis")
    args = parser.parse_args()

    video_path = Path(args.video).resolve()
    output_dir = Path(args.output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    if not video_path.is_file():
        raise SystemExit(f"video not found: {video_path}")

    search_frames, fps, width, height = load_search_frames(video_path, args.downscale_width)
    if len(search_frames) < 2:
        raise SystemExit("video has too few frames")

    base_candidates = choose_base_candidates(
        search_frames,
        fps,
        top_k=max(1, args.top_k),
        min_seconds=float(args.min_seconds),
        max_seconds=float(args.max_seconds),
        search_step=max(1, args.search_step),
    )
    if not base_candidates:
        raise SystemExit("no candidates found")

    results = render_candidates(
        video_path=video_path,
        output_dir=output_dir,
        fps=fps,
        base_candidates=base_candidates,
        blend_values=parse_blends(args.blend_values),
    )

    summary = {
        "video": str(video_path),
        "fps": fps,
        "width": width,
        "height": height,
        "params": {
            "top_k": int(args.top_k),
            "blend_values": parse_blends(args.blend_values),
            "min_seconds": float(args.min_seconds),
            "max_seconds": float(args.max_seconds),
            "search_step": int(args.search_step),
            "downscale_width": int(args.downscale_width),
        },
        "base_candidates": [candidate.__dict__ for candidate in base_candidates],
        "candidates": results,
    }

    summary_path = output_dir / "candidates.json"
    summary_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"[ok] wrote {len(results)} candidates")
    print(f"[ok] summary: {summary_path}")
    for item in results[: min(5, len(results))]:
        metrics = item["metrics"]
        print(
            f"  - {item['name']}: seam_mae={metrics['seam_mae']:.3f} "
            f"tail_mae={metrics['tail_mae']:.3f} dx={metrics['dx']:.3f} dy={metrics['dy']:.3f}"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
