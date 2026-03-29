---
name: verify
description: ブログのビルド検証を実行する。変更後の動作確認時に使用。
---

# /verify

ブログのビルドが通ることを検証します。

## 手順

1. `cd blog && deno task build` を実行
2. ビルドエラーがあれば報告し、修正を提案
3. 成功した場合は完了を報告
