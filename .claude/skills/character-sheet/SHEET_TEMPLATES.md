# キャラクターシート テンプレート集

## 共通ルール

全テンプレートに以下を適用:
- リファレンス画像を入力に含め、キャラデザインの忠実な再現を指示
- 白または薄い中間色の背景
- クリーンな線画、フラットなセル塗り
- 全ビューで同一キャラの一貫性を厳守

## A: 三面図（ターンアラウンド）

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

## B: 三面図 + ディテール

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

## C: 表情差分シート

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
- Each expression is clearly distinct but the CHARACTER is unmistakably the same person

CHARACTER BASE:
{char_desc}

EXPRESSION DETAILS:
1. NEUTRAL: Gentle default smile, calm eyes, soft blush
2. HAPPY: Big bright smile, eyes closed in joy, mouth open
3. CRYING: Tears streaming, sparkling tear drops, trembling lip, trying to smile through tears
4. EMBARRASSED: Intense blush across face and ears, eyes looking away, hand near mouth
5. SURPRISED: Eyes wide open, small "o" mouth, eyebrows raised high
6. SLEEPY: Half-lidded droopy eyes, small yawn, relaxed expression

STYLE: Polished anime, consistent character across all 6 panels. Clean lineart, soft cel shading. Each expression must be immediately readable.

No extra fingers, consistent face across panels, clean shading, no watermark.
```

## D: ポーズ差分シート

```
Using this reference image as the EXACT character design, create a professional anime pose sheet showing 4 different poses of the SAME character.

IMPORTANT: Same character, same outfit — ONLY the pose and expression changes.

SHEET LAYOUT:
- White or light background
- 4 full-body poses arranged left to right in a single row
- Each pose is clearly different but the CHARACTER is the same
- Poses:
  (1) Neutral standing (default, relaxed)
  (2) Action/dynamic pose (holding wand, casting spell)
  (3) Sitting pose (on ground or chair, casual)
  (4) Emotional pose (crying, embarrassed, or sleeping — character-appropriate)
- Even spacing, same ground line alignment

CHARACTER:
{char_desc}

STYLE: Polished anime, consistent character across all 4 poses. Clean lineart, soft cel shading, {head_ratio} head ratio. Clear silhouettes for each pose.

No extra fingers, consistent proportions, clean shading, no watermark.
```

## E: フルセット（複数枚）

フルセットの場合は A + C + D を順番に3枚生成する。

---

## `{char_desc}` の埋め方

`output/character/prompt.md` が存在する場合はそこからキャラ詳細を読み込む。
存在しない場合は、リファレンス画像から以下を読み取って記述:

```text
- Hair: [色、長さ、スタイル、特徴的な部分]
- Eyes: [色、形、ハイライト、表情]
- Outfit: [メインの衣装、色、ディテール]
- Accessories: [ヘアアクセ、イヤリング、ステッキ等]
- Body type: [体型、プロポーション]
- Color palette: [メイン色、サブ色、アクセント色]
```

## {head_ratio} の目安

| キャラタイプ | 等身 |
|-------------|------|
| ちび/マスコット | 2-3 |
| かわいい寄り | 5-6 |
| スタンダード | 6-7 |
| クール/大人 | 7-8 |
