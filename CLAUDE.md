---
last_validated: 2026-08-01
---

# CLAUDE.md

Repository-wide instructions are maintained in @AGENTS.md.

## WHAT / WHY / HOW

This repository manages nanatau's character assets, React showcase site, and Lume blog.

## WHY

Keep approved visual assets, generation workflows, and public-facing sites consistent.

## HOW

Use the commands and key locations below, then read @AGENTS.md before making changes.

## Core Commands

```bash
bun run secretlint
bun run dev
bun run typecheck
bun run build
bun run preview
cd blog && deno task serve
cd blog && deno task build
```

The root `dev`, `typecheck`, `build`, and `preview` scripts delegate to `site/`.

## Project Structure

- `site/`: React/TypeScript/Vite showcase site
- `images/`: approved source assets
- `output/`: ignored generation workspace
- `blog/`: Lume blog
- `.claude/skills/`: project-specific skills

## Key Locations

| Path | Role |
| --- | --- |
| `site/src/app/` | composition root |
| `site/src/features/` | vertical slices |
| `site/src/shared/` | shared configuration and UI |
| `images/concept/showcase/` | showcase source assets |

## Safety and Communication

- Keep secrets and generated work files out of commits.
- Confirm destructive or externally visible operations before running them.
- Report work briefly in Japanese and keep changes scoped.

## Skills and Rules

Read @AGENTS.md for the full project rules before making changes. The project skills are:

- `character-sheet`
- `motion-pngtuber-nanatau`
- `nanatau`
- `nanatau-blog-writer`
- `verify`
