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

# Blog production build
cd ../blog
deno task build
```

## Directory

- `images/`: approved source assets
- `site/`: React/TypeScript/Vite showcase site
- `blog/`: Lume-based blog
- `.claude/skills/motion-pngtuber-nanatau/`: MotionPNGTuber skill and scripts

## MotionPNGTuber

動画ベースの MotionPNGTuber パイプラインは `.claude/skills/motion-pngtuber-nanatau/` に集約している。

- 作業中の成果物: `output/` 配下（セットごとの作業ディレクトリは必要時に作成）
- 正本: `images/png-tuber/motion/<set-name>/`
- 標準検証: `.claude/skills/motion-pngtuber-nanatau/scripts/verify_server.py --mode stub`
