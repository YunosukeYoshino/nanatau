# nanatau

Repository for the VTuber "nanatau" character design, asset management, showcase site, and blog.

<p align="center">
  <img src="./blog/images/favicon.png" alt="nanatau icon" width="420">
</p>

## Character Prompt

> Quiet bravery in vulnerability.

```text
Soft pale yellow hair, warm golden amber eyes with layered highlights,
pastel yellow and white magical girl outfit, delicate frame.
Expression is introverted, fragile, and trying-her-best:
teary, sleepy, embarrassed, but gentle.
Clean thin-to-medium lineart, flat cel shading, minimal warm background.
Palette is strictly Pale Butter Yellow (#FFFDE7),
Soft Navy (#2C3E6B), Warm White (#FFF8E1).
```

## Getting Started

### Showcase site

The React/TypeScript showcase is managed independently in `site/`.

```bash
cd site
bun install
bun run dev
```

Open the URL printed by Vite, usually <http://localhost:5173/>.

### Blog

The blog uses Lume and Deno.

```bash
cd blog
deno task serve
```

## Usage

```bash
# Root secret scanning
bun install
bun run secretlint

# Showcase typecheck and production build
cd site
bun run typecheck
bun run build
bun run preview
bun run deploy:dry-run
bun run deploy

# Blog production build
cd ../blog
deno task build
```

## Directory

- `images/`: approved source assets
- [models/](models/README.md): adopted 3D models, videos, and verification records
- `output/`: generated work files and source materials, excluded from Git
- `site/`: React/TypeScript/Vite showcase site
- `blog/`: Lume-based blog
- `.claude/skills/motion-pngtuber-nanatau/`: MotionPNGTuber skill and scripts

## 3D Avatar

採用したCharakuru版の[成果物一覧](models/avatar-v1/charakuru/README.md)から、編集用Blend・MToon対応VRM・動画・検証記録へ進める。

| 見たいもの | 確認先 |
| --- | --- |
| 現在のデモ | [Samba Dancing](models/avatar-v1/charakuru/videos/dance-demo.mp4)：18.2秒・1080×1080・無音 |
| 音付きショート | [愛包ダンスホール](models/avatar-v1/charakuru/videos/dance-short.mp4)：16秒・720×1280 |
| 外観 | [6方向・顔アップ・動作確認画像](images/concept/avatar-v1/charakuru/README.md) |

## MotionPNGTuber

動画ベースの MotionPNGTuber パイプラインは `.claude/skills/motion-pngtuber-nanatau/` に集約している。

- 作業中の成果物: `output/` 配下（セットごとの作業ディレクトリは必要時に作成）
- 正本: `images/png-tuber/motion/<set-name>/`
- 標準検証: `.claude/skills/motion-pngtuber-nanatau/scripts/verify_server.py --mode stub`
