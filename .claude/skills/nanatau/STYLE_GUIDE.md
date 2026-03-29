# ななたう スタイルガイド

## アートスタイル仕様（全生成共通）

全プロンプトの末尾に以下を付与すること。

```
## Art Style (MANDATORY for all nanatau generations)
- Proportions: 5.5-6 head ratio. NOT chibi, NOT tall-realistic. Compact-cute middle ground.
- Lineart: Clean, thin-to-medium weight lines with clear intent. Hair strands clearly separated with visible flow direction. NOT thick chunky outlines, NOT sketchy.
- Coloring: FLAT cel shading only. Warm color temperature throughout. Minimal shadows (soft single-layer if any). NO excessive gradients, NO AI-like glossy sheen, NO heavy rendering.
- Eyes: Large but proportionally natural. Round with multiple highlight layers. Detailed iris (gradient within, visible reflection layers). Expressive and emotional — the eyes carry the character's personality.
- Expression preference: Introverted, fragile emotions — teary, sleepy, embarrassed, trying-her-best. "Quiet bravery in vulnerability." NOT genki/energetic, NOT cool/sharp.
- Composition: Character-centered, 1-2 poses per image (character sheet style works well). Props held close to body.
- Background: MINIMAL. Simple warm gradient (cream/pale yellow to white) or dark navy night sky with stars. Never complex or distracting.
- Color temperature: WARM throughout. Even dark backgrounds should feel warm due to the character's yellow palette.
- Overall feel: Soft, gentle, healing. The kind of illustration that makes you feel warm and want to protect this character.
```

## ブランドカラーパレット（3色厳守）

| 役割 | 色 | コード | 用途 |
|------|-----|--------|------|
| メイン | ペールバターイエロー | #FFFDE7 | 髪色、衣装のベース |
| サブ | ソフトネイビー | #2C3E6B | アクセサリー、小物、衣装のアクセント |
| アクセント | ウォームホワイト | #FFF8E1 | ハイライト、星、光のエフェクト |

## 等身ガイド

| キャラタイプ | 等身 |
|-------------|------|
| ちび/マスコット | 2-3 |
| かわいい寄り（ななたうデフォルト） | 5.5-6 |
| スタンダード | 6-7 |
| クール/大人 | 7-8 |

## キャラベース説明（シートテンプレート用）

シートテンプレートの `{char_desc}` に使用するデフォルト説明:

```
- Hair: Soft pale yellow/butter blonde, long flowing waves
- Eyes: Warm golden amber with multiple sparkle highlights
- Outfit: Pastel yellow and white magical girl dress
- Accessories: As shown in reference image
- Body type: Petite, delicate frame
```

## デザイン原則

1. **内向的で儚い感情表現** — 泣きそう、眠そう、困っている、恥ずかしいなど「弱さの中の健気さ」
2. **暖色フラット塗り** — AIグラデーション禁止、ベタ塗り寄り
3. **繊細だが明快な線画** — 髪の毛束に流れの方向が見える
4. **背景ミニマル** — キャラが主役
5. **温かい色温度** — 暗い背景でもキャラの黄色で温かみが出る

---

## キャラシート テンプレート

### A: 三面図（ターンアラウンド）

```
Using this reference image as the EXACT character design to reproduce, create a professional anime character turnaround reference sheet.

IMPORTANT: Preserve the EXACT character from the reference — same hair color, eye color, outfit, accessories, proportions. Do NOT redesign. Faithfully reproduce this specific character from multiple angles.

SHEET LAYOUT:
- White or very light neutral background
- Three full-body views arranged LEFT to RIGHT: FRONT view, 3/4 SIDE view, BACK view
- All three views: same character, neutral standing pose, relaxed arms, balanced posture, clear silhouette
- Same height alignment across all three views
- Clean spacing between views, professional settei (setting material) layout

CHARACTER CONSISTENCY (maintain across ALL views):
{char_desc}

STYLE: Polished anime illustration, official setting material aesthetic. Consistent design across all views. Clean lineart, soft cel shading, {head_ratio} head ratio, warm color temperature. Professional anime production studio quality.

No extra fingers, consistent proportions, clean shading, no text labels, no watermark.
```

### B: 三面図 + ディテール

```
Using this reference image as the EXACT character design to reproduce, create a professional anime character reference sheet with turnaround views and detail close-ups.

IMPORTANT: Preserve the EXACT character from the reference. Do NOT redesign.

SHEET LAYOUT:
- White or very light neutral background
- LEFT SECTION: Three full-body views — FRONT, 3/4 SIDE, BACK — neutral standing pose, same height alignment
- RIGHT SECTION (stacked vertically):
  - TOP: Face CLOSE-UP showing eyes, expression, hair details, blush, earrings
  - BOTTOM: Accessory/detail CLOSE-UP showing key items (hair ornament, wand tip, jewelry, outfit trim)
- Clean panel borders or neat spacing, highly readable presentation

CHARACTER CONSISTENCY:
{char_desc}

STYLE: Polished anime illustration, official settei aesthetic. Consistent across all views and close-ups. Clean lineart, soft cel shading, {head_ratio} head ratio. High detail in close-up panels.

No extra fingers, consistent proportions, clean shading, no watermark.
```

### C: 表情差分シート

```
Using this reference image as the EXACT character design, create a professional anime expression sheet showing 6 different facial expressions of the SAME character.

IMPORTANT: Same character, same hair, same accessories — ONLY the expression changes.

SHEET LAYOUT:
- White background
- 2 rows x 3 columns grid of FACE CLOSE-UPS (head and shoulders)
- Each panel shows a different expression:
  Row 1: (1) Neutral/default smile  (2) Happy/laughing  (3) Crying/teary
  Row 2: (4) Embarrassed/blushing  (5) Surprised/shocked  (6) Sleepy/drowsy
- Clean grid borders, even spacing

CHARACTER BASE:
{char_desc}

EXPRESSION DETAILS:
1. NEUTRAL: Gentle default smile, calm eyes, soft blush
2. HAPPY: Big bright smile, eyes closed in joy, mouth open
3. CRYING: Tears streaming, sparkling tear drops, trembling lip, trying to smile
4. EMBARRASSED: Intense blush across face and ears, eyes looking away
5. SURPRISED: Eyes wide open, small "o" mouth, eyebrows raised
6. SLEEPY: Half-lidded droopy eyes, small yawn, relaxed expression

STYLE: Polished anime, consistent character across all 6 panels. Clean lineart, soft cel shading. Each expression immediately readable.

No extra fingers, consistent face, clean shading, no watermark.
```

### D: ポーズ差分シート

```
Using this reference image as the EXACT character design, create a professional anime pose sheet showing 4 different poses of the SAME character.

IMPORTANT: Same character, same outfit — ONLY the pose and expression changes.

SHEET LAYOUT:
- White or light background
- 4 full-body poses arranged left to right
- Poses:
  (1) Neutral standing (default, relaxed)
  (2) Action/dynamic pose (holding wand, casting)
  (3) Sitting pose (casual, on ground)
  (4) Emotional pose (crying, embarrassed, or sleeping)
- Even spacing, same ground line

CHARACTER:
{char_desc}

STYLE: Polished anime, consistent character across all 4 poses. Clean lineart, soft cel shading, {head_ratio} head ratio. Clear silhouettes.

No extra fingers, consistent proportions, clean shading, no watermark.
```

### E: フルセット

フルセットの場合は A + C + D を順番に3枚生成する。
