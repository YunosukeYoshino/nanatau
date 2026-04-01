---
name: nanatau
description: |
  Unified skill for nanatau AI character design, image generation, character sheets,
  and PNGTuber asset creation. Handles personality variant generation, design exploration,
  reference sheets, and PNGTuber pipelines.
  Use when user mentions "ななたう", "nanatau", "キャラ生成", "キャラシート",
  "PNGTuber", "表情差分", "三面図", "デザイン探索", "背景透過".
---

# ななたう 統合スキル

AIキャラクター「ななたう」のデザイン・生成・アセット制作を一元管理する。

## Prerequisites

1. `GEMINI_API_KEY` が `.env` に設定済み
2. Python パッケージ: `google-genai`, `Pillow`, `rembg[cpu]`
3. Python 3.13+ が必要（`python3` コマンドで実行可能であること。必要に応じて `mise` でセットアップ）

## プロジェクトレイアウト

```text
images/concept/             -- 採用キャラ案・キービジュアル
images/icon/                -- アイコン素材
images/png-tuber/           -- PNGTuber素材 (transparent / opaque)
images/reference/           -- リファレンス・参考資料
.claude/skills/nanatau/scripts/           -- 画像生成スクリプト
.claude/skills/character-sheet/scripts/   -- キャラシート生成スクリプト
output/                     -- 生成出力（.gitignore）
```

## ワークフロー

### 1. generate — キャラ画像生成

性格バリエーション（A-G）またはカスタムプロンプトから画像を生成する。

**使い方**: `/nanatau generate <variant>`

**利用可能バリエーション**:

| ID | 名前 | コンセプト |
|----|------|-----------|
| `pajama` | パジャマ末っ子 | 変身が間に合わない |
| `gyaru` | ギャル | 変身すると敬語 |
| `crybaby` | 泣き虫 | 涙が魔力源 |
| `oshikatsu` | 推し活オタク | ペンライト変身 |
| `shy` | コミュ障 | 画面越しなら喋れる |
| `memory-reset` | 記憶リセット | 七日で記憶が消える |
| `dog` | 犬系彼女 | 精神が犬 |

**手順**:
1. PROMPTS.md から該当バリエーションのプロンプトを取得（カスタムの場合はテンプレートを埋める）
2. `.env` から `GEMINI_API_KEY` を読み込み
3. 画像生成スクリプトで実行:
   ```bash
   export $(grep GEMINI_API_KEY .env | xargs)
   python3 .claude/skills/nanatau/scripts/generate_image.py \
     --ref images/concept/reference_sheet.png \
     --model gemini-3.1-flash-image-preview \
     "プロンプト" output/character/images/<name>.png
   ```
4. Read ツールで生成画像を視覚的に確認
5. 必要に応じてプロンプト調整・再生成

### 2. explore — デザイン探索

リファレンス画像から複数のデザインバリエーションを一括生成し、比較グリッドを作成する。

**使い方**: `/nanatau explore`

**手順**:
1. リファレンス画像と探索コンセプトを確認
2. TODO: 探索スクリプト (`explore_designs.py`) と設定ファイル (`design_variations.json`) は未実装。現時点では `generate` ワークフローを繰り返し実行してバリエーションを手動比較する
3. 採用候補を `output/explore/` に保存して比較確認

### 3. sheet — キャラシート生成

リファレンス画像からプロのアニメ設定画風キャラシートを生成する。

**使い方**: `/nanatau sheet <type>`

**タイプ**: `turnaround` | `detailed` | `expressions` | `poses` | `full`

**手順**:
1. リファレンス画像を確認
2. STYLE_GUIDE.md からシートテンプレートとキャラ説明を取得
3. シート生成スクリプトを実行:
   ```bash
   export $(grep GEMINI_API_KEY .env | xargs)
   python3 .claude/skills/character-sheet/scripts/generate_character_sheet.py \
     --reference <リファレンス画像パス> \
     --type <タイプ> \
     --output output/character/sheets/<name>.png
   ```
4. Read ツールで生成画像を視覚的に確認

### 4. pngtuber — PNGTuberアセットパイプライン

ベースポートレートから PNGTuber 用の表情フレーム一式を生成する。

**使い方**: `/nanatau pngtuber`

**パイプライン（4ステップ）**:
1. **ベースポートレート生成** — リファレンスから正面バストアップ生成
2. **表情グリッド生成** — ベースから2x2の目・口差分グリッド生成
3. **フレーム分割** — グリッドを4枚の個別フレームに切り出し
4. **背景透過** — rembg で全フレームの背景を透過処理
5. **最終化** — 4枚を検証し、`images/png-tuber/transparent/` に正本化

停止条件:
- ユーザーが EasyPNGTuber 相当の4枚PNGを求めている場合、`eyes_open_mouth_closed.png` / `eyes_open_mouth_open.png` / `eyes_closed_mouth_closed.png` / `eyes_closed_mouth_open.png` の4枚が揃った時点で完了とみなす
- MotionPNGTuber、loop.mp4、口スプライト化はユーザーが明示した場合だけ進む

ローカル処理は `scripts/` を優先:
- 分割: `scripts/split_pngtuber_grid.py`
- 背景透過: `scripts/remove_bg_batch.py`
- 検証と正本化: `scripts/finalize_pngtuber_assets.py`

詳細は [PNGTUBER.md](PNGTUBER.md) を参照。

### 5. rembg — 背景透過

任意のキャラ画像の背景を透過処理する。

**使い方**: `/nanatau rembg <path>`

**手順**:
```python
from PIL import Image
from rembg import remove

def remove_bg_clean(img, noise_threshold=30):
    result = remove(img, alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10)
    pixels = result.load()
    w, h = result.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if 0 < a < noise_threshold:
                pixels[x, y] = (0, 0, 0, 0)
    return result

img = Image.open("<入力パス>")
result = remove_bg_clean(img)
result.save("<出力パス>", "PNG")
```

ノイズ除去: `alpha < 30` のピクセルを完全透明にしてクリーンな出力を保証。

## モデル選択ガイド

| モデル | 用途 | コスト/枚 |
|--------|------|-----------|
| `gemini-3.1-flash-image-preview` (NB2) | コンセプト探索、ラフ生成 | 約6-7円 |
| `gemini-3-pro-image-preview` (NB Pro) | 高品質生成、キャラシート | 約25-27円 |

## 参照ファイル

- [STYLE_GUIDE.md](STYLE_GUIDE.md) — アートスタイル仕様、ブランドカラー、シートテンプレート
- [PROMPTS.md](PROMPTS.md) — 7バリエーションプロンプト、テンプレート
- [PNGTUBER.md](PNGTUBER.md) — PNGTuberパイプライン詳細

## 命名規則

- キャラ画像: `output/character/images/<概念名>.png`
- キャラシート: `output/character/sheets/<タイプ名>.png`
- PNGTuberフレーム: `output/character/sheets/pngtuber_frames/<state>.png`
- 透過フレーム: `output/character/sheets/pngtuber_frames_transparent/<state>.png`
- 正本化後フレーム: `images/png-tuber/transparent/<state>.png`
