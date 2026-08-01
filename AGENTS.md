---
last_validated: 2026-08-01
---

# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Priority Checklist

- 画像生成前に `@.claude/skills/nanatau/STYLE_GUIDE.md` を確認する
- 生成物は必ず `output/` に出す
- 採用した画像だけを `images/` 配下へコピーして正本化する
- 配色は `Pale Butter Yellow (#FFFDE7) / Soft Navy (#2C3E6B) / Warm White (#FFF8E1)` を守る

## Project Overview

VTuber "ななたう" のキャラクターデザイン・素材管理・ブログプロジェクト。

- キャラクター: 魔法少女 x 泣き虫。涙が魔力の源。
- 画像生成: Gemini API (`gemini-3-pro-image-preview` for high-quality, `gemini-3.1-flash-image-preview` for exploration)
- Showcase: React 19 / TypeScript / Vite の静的サイト（`site/`）
- ブログ: Lume (Deno) 静的サイト → GitHub Pages

## Directory Structure

```text
Top-level:
├── images/                # 正本・製本済み素材（git管理）
├── output/                # 生成AIの作業出力（git管理外）
├── site/                  # React/TypeScript/Vite Showcaseサイト
├── blog/                  # Lume ブログ（独自CLAUDE.mdあり）
└── .claude/skills/        # 制作・検証用Skill
```

## Key Locations

- `images/concept/showcase/`: Showcaseで使用するキービジュアル・表情素材
- `images/png-tuber/motion/`: MotionPNGTuberの正本セット
- `output/`: MotionPNGTuberを含む生成作業の作業領域
- `site/src/app/`: Reactのcomposition root
- `site/src/features/`: 画面の縦スライス
- `site/src/shared/`: 最小限の共有部品・設定
- `blog/`: Lumeブログのエントリポイントとテーマ

## Rules

- `output/` は生成AIの出力先。作業用なのでgit管理しない
- 採用した画像は `output/` から `images/` の適切なサブディレクトリへコピーして正本化する
- `images/png-tuber/` は transparent / opaque で分ける
- MotionPNGTuber セットは `images/png-tuber/motion/<set-name>/` にまとめる
- MotionPNGTuber の作業中ファイルは `output/` 配下のセット用サブディレクトリに置く
- `images/concept/` にはキービジュアルと三面図（`reference_sheet`）を格納
- `site/` の正本画像は `images/concept/showcase/` から参照する

## Art Style Constraints

全画像生成で守る必須ルール:

- 等身: 5.5-6頭身（ちびでもリアルでもない）
- 線画: クリーンな細〜中太ライン、フラットセル塗りのみ
- 配色: Pale Butter Yellow (#FFFDE7) / Soft Navy (#2C3E6B) / Warm White (#FFF8E1) の3色
- 詳細は @.claude/skills/nanatau/STYLE_GUIDE.md を参照

## Showcase Commands

```bash
cd site
bun install
bun run dev        # 開発サーバー
bun run typecheck  # TypeScriptチェック
bun run build      # 本番ビルド
bun run preview    # 本番ビルドの確認
bun run deploy:dry-run  # Cloudflare Worker dry-run
bun run deploy           # Cloudflare Workerへデプロイ
```

デプロイにはWranglerのCloudflare認証が必要。設定は`site/wrangler.jsonc`で管理する。

## Blog Commands

```bash
cd blog && deno task serve   # dev server (localhost:3002)
cd blog && deno task build   # production build
```

## Environment

- `GEMINI_API_KEY` が `.env` に必要（画像生成用）
- `.env` は `.gitignore` に含まれている
- Python 3.13+（キャラシート生成スクリプト用）
  - 依存: `pip install google-genai Pillow "rembg[cpu]"`
- Bun（ルートのsecretlintおよび`site/`用）
- MotionPNGTuber は別系統
  - Python `3.10.x`
  - 依存は repo 直下の `pyproject.toml`
  - 実装本体は `.claude/skills/motion-pngtuber-nanatau/scripts/`
- Deno（ブログ用）

## Safety

- `.env`、APIキー、生成物などの秘密情報・作業ファイルをコミットしない
- 破壊的な操作や外部公開を伴う操作は、実行前に対象を確認する

## Communication

- 返答と作業報告は日本語で簡潔に行う
- 変更は目的のファイルに限定し、実装とドキュメントのパスを一致させる

## Skills and References

- `.claude/skills/nanatau/SKILL.md`: nanatauの制作ルール
- `.claude/skills/character-sheet/SKILL.md`: キャラクターシート生成
- `.claude/skills/motion-pngtuber-nanatau/SKILL.md`: MotionPNGTuber制作・検証
- `.claude/skills/nanatau-blog-writer/SKILL.md`: ブログ執筆
- `.claude/skills/verify/SKILL.md`: 検証手順
- `site/README.md`: Showcaseサイトの開発手順と縦スライス構成

## Git

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Main branch: `main`
