#!/usr/bin/env python3
"""Split a 2x2 PNGTuber expression grid into four frame PNGs."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


PANELS = {
    "eyes_open_mouth_closed": (0, 0),
    "eyes_open_mouth_open": (1, 0),
    "eyes_closed_mouth_closed": (0, 1),
    "eyes_closed_mouth_open": (1, 1),
}


def split_grid(input_path: Path, output_dir: Path) -> list[Path]:
    image = Image.open(input_path)
    width, height = image.size
    if width % 2 != 0 or height % 2 != 0:
        raise ValueError(f"2x2分割できないサイズです: {width}x{height}")

    half_w, half_h = width // 2, height // 2
    output_dir.mkdir(parents=True, exist_ok=True)

    written: list[Path] = []
    for name, (col, row) in PANELS.items():
        box = (col * half_w, row * half_h, (col + 1) * half_w, (row + 1) * half_h)
        panel = image.crop(box)
        out_path = output_dir / f"{name}.png"
        panel.save(out_path, "PNG")
        written.append(out_path)

    return written


def main() -> None:
    parser = argparse.ArgumentParser(description="Split a 2x2 PNGTuber grid into 4 PNGs")
    parser.add_argument(
        "--input",
        type=Path,
        default=Path("output/character/sheets/pngtuber_expressions.png"),
        help="2x2 expression grid PNG",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("output/character/sheets/pngtuber_frames"),
        help="directory to write split frames",
    )
    args = parser.parse_args()

    written = split_grid(args.input, args.output_dir)
    for path in written:
        print(path)


if __name__ == "__main__":
    main()
