# ななたう プロンプト集

## 確定ビジュアル（固定）

ななたうの外見は以下で確定。全生成でこのビジュアルを維持すること。

### キャラクター外見仕様

```
CHARACTER VISUAL (FIXED — do not change across any variation):
- Hair: Very long soft PALE YELLOW (butter blonde) wavy hair reaching past waist. Small side braids on both sides. Soft wispy bangs.
- Eyes: Large round WARM GOLDEN AMBER eyes with multiple sparkle highlights and teardrop-shaped reflections. Expressive and emotional.
- Face: Soft round face, gentle blush on cheeks, fair skin. Star-shaped earrings on both ears.
- Hair accessories: Crystal TEARDROP-SHAPED hair clips (pale blue/crystal) on both sides of head, attached near the side braids.
- Outfit: Pastel yellow and cream/white magical girl dress. Yellow bodice with white layered petticoat skirt. Yellow lace trim with teardrop embroidery on skirt hem. Puff sleeves with elegant trim. Light BLUE RIBBON bow at chest center.
- Wand: Magical wand with teardrop crystal tip, pale yellow glow.
- Body type: Petite, delicate, small frame. 5.5-6 head ratio.
- Overall theme: Tears, light, droplets, soft sparkle. Warm and gentle.
```

### リファレンス画像

生成時は以下のリファレンス画像を入力に含めること:

- メインリファレンス: `output/character/images/crybaby_magicalgirl_v2.png`
- キャラシート: `output/character/images/crybaby_reference_sheet.png`
- PNGTuberベース: `output/character/sheets/pngtuber_base.png`

---

## 生成テンプレート（外見固定 + シーン/表情可変）

```
Using this reference image as the EXACT character design, generate a new illustration of this same character.

CHARACTER VISUAL (MUST match reference exactly):
- Same pale yellow long wavy hair with side braids
- Same golden amber eyes with teardrop highlights
- Same teardrop crystal hair clips (both sides)
- Same star earrings
- Same pastel yellow and white magical girl dress with blue chest ribbon
- Same puff sleeves, layered skirt, teardrop embroidery
- Same wand with teardrop crystal tip

SCENE/EXPRESSION:
[ここにシーンや表情の指示を記述]

STYLE: High-quality anime 2D, 5.5-6 head ratio, clean thin-to-medium lineart,
detailed emotional eyes with multiple highlights, flat cel shading with warm tones,
minimal soft shadows, warm color temperature throughout.
No extra fingers, clean shading, no text, no watermark.
```

---

## 性格バリエーション（外見固定、表情・ポーズ・シーンのみ変更）

### A: crybaby — 泣き虫（デフォルト）

涙が魔力の源。泣けば泣くほど強くなる。

```
SCENE/EXPRESSION:
- Pose: Holding teardrop wand to chest with both hands. Shoulders raised nervously. Looking up through bangs with watery eyes.
- Expression: Eyes welling with beautiful sparkling tears, trying brave crumpled smile. Two glowing tear droplets floating near face. Bottom lip trembling. Rosy cheeks, pink nose tip from crying.
- Background: Soft pale yellow to white gradient, floating teardrop light particles.
- Mood: "I want to protect this girl" feeling. Introverted fragile emotion.
```

### B: pajama — パジャマ末っ子

変身が間に合わない。パジャマのまま戦場に来る。

```
SCENE/EXPRESSION:
- Pose: Rubbing one eye sleepily with fist (moe sleeve). Other arm hugs a star-pattern dakimakura. Slouched posture.
- Expression: Tiny sleepy pout/yawn, eyes barely open (half-lidded). Faint pillow mark on left cheek. Adorably disheveled hair.
- Extra items: Oversized floppy nightcap (pale yellow, crescent moon charm). Navy blue blanket draped as cape over her magical girl outfit. One fluffy bunny slipper.
- Background: Dark navy night sky with scattered stars, or soft pale yellow gradient.
- Mood: Sleepy warmth. Reluctant hero.
```

### C: shy — コミュ障

「画面越しなら喋れる」でVTuberを始めた。

```
SCENE/EXPRESSION:
- Pose: Shoulders hunched inward making herself small. One hand gripping sleeve nervously. Other hand holds a magical microphone reluctantly at arm's length. She hides behind her hair.
- Expression: Intense red blush across entire face and ears. Eyes looking sideways and down (averted gaze, cannot make eye contact). Biting lower lip mid-stutter. Tiny hint of determination underneath.
- Extra items: Soft navy blue scarf/muffler she buries lower face into. Oversized headphones around neck.
- Background: Soft pale yellow gradient, minimal.
- Mood: Intense embarrassment. "画面越しなら喋れる" vulnerability.
```

