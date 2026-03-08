---
title: "Lumeでブログをはじめてみた"
description: "Deno製SSG Lumeでブログを構築した話。セットアップから動かすまで。"
date: 2026-03-05
tags:
  - Lume
  - Deno
  - SSG
---

Deno製のSSG [Lume](https://lume.land/) を使って、このブログを立ち上げました。

<!--more-->

## なぜ Lume なのか

SSGは選択肢が多い。Hugo, Eleventy, Astro, Next.js… その中でLumeを選んだ理由はシンプル。

- **node_modules が存在しない** — Denoベースなので依存管理の苦痛がゼロ
- **セットアップが1コマンド** — `deno run -A https://lume.land/init.ts` で完了
- **クライアントJS零** — 出力が本当にただの静的HTML
- **テンプレートエンジンが豊富** — Markdown, Vento, Nunjucks, JSX, Pug など

## セットアップ

```bash
# Denoのインストール（まだの場合）
curl -fsSL https://deno.land/install.sh | sh

# Lumeプロジェクトの初期化
deno run -A https://lume.land/init.ts --theme=simple-blog
```

これだけで動くブログが手に入る。

```bash
# 開発サーバーの起動
deno task serve
```

`http://localhost:3000` でホットリロード付きの開発環境が立ち上がる。

## 記事の書き方

`posts/` ディレクトリにMarkdownファイルを置くだけ。フロントマターでメタデータを指定する。

```yaml
---
title: "記事のタイトル"
description: "記事の説明"
date: 2026-03-05
tags: [Lume, Deno]
---
```

`<!--more-->` タグで抜粋の区切りを指定できる。

## まとめ

- Lumeは **Deno製SSG** で、node_modules不要・1コマンドセットアップの手軽さが魅力
- `simple-blog` テーマなら、セットアップからデプロイまで30分もかからない
- これからいろいろ書いていきます 🔥
