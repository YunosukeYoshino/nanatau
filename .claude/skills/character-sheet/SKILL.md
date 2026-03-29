---
name: character-sheet
description: Generate anime character reference sheets (model sheets) from a reference image using Gemini API. Use when user mentions "キャラシート", "三面図", "character sheet", "reference sheet", "model sheet", "設定画", "ターンアラウンド".
---

# キャラクターシート生成

リファレンス画像からプロのアニメ設定画風キャラクターシートを生成する。

## Prerequisites

1. `GEMINI_API_KEY` が `.env` または環境変数に設定されていること
2. `google-genai` と `Pillow` がインストール済みであること
3. リファレンス画像が存在すること

## ワークフロー

1. **リファレンス確認**: ユーザーからリファレンス画像のパスを受け取る（なければ `output/character/images/` から選択）
2. **シートタイプ選択**: AskUserQuestion で以下から選択
   - A: 三面図（正面・横・背面）
   - B: 三面図 + 顔アップ + アクセサリーディテール
   - C: 表情差分シート（6表情）
   - D: ポーズ差分シート（4ポーズ）
   - E: フルセット（三面図 + 表情 + ポーズ、複数枚生成）
3. **スタイル指定読み込み**: `output/character/prompt.md` が存在すれば、画風スタイル指定とブランドカラーを読み込む
4. **プロンプト生成**: SHEET_TEMPLATES.md のテンプレートを使用
5. **生成実行**: `scripts/generate_character_sheet.py` で生成
6. **検証**: 生成画像を read_file で視覚的に確認
7. **保存**: `output/character/sheets/` に保存

## 参照ファイル

- [SHEET_TEMPLATES.md](SHEET_TEMPLATES.md): シートタイプ別テンプレート
- `output/character/prompt.md`: プロジェクトの画風・配色設定（存在すれば参照）

## 生成スクリプト

`scripts/generate_character_sheet.py` を使用する。

```bash
python3 scripts/generate_character_sheet.py \
  --reference path/to/reference.png \
  --type turnaround \
  --model gemini-3-pro-image-preview \
  --output output/character/sheets/sheet_name.png
```

## 必須ルール

- リファレンス画像のキャラクターデザインを忠実に再現すること
- 全ビューでキャラの一貫性を保つこと（同じ髪色、衣装、プロポーション）
- 背景は白またはごく薄い中間色。キャラが見やすいこと
- 生成後は必ず視覚的に確認し、破綻があれば再生成
