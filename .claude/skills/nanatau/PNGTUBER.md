# PNGTuber アセットパイプライン

## パイプライン概要

```
Step 1: ベースポートレート生成
    -> output/character/sheets/pngtuber_base.png

Step 2: 表情グリッド生成（2x2）
    -> output/character/sheets/pngtuber_expressions.png

Step 3: グリッドを4フレームに分割
    -> output/character/sheets/pngtuber_frames/
         eyes_open_mouth_closed.png
         eyes_open_mouth_open.png
         eyes_closed_mouth_closed.png
         eyes_closed_mouth_open.png

Step 4: 全フレームの背景透過
    -> output/character/sheets/pngtuber_frames_transparent/
         (同名4ファイル)
```

## Step 1: ベースポートレート

リファレンス画像（キャラシートまたはイラスト）を入力として、PNGTuber用のベースポートレートを生成する。

### プロンプトテンプレート

```
Using the attached character reference sheet as the ONLY design reference, create a single PNGTuber base portrait of this exact character.

CHARACTER CONSISTENCY (CRITICAL):
- Same face shape, eye shape, eye color, hairstyle, hair color
- Same hair ornaments, earrings, outfit design
- Same art style, color palette, line quality

IMAGE REQUIREMENTS:
- Single character only, centered composition
- FRONT-FACING, head perfectly upright, NO tilt
- Looking STRAIGHT at the viewer (direct eye contact)
- BUST-UP portrait (head, shoulders, upper chest visible)
- Face large and clearly visible
- NEUTRAL calm expression
- Eyes open naturally, mouth CLOSED
- Both eyes and mouth FULLY visible, no obstruction
- NO hands or props near the face
- Simple clean background (light cream or off-white)

TECHNICAL REQUIREMENTS FOR EXPRESSION EDITING:
- Face PERFECTLY SYMMETRICAL and stable
- Head facing directly forward
- Clean separation between facial features
- Consistent front lighting, no dramatic shadows
- Each feature (eyes, mouth, eyebrows) cleanly isolated

STYLE: Polished anime, high detail, clean lineart, soft cel shading, 5.5-6 head ratio, warm color temperature.

NEGATIVE: No side view, no head tilt, no wink, no closed eyes, no open mouth, no hand pose, no strong shadows, no complex background, no watermark.
```

### 実行方法

```python
ref_img = Image.open("output/character/sheets/crybaby_reference_sheet.png")
# Gemini API に ref_img + プロンプト を送信
# 出力: output/character/sheets/pngtuber_base.png
```

## Step 2: 表情グリッド（2x2）

ベースポートレートを入力として、目と口だけを編集した2x2グリッドを生成する。

### プロンプトテンプレート

```
TASK: Edit ONLY the eyes and mouth of this reference image to create a 2x2 expression grid for PNGTuber animation frames.

CRITICAL: Use this image as the EXACT base. Do NOT redraw. The output must be the SAME image with ONLY eyelids and mouth edited. Everything else PIXEL-IDENTICAL across all 4 panels.

DO NOT CHANGE: head, hair, accessories, outfit, background, face shape, lighting, colors, line weight. ONLY change eyelid position and mouth shape.

2x2 GRID:
TOP-LEFT: Original unchanged (eyes open, mouth closed)
TOP-RIGHT: Eyes open + mouth slightly open (small speaking mouth)
BOTTOM-LEFT: Eyes closed (gentle blink) + mouth closed
BOTTOM-RIGHT: Eyes closed + mouth slightly open

Make mouth-open panels visibly different from closed. Keep changes localized. Do not move facial features. Clean 2x2 grid layout with thin borders.
```

### 実行方法

```python
base_img = Image.open("output/character/sheets/pngtuber_base.png")
# Gemini API に base_img + プロンプト を送信
# 出力: output/character/sheets/pngtuber_expressions.png
```

## Step 3: グリッド分割

2x2グリッドを4つの個別フレームに分割する。

