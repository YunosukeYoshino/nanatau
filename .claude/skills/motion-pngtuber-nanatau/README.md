# MotionPNGTuber Skill

`nanatau` repo 内で MotionPNGTuber 用アセットを生成・検証・正本化するための self-contained skill。

## 役割

- `find_loop_candidates.py`: loop 候補の比較
- `build_mouth_track.py`: 口位置 track 生成
- `build_mouthless.py`: mouthless 動画生成
- `erase_mouth_offline.py`: build_mouthless から呼ばれる実体
- `extract_mouth.py`: 口スプライト抽出
- `export_browser_bundle.py`: browser bundle 出力
- `verify_server.py`: `/healthz` と `/api/chat` を持つ検証 server
- `promote_assets.py`: `output/` から `images/png-tuber/motion/` への正本化

## 推奨ディレクトリ

作業中:

```text
output/motion-pngtuber/<set-name>/
```

正本:

```text
images/png-tuber/motion/<set-name>/
```

## セットアップ

MotionPNGTuber 系は Python `3.10.x` を前提にする。

```bash
python3.10 -m venv .venv-motion
source .venv-motion/bin/activate
pip install -U pip setuptools wheel
pip install -e .
```

`anime-face-detector` 系は環境によって追加手順が必要になる。少なくとも次を前提にする。

```bash
pip install openmim
mim install mmcv-full==1.7.0
pip install mmdet==2.28.0 mmpose==0.29.0 anime-face-detector==0.0.9
```

macOS や Apple Silicon では `mmcv-full` / `xtcocotools` のビルド調整が必要になる場合がある。  
その場合は元の `png-tuber` 系と同様に、Python `3.10` 固定で別 venv を維持する。

## 最小ワークフロー

```bash
python .claude/skills/motion-pngtuber-nanatau/scripts/find_loop_candidates.py \
  --video output/motion-pngtuber/sample/source.mp4 \
  --output-dir output/motion-pngtuber/sample/candidates

python .claude/skills/motion-pngtuber-nanatau/scripts/build_mouth_track.py \
  --video output/motion-pngtuber/sample/loop.mp4 \
  --out output/motion-pngtuber/sample/mouth_track.npz \
  --debug output/motion-pngtuber/sample/mouth_track_debug.mp4 \
  --device cpu \
  --quality high

python .claude/skills/motion-pngtuber-nanatau/scripts/build_mouthless.py \
  --video output/motion-pngtuber/sample/loop.mp4 \
  --track output/motion-pngtuber/sample/mouth_track.npz \
  --out output/motion-pngtuber/sample/loop_mouthless.mp4 \
  --debug output/motion-pngtuber/sample/erase_debug

python .claude/skills/motion-pngtuber-nanatau/scripts/extract_mouth.py \
  --video output/motion-pngtuber/sample/loop.mp4 \
  --track output/motion-pngtuber/sample/mouth_track.npz \
  --out output/motion-pngtuber/sample/mouth

python .claude/skills/motion-pngtuber-nanatau/scripts/export_browser_bundle.py \
  output/motion-pngtuber/sample

python .claude/skills/motion-pngtuber-nanatau/scripts/verify_server.py \
  --asset-dir output/motion-pngtuber/sample/browser \
  --mode stub

python .claude/skills/motion-pngtuber-nanatau/scripts/promote_assets.py \
  output/motion-pngtuber/sample \
  --set-name sample
```

## 検証モード

- `stub`: secrets 不要。標準 smoke test 用
- `openai+aivis`: `OPENAI_API_KEY`, `AIVIS_STYLE_ID`, 任意で `AIVIS_ENGINE_URL`, `OPENAI_MODEL`

## 依存

MotionPNGTuber 用 Python 依存は repo 直下の `pyproject.toml` を参照。
