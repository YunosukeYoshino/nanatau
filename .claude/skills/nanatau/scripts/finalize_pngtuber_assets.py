#!/usr/bin/env python3
"""Validate and copy final PNGTuber frames into the canonical project location."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from PIL import Image


FRAME_SPECS = {
    "eyes_closed_mouth_closed.png": [
        "eyes_closed_mouth_closed.png",
        "eyeOFF_mouthOFF.png",
    ],
    "eyes_open_mouth_closed.png": [
        "eyes_open_mouth_closed.png",
        "eyeON_mouthOFF.png",
    ],
    "eyes_closed_mouth_open.png": [
        "eyes_closed_mouth_open.png",
        "eyeOFF_mouthON.png",
    ],
    "eyes_open_mouth_open.png": [
        "eyes_open_mouth_open.png",
        "eyeON_mouthON.png",
    ],
}


def resolve_sources(input_dir: Path) -> dict[str, Path]:
    resolved: dict[str, Path] = {}
    missing: list[str] = []
    for canonical_name, candidates in FRAME_SPECS.items():
        found = next((input_dir / name for name in candidates if (input_dir / name).is_file()), None)
        if found is None:
            missing.append(f"{canonical_name}: {', '.join(candidates)}")
            continue
        resolved[canonical_name] = found

    if missing:
        joined = "\n".join(missing)
        raise FileNotFoundError(f"必要なPNGが不足しています:\n{joined}")

    return resolved


def validate_frames(sources: dict[str, Path]) -> tuple[int, int]:
    expected_size: tuple[int, int] | None = None
    for canonical_name, source in sources.items():
        image = Image.open(source)
        if image.mode != "RGBA":
            raise ValueError(f"{canonical_name} は RGBA ではありません: {source}")
        alpha = image.getchannel("A")
        if alpha.getbbox() is None:
            raise ValueError(f"{canonical_name} が完全透明です: {source}")
        if alpha.getextrema() == (255, 255):
            raise ValueError(f"{canonical_name} に透過がありません: {source}")

        if expected_size is None:
            expected_size = image.size
        elif image.size != expected_size:
            raise ValueError(
                f"サイズ不一致: {canonical_name} は {image.size}, expected {expected_size}"
            )

    if expected_size is None:
        raise ValueError("入力PNGがありません")
    return expected_size


def finalize_assets(input_dir: Path, output_dir: Path) -> list[Path]:
    sources = resolve_sources(input_dir)
    validate_frames(sources)

    output_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for canonical_name, source in sources.items():
        target = output_dir / canonical_name
        shutil.copy2(source, target)
        written.append(target)
    return written


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate and finalize PNGTuber frames")
    parser.add_argument(
        "--input-dir",
        type=Path,
        default=Path("output/character/sheets/pngtuber_frames_transparent"),
        help="directory containing the four transparent frame PNGs",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("images/png-tuber/transparent"),
        help="canonical project destination for accepted transparent frames",
    )
    args = parser.parse_args()

    written = finalize_assets(args.input_dir, args.output_dir)
    for path in written:
        print(path)


if __name__ == "__main__":
    main()
