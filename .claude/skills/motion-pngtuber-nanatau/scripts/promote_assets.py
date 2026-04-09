#!/usr/bin/env python3
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path


REQUIRED_FILES = [
    "loop.mp4",
    "loop_mouthless.mp4",
    "mouth_track.npz",
]

REQUIRED_DIRS = [
    "mouth",
    "browser",
]


def ensure_source_ready(asset_dir: Path) -> None:
    missing: list[str] = []
    for name in REQUIRED_FILES:
        if not (asset_dir / name).is_file():
            missing.append(name)
    for name in REQUIRED_DIRS:
        if not (asset_dir / name).is_dir():
            missing.append(f"{name}/")
    if missing:
        raise FileNotFoundError(f"missing required assets in {asset_dir}: {', '.join(missing)}")


def copy_tree(src: Path, dst: Path) -> None:
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)


def promote(asset_dir: Path, repo_root: Path, set_name: str, include_source: bool) -> Path:
    ensure_source_ready(asset_dir)

    dest_dir = repo_root / "images" / "png-tuber" / "motion" / set_name
    dest_dir.mkdir(parents=True, exist_ok=True)

    for name in REQUIRED_FILES:
        shutil.copy2(asset_dir / name, dest_dir / name)

    for name in REQUIRED_DIRS:
        copy_tree(asset_dir / name, dest_dir / name)

    if include_source:
        source_candidates = sorted(asset_dir.glob("source*.mp4"))
        for src in source_candidates:
            shutil.copy2(src, dest_dir / src.name)

    runbook = asset_dir / "RUNBOOK.md"
    if runbook.is_file():
        shutil.copy2(runbook, dest_dir / "RUNBOOK.md")

    return dest_dir


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Promote MotionPNGTuber working assets into images/png-tuber/motion/<set-name>.",
    )
    parser.add_argument(
        "asset_dir",
        type=Path,
        help="Working asset directory, typically output/motion-pngtuber/<set-name>",
    )
    parser.add_argument(
        "--set-name",
        default=None,
        help="Destination set name (default: asset_dir basename)",
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=Path(__file__).resolve().parents[4],
        help="Repository root (default: auto-detected from skill path)",
    )
    parser.add_argument(
        "--include-source",
        action="store_true",
        help="Copy source*.mp4 into the promoted set as well",
    )
    args = parser.parse_args()

    asset_dir = args.asset_dir.resolve()
    repo_root = args.repo_root.resolve()
    set_name = args.set_name or asset_dir.name

    try:
        dest_dir = promote(asset_dir, repo_root, set_name, args.include_source)
    except Exception as exc:
        print(f"[error] {exc}", file=sys.stderr)
        return 1

    print(f"[ok] promoted MotionPNGTuber set: {dest_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
