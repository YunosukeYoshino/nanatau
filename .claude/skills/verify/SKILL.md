---
name: verify
description: Trigger when the user asks to verify a change by running the blog build.
---

# /verify

ブログのビルドが通ることを検証します。

## Step 1: 手順

1. `cd blog && deno task build` を実行
2. ビルドエラーがあれば報告し、修正を提案
3. 成功した場合は完了を報告

**完了確認:** `deno task build` が成功し、結果を報告できたら完了。
