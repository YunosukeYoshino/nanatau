#!/usr/bin/env python3
"""Remove background from all PNG files in a directory."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image
from rembg import remove


def remove_bg_clean(image: Image.Image, noise_threshold: int) -> Image.Image:
    result = remove(
        image,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
    )
    if result.mode != "RGBA":
        result = result.convert("RGBA")

    pixels = result.load()
    width, height = result.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if 0 < a < noise_threshold:
                pixels[x, y] = (0, 0, 0, 0)
    return result


def process_directory(input_dir: Path, output_dir: Path, noise_threshold: int) -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for path in sorted(input_dir.glob("*.png")):
        image = Image.open(path)
        result = remove_bg_clean(image, noise_threshold=noise_threshold)
        out_path = output_dir / path.name
        result.save(out_path, "PNG")
        written.append(out_path)
    return written


def main() -> None:
    parser = argparse.ArgumentParser(description="Remove background from a directory of PNGs")
    parser.add_argument(
        "--input-dir",
        type=Path,
        default=Path("output/character/sheets/pngtuber_frames"),
        help="directory containing opaque PNG frames",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("output/character/sheets/pngtuber_frames_transparent"),
        help="directory to write transparent PNG frames",
    )
    parser.add_argument(
        "--noise-threshold",
        type=int,
        default=30,
        help="alpha values below this threshold are forced to fully transparent",
    )
    args = parser.parse_args()

    written = process_directory(args.input_dir, args.output_dir, noise_threshold=args.noise_threshold)
    for path in written:
        print(path)


if __name__ == "__main__":
    main()