### Python コード

```python
from pathlib import Path
from PIL import Image

src = Image.open("output/character/sheets/pngtuber_expressions.png")
w, h = src.size
hw, hh = w // 2, h // 2

panels = {
    "eyes_open_mouth_closed": (0, 0, hw, hh),
    "eyes_open_mouth_open": (hw, 0, w, hh),
    "eyes_closed_mouth_closed": (0, hh, hw, h),
    "eyes_closed_mouth_open": (hw, hh, w, h),
}

out_dir = Path("output/character/sheets/pngtuber_frames")
out_dir.mkdir(parents=True, exist_ok=True)

for name, box in panels.items():
    panel = src.crop(box)
    panel.save(str(out_dir / f"{name}.png"), "PNG")
```

## Step 4: 背景透過 + ノイズ除去

全フレームの背景を透過処理し、ノイズピクセルを除去する。

### 生成時の注意

Step 1 のベースポートレート生成時に、背景を**純白 (`#FFFFFF`)**で明示的に指定すること。
これにより rembg の判定精度が上がり、ノイズが大幅に減少する。

### Python コード

```python
from pathlib import Path
from PIL import Image
from rembg import remove


def remove_bg_clean(img: Image.Image, noise_threshold: int = 30) -> Image.Image:
    """背景透過 + ノイズ除去。alpha < noise_threshold のピクセルを完全透明にする。"""
    result = remove(
        img,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
    )
    # ノイズ除去: ほぼ透明なピクセルを完全透明にする
    pixels = result.load()
    w, h = result.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if 0 < a < noise_threshold:
                pixels[x, y] = (0, 0, 0, 0)
    return result


# フレーム一括処理
src_dir = Path("output/character/sheets/pngtuber_frames")
out_dir = Path("output/character/sheets/pngtuber_frames_transparent")
out_dir.mkdir(parents=True, exist_ok=True)

for f in sorted(src_dir.glob("*.png")):
    img = Image.open(f)
    result = remove_bg_clean(img)
    result.save(str(out_dir / f.name), "PNG")
```

ベースポートレートも同様に透過:

```python
img = Image.open("output/character/sheets/pngtuber_base.png")
result = remove_bg_clean(img)
result.save("output/character/sheets/pngtuber_base_transparent.png", "PNG")
```

## 出力ファイル構造

```
output/character/sheets/
  pngtuber_base.png                    -- Step 1 出力
  pngtuber_base_transparent.png        -- Step 4 出力（ベース透過）
  pngtuber_expressions.png             -- Step 2 出力（2x2グリッド）
  pngtuber_frames/                     -- Step 3 出力
    eyes_open_mouth_closed.png
    eyes_open_mouth_open.png
    eyes_closed_mouth_closed.png
    eyes_closed_mouth_open.png
  pngtuber_frames_transparent/         -- Step 4 出力
    eyes_open_mouth_closed.png
    eyes_open_mouth_open.png
    eyes_closed_mouth_closed.png
    eyes_closed_mouth_open.png
```

## コスト見積もり

| ステップ | NB2 (Flash) | NB Pro |
|---------|-------------|--------|
| Step 1: ベースポートレート | 約7円 | 約25円 |
| Step 2: 表情グリッド | 約7円 | 約25円 |
| Step 3: 分割 | 0円（ローカル処理） | 0円 |
| Step 4: 背景透過 | 0円（ローカル処理） | 0円 |
| **合計** | **約14円** | **約50円** |

## veadotube mini への読み込み

`pngtuber_frames_transparent/` の4ファイルを veadotube mini に読み込む:
- **Idle（無音時）**: `eyes_open_mouth_closed.png`
- **Talking（発話時）**: `eyes_open_mouth_open.png`
- **Blink（まばたき）**: タイマーで `eyes_closed_mouth_closed.png` に切替
- **Blink + Talk**: `eyes_closed_mouth_open.png`
