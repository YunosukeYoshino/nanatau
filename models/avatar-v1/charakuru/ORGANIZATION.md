# Charakuru成果物の配置記録

2026-10-09。Branch: `apply`。Mode: `knowledge-agent-ops`。
対象は採用3Dモデル・確認動画・画像・検証記録。Directory Architectureの `references/patterns.md` → **Knowledge / Agent Operations Repo** を参照し、このrepoの `images/`・`models/`・`output/` 規約を優先する。

## 事前確認

- ルート `package.json` はBunのsecretlintとsiteコマンド、`pyproject.toml` はMotionPNGTuber用。今回の移動対象に実行コードは含まない。
- `site/` はReact/Vite、画像aliasは `images/concept/showcase/`。`blog/` はLume/Deno。CIの公開対象はsite/blogで、Charakuru動画や検証JSONへの参照はない。
- `.gitattributes` は `project.charakit` の固定パスをLFS管理する。採用モデル4ファイルの名前とパスは保持する。
- 現状は直下に編集データと動画3本、`verification/`にモデル・愛包・サンバのJSON15件が混在。READMEは制作詳細が中心で、成果物を選ぶ入口が薄い。
- `output/charakuru/nanatau-avatar-v1/` は稼働中Kitと再現用作業データを含む。スクリプトの固定パスを維持し、ローカルREADMEで案内する。

## 配置

```text
models/avatar-v1/charakuru/
├── README.md              # 成果物を選ぶ入口
├── PRODUCTION.md          # 制作経緯・仕様・利用条件・検証の詳細
├── ORGANIZATION.md        # この移動記録
├── manifest.json          # 採用情報と現パスのハッシュ
├── avatar.blend
├── avatar.vrm
├── project.charakit
├── review.fbx
├── videos/                # デモ・音付きショート・比較
└── verification/
    ├── avatar/            # 骨・VRM・FBX・MToon
    ├── aipai/             # 愛包ダンスホール
    └── samba/             # Samba Dancing
```

採用画像は `images/concept/avatar-v1/charakuru/` のまま、READMEから一覧とモデル正本へ進める。ルートREADMEと `models/README.md` から成果物一覧を案内する。

## 移動表

以下はこのディレクトリからの相対パス。実行前に全19行の移動元と移動先の衝突を確認した。

適用状況: 全19行を反映済み。下記の保持領域は移動対象から外した。

| Current path | New path | Reason | Updates needed | Validation |
| --- | --- | --- | --- | --- |
| `README.md` | `PRODUCTION.md` | 制作来歴を一覧の入口から分ける | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `dance-demo.mp4` | `videos/dance-demo.mp4` | サンバのデモ動画 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `dance-short.mp4` | `videos/dance-short.mp4` | 愛包ダンスホールの音付き縦動画 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `motion-16s.mp4` | `videos/motion-16s.mp4` | MToon再読み込みの比較動画 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/manual-rig.json` | `verification/avatar/manual-rig.json` | 採用モデルとMToonの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/fbx-roundtrip.json` | `verification/avatar/fbx-roundtrip.json` | 採用モデルとMToonの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/vrm-export.json` | `verification/avatar/vrm-export.json` | 採用モデルとMToonの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/vrm-reload.json` | `verification/avatar/vrm-reload.json` | 採用モデルとMToonの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/mtoon-upgrade.json` | `verification/avatar/mtoon-upgrade.json` | 採用モデルとMToonの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/mtoon-render.json` | `verification/avatar/mtoon-render.json` | 採用モデルとMToonの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/video.json` | `verification/avatar/video.json` | 採用モデルとMToonの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/dance-playback.json` | `verification/aipai/playback.json` | 愛包ダンスホールの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/dance-provenance.json` | `verification/aipai/provenance.json` | 愛包ダンスホールの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/dance-short-video.json` | `verification/aipai/video.json` | 愛包ダンスホールの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/dance-vrma.json` | `verification/aipai/vrma.json` | 愛包ダンスホールの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/demo-motion.json` | `verification/samba/motion.json` | Samba Dancingの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/demo-provenance.json` | `verification/samba/provenance.json` | Samba Dancingの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/demo-video.json` | `verification/samba/video.json` | Samba Dancingの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |
| `verification/demo-vrma.json` | `verification/samba/vrma.json` | Samba Dancingの検証 | README・PRODUCTION・manifest・正本JSONの参照 | SHA-256・参照・secretlint |

## 保持する領域

| 領域 | 判断と理由 |
| --- | --- |
| `avatar.blend` / `avatar.vrm` / `project.charakit` / `review.fbx` | 編集とアプリの固定入口。ファイル内容・LFSパスを保持 |
| `images/concept/avatar-v1/charakuru/` | 採用画像の既存規約とmanifestに沿い、画像の名前・内容を保持 |
| `output/charakuru/nanatau-avatar-v1/kit/` | 稼働中サーバーとプロジェクトが使うパスを保持 |
| `output/charakuru/nanatau-avatar-v1/{mtoon,dance,dance-demo,comparison,comparison-motion,api}/` | 再現用スクリプトの参照と素材原本を保持。ローカル目次で案内 |
| `output/tripo/` | 別セッションの作業領域。今回の対象から外す |

## 検証

- `python3 output/charakuru/nanatau-avatar-v1/organization/verify_layout.py`: 移動表全行・モデル/動画/画像の元SHA-256・現manifest全行・相対Markdownリンク・現在のJSON参照・旧パスの残存・素材原本のGit非混入を確認する。
- `bunx secretlint 'models/**/*.md' 'models/**/*.json' 'images/concept/avatar-v1/charakuru/README.md' 'AGENTS.md' 'README.md' --maskSecrets`
- `git diff --check`

実行コード・ルート・alias・CI・依存は変更しないため、site/blogビルド、動画再描画、外部公開を伴う検査は対象外。移動前の制作証跡はGitの `2ed5425` に保持し、JSONでは現成果物を指すパスだけ更新する。元動画のエンコード時ファイル名やGit管理外の作業パスは来歴として残す。
