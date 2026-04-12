---
title: "月5ドルで GLM-5.1 が使い放題！crof.ai を Droid & Claude Code に繋ぐ設定集"
description: "crof.ai の Hobby プラン（$5/月）の API キーを発行して、Claude Droid と Claude Code の 2 通りの設定方法を紹介します。Anthropic 互換エンドポイントを使えば Claude Code もそのまま低コスト運用できます。"
date: 2026-04-12
tags:
  - AI
  - Claude Code
  - GLM
  - crof.ai
  - Tips
---

ななたうです！AI コーディングツール、毎月のコストが気になってきませんか…？

Claude Code はめちゃくちゃ便利なんですが、がっつり使うと料金がじわじわ増えていって、「うっ…」ってなる瞬間があります。そんなとき **crof.ai** というサービスを見つけて試してみたら、**月 $5 で GLM-5.1 が 1 日 500 リクエスト使える**ことがわかりました。

今回は Droid と Claude Code の 2 つのツールに繋ぐ設定方法をまとめます！

<!--more-->

## crof.ai ってどんなサービス？

[crof.ai](https://crof.ai/) は「格安 AI 推論プロバイダー」を謳うサービスです。

OpenAI 互換と Anthropic 互換の 2 種類のエンドポイントを持っているのが特徴で、さまざまなツールにそのまま差し込めます。

| エンドポイント | URL |
|---|---|
| OpenAI 互換 | `https://crof.ai/v1` |
| Anthropic 互換 | `https://anthropic.nahcrof.com` |

### 料金プラン

| プラン | 月額 | 1 日のリクエスト上限 |
|---|---|---|
| Free / Pay-as-you-go | 無料〜従量課金 | - |
| **Hobby** | **$5** | **500 リクエスト/日** |
| Pro | $10 | 1,000 リクエスト/日 |
| Scale | $50 | 7,500 リクエスト/日 |

個人で試す分には Hobby プランで十分すぎます！

### 使えるモデル（一例）

crof.ai では以下のようなモデルが利用できます。

| モデル ID | 特徴 |
|---|---|
| `glm-5.1` | Zhipu AI の GLM-5.1（コーディング特化） |
| `glm-5.1-precision` | GLM-5.1 高精度版（より複雑な推論向け） |
| `kimi-k2.5` | MoonshotAI の Kimi K2.5（バランス型） |
| `kimi-k2.5-lightning` | Kimi K2.5 高速版（軽量・低レイテンシ） |

## Step 1. API キーの取得

1. [crof.ai/signup](https://crof.ai/signup) でアカウント作成
2. ダッシュボードから **Hobby プラン（$5/月）** に申し込む
3. **API Keys** ページで新規キーを発行してコピーしておく

> **ポイント:** キーの形式は `nahcrof_XXXXXXXXXXXXXXXXXXXX` のようになります。

## Step 2A. Droid への設定

Droid の設定ファイル（`settings.json`）にカスタムモデルを追加します。

`customModels` セクションに以下を追記します。`apiKey` はコピーした API キーに差し替えてください。

```json
{
  "sessionDefaultSettings": {
    "model": "custom:crof.ai-GLM-5.1-0",
    "reasoningEffort": "high",
    "autonomyMode": "normal",
    "autonomyLevel": "high"
  },
  "customModels": [
    {
      "model": "kimi-k2.5",
      "id": "custom:crof.ai-Kimi-K2.5-0",
      "index": 0,
      "baseUrl": "https://crof.ai/v1",
      "apiKey": "nahcrof_XXXXXXXXXXXXXXXXXXXX",
      "displayName": "crof.ai Kimi K2.5",
      "maxOutputTokens": 16384,
      "noImageSupport": true,
      "provider": "generic-chat-completion-api"
    },
    {
      "model": "kimi-k2.5-lightning",
      "id": "custom:crof.ai-Kimi-K2.5-Lightning-0",
      "index": 1,
      "baseUrl": "https://crof.ai/v1",
      "apiKey": "nahcrof_XXXXXXXXXXXXXXXXXXXX",
      "displayName": "crof.ai Kimi K2.5 Lightning",
      "maxOutputTokens": 16384,
      "noImageSupport": true,
      "provider": "generic-chat-completion-api"
    },
    {
      "model": "glm-5.1",
      "id": "custom:crof.ai-GLM-5.1-0",
      "index": 2,
      "baseUrl": "https://crof.ai/v1",
      "apiKey": "nahcrof_XXXXXXXXXXXXXXXXXXXX",
      "displayName": "crof.ai GLM-5.1",
      "maxOutputTokens": 16384,
      "noImageSupport": true,
      "provider": "generic-chat-completion-api"
    },
    {
      "model": "glm-5.1-precision",
      "id": "custom:crof.ai-GLM-5.1-Precision-0",
      "index": 3,
      "baseUrl": "https://crof.ai/v1",
      "apiKey": "nahcrof_XXXXXXXXXXXXXXXXXXXX",
      "displayName": "crof.ai GLM-5.1 Precision",
      "maxOutputTokens": 16384,
      "noImageSupport": true,
      "provider": "generic-chat-completion-api"
    }
  ]
}
```

`sessionDefaultSettings.model` を `"custom:crof.ai-GLM-5.1-0"` にしておくと、起動時に GLM-5.1 がデフォルトで選ばれます。

> **注意:** `noImageSupport: true` になっているので、画像を使うタスクには対応していません。テキスト・コードに特化した使い方が向いています。

## Step 2B. Claude Code への設定

crof.ai は **Anthropic 互換エンドポイント**（`https://anthropic.nahcrof.com`）も提供しているので、Claude Code をそのまま差し替えで使えます。

`.zshrc`（または `.bashrc`）に以下のエイリアスを追加します。

```bash
alias claude-crof='
  ANTHROPIC_AUTH_TOKEN="$CROF_AI_API_KEY" \
  ANTHROPIC_BASE_URL="https://anthropic.nahcrof.com" \
  API_TIMEOUT_MS="3000000" \
  CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1 \
  ANTHROPIC_DEFAULT_HAIKU_MODEL="kimi-k2.5-lightning" \
  ANTHROPIC_DEFAULT_SONNET_MODEL="kimi-k2.5" \
  ANTHROPIC_DEFAULT_OPUS_MODEL="glm-5.1-precision" claude'
```

環境変数に API キーをセットしておきます。

```bash
export CROF_AI_API_KEY="nahcrof_XXXXXXXXXXXXXXXXXXXX"
```

`source ~/.zshrc` で反映したら、`claude-crof` コマンドで Claude Code が crof.ai 経由で起動します！

### 環境変数と crof.ai モデルの対応

Claude Code は内部で `ANTHROPIC_DEFAULT_HAIKU_MODEL` / `SONNET` / `OPUS` という 3 つの環境変数でモデルを切り替えます。このエイリアスではそれぞれに crof.ai のモデルを当てています。

| 環境変数 | 割り当てたモデル | 使いどころ |
|---|---|---|
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | `kimi-k2.5-lightning` | サブエージェント・軽量タスク |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | `kimi-k2.5` | メインの作業全般 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | `glm-5.1-precision` | 複雑な推論・設計タスク |

> **ポイント:** `glm-5.1-precision` を重いタスク用のスロットに当てておくと、Claude Code が多くのリソースを必要とする処理を呼び出したときに自動で使われます。

## コストのイメージ

Hobby プランの $5/月は **1 日 500 リクエスト**の上限付きです。

Claude Code を普通に使う分（1 セッション 50〜100 リクエスト程度）なら、1 日数セッションは余裕で動かせます。「ちょっとしたタスクを頼むサブエージェント」「試作フェーズの開発」みたいな用途にぴったりです。

## まとめ

**crof.ai × Droid / Claude Code の設定でした！**

ポイントをまとめると:

1. **crof.ai Hobby プラン（$5/月）** で API キー取得
2. **Droid** は `customModels` に `provider: "generic-chat-completion-api"` でサクッと追加
3. **Claude Code** は Anthropic 互換エンドポイント + 環境変数エイリアスで差し替え
4. モデルは `glm-5.1`（標準）と `glm-5.1-precision`（高精度）の 2 種類が使える

お財布に優しく AI コーディングできるので、ぜひ試してみてください！

---

X でも発信しているので、フォローしてもらえるとうれしいです！

https://x.com/pomufgd

## 参考リンク

https://crof.ai/pricing

https://github.com/nahcrof-code/crofAI