### D: memory-reset — 記憶リセット

七日ごとに記憶が消える。手にマジックでメモを書く。

```
SCENE/EXPRESSION:
- Pose: One hand (with writing visible on skin) reaching toward viewer gently. Other hand holds a small diary to chest protectively. Head slightly tilted in gentle confusion.
- Expression: Bittersweet smile breaking through confusion. Eyes slightly watery, distant but warm. Small uncertain smile. Feeling an emotion she cannot explain.
- Extra items: Handwritten messages in black marker on left hand and forearm (hearts, stars, small notes). Diary with star stickers on cover. Pen behind ear. Navy blue ribbon tied around wrist.
- Background: Soft warm gradient, faintly scattered notes and star shapes floating like memories drifting away.
- Mood: "I don't remember, but being here feels safe." Bittersweet healing.
```

### E: dog — 犬系彼女

精神が完全に犬。無条件の好意。

```
SCENE/EXPRESSION:
- Pose: Leaning forward toward viewer excitedly, both hands up in "paw" gesture near face. Whole body radiates joy. Slight bounce.
- Expression: Biggest genuine smile. Mouth wide open in pure joy. Eyes sparkling with uncontainable happiness. Flushed cheeks. Zero guile.
- Extra items: A fluffy pale yellow tail (golden retriever-like) visible behind her, wagging energetically. Navy blue collar with star name-tag around neck (over her usual outfit).
- Background: Warm soft gradient, sparkles and heart/star particles.
- Mood: Unconditional love. "SO HAPPY to see you!" energy.
```

### F: oshikatsu — 推し活オタク

推しの先輩魔法少女に会いたくて魔法少女になった。

```
SCENE/EXPRESSION:
- Pose: Gesturing excitedly with one hand, other clutching a yellow star-tipped penlight to chest. Leaning forward with passion.
- Expression: Huge excited smile, flushed pink cheeks, eyes absolutely sparkling with multiple star highlights. She is talking way too fast about her oshi.
- Extra items: Yellow penlight with star tip. Acrylic keychains on lanyard around neck. Yellow phone case with charms visible. Star scrunchie holding half-up ponytail (hair is same but styled differently).
- Background: Soft warm gradient with star/penlight bokeh effects.
- Mood: Pure fan devotion. Mid-oshi-talk energy.
```

### G: gyaru — ギャル

変身すると敬語になる。普段はギャル。

```
SCENE/EXPRESSION:
- Pose: Peace sign near face with one hand, other hand on hip. Confident stance, weight on one leg.
- Expression: Playful wink with tongue slightly out. Confident "selfie-ready" energy. Thick eyelashes (gyaru false lashes), eyeliner wings.
- Extra items: Her usual outfit but styled more casually — sleeves pushed up, ribbon loosened. Long painted nails (yellow with star designs). Transformation compact dangling from outfit like a keychain.
- Background: Simple yellow-to-white gradient with star sparkles.
- Mood: Trendy, confident, but with hidden depth.
```

---

## 生成コマンド例

```bash
# .env から API キーを読み込む
export $(grep GEMINI_API_KEY .env | xargs)

# リファレンス画像付き生成（Python インライン）
PYTHON=/Users/yunosukeyoshino/.local/share/mise/installs/python/3.13.12/bin/python3
$PYTHON << 'PYEOF'
import io
from pathlib import Path
from PIL import Image
from google import genai

client = genai.Client()
ref_img = Image.open("output/character/images/crybaby_magicalgirl_v2.png")

prompt = """Using this reference image as the EXACT character design...
[テンプレート + SCENE/EXPRESSION を挿入]
"""

response = client.models.generate_content(
    model="gemini-3.1-flash-image-preview",  # or gemini-3-pro-image-preview
    contents=[ref_img, prompt],
    config=genai.types.GenerateContentConfig(
        response_modalities=["TEXT", "IMAGE"],
    ),
)

for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
        img = Image.open(io.BytesIO(part.inline_data.data))
        img.save("output/character/images/output_name.png", "PNG")
        break
PYEOF
```

## モデル選択

| モデル | 用途 | コスト/枚 |
|--------|------|-----------|
| `gemini-3.1-flash-image-preview` (NB2) | 探索・ラフ | 約6-7円 |
| `gemini-3-pro-image-preview` (NB Pro) | 高品質・最終 | 約25-27円 |
