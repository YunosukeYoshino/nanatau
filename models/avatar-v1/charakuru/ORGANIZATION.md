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
    ├── samba/             # Samba Dancing
    ├── tetris/            # 表情追加前のテトリス
    └── expressions/       # 現在の顔表情と表情付きテトリス
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

## 2026-10-11：テトリスの追加

Branch: `apply`。Mode: `knowledge-agent-ops`。既存の`videos/`とダンス別の`verification/`に合わせ、採用動画1件・検証JSON4件を追加した。既存19行の移動記録、モデル4ファイル、画像、愛包・サンバの動画を保持し、既存ファイルの移動は行わない。サンバをデモ用の入口として保持する。site/blogの実行コード・参照・CI・依存とLFS設定も変更しない。

以下の作業用ファイルから正本へコピーした。元ZIP・VRMA・WAV、頭対応だけを補正した派生VRMA、描画用Blend・フレームは`output/charakuru/nanatau-avatar-v1/dance-tetris/`に残し、Gitへ追加しない。

| Current path | New path | Reason | Updates needed | Validation |
| --- | --- | --- | --- | --- |
| `output/charakuru/nanatau-avatar-v1/dance-tetris/dance-tetris.mp4` | `models/avatar-v1/charakuru/videos/dance-tetris.mp4` | 採用した公式伴奏付き動画 | README・PRODUCTION・manifest | 全体デコード・同期・画面確認・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/dance-tetris/motion-verification.json` | `models/avatar-v1/charakuru/verification/tetris/motion.json` | 頭対応の補正と骨・物理の検証 | README・PRODUCTION・manifest・現パス | JSON・参照・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/dance-tetris/{video-verification,final-video-verification}.json` | `models/avatar-v1/charakuru/verification/tetris/video.json` | 撮影と最終音声同期・画面確認の検証をまとめる | README・PRODUCTION・manifest・現パス | JSON・参照・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/dance-tetris/provenance.json` | `models/avatar-v1/charakuru/verification/tetris/provenance.json` | 出典・利用条件・素材ハッシュ | README・PRODUCTION・manifest・現パス | JSON・参照・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/dance-tetris/browser-playback-verification.json` | `models/avatar-v1/charakuru/verification/tetris/playback.json` | Charakuruでの実再生の検証 | README・PRODUCTION・manifest・現パス | JSON・参照・SHA-256 |

適用状況: 全5行を追加済み。正本化したJSONの成果物参照は現パスを指し、作業素材のパスは来歴として残す。manifestの全現パス・サイズ・SHA-256を更新する。正本モデル4ファイルのSHA-256は追加前と同一。

今回の検証はmanifest全行の実ファイル・SHA-256、相対Markdownリンク、JSONの現パス、正本モデルと既存動画の不変、原素材のGit非混入、`git diff --check`と対象Markdown/JSONのsecretlintを確認する。2026-10-09の移動検証スクリプトは当時の作業用Blend等の保持も前提とするため、Drive整理後の今回の検証とは分ける。

## 2026-10-11：表情モデルと表情付きテトリス

Branch: `apply`。Mode: `knowledge-agent-ops`。現在の正本VRM・Blendを同じ固定パスで更新し、通常顔・まばたき・笑顔の確認画像、表情付き動画と検証を既存の配置へ追加する。実行コード・site/blog・CI・依存・LFS設定と元の制作素材のパスは変更しない。

表情追加前のモデルはGitチェックポイント`22258cd`に保持する。`project.charakit`・`review.fbx`は当時の身体制作スナップショットの内容を保持し、新表情を含まない。既存の全動画・画像と`verification/{avatar,aipai,samba,tetris}/`も上書きしない。以前の「正本モデル4ファイル不変」は各追加時点の検証結果で、今回のVRM・Blendの更新とは区別する。

| Current path | New path | Reason | Updates needed | Validation |
| --- | --- | --- | --- | --- |
| `output/charakuru/nanatau-avatar-v1/expressions/avatar.vrm` | `models/avatar-v1/charakuru/avatar.vrm` | `blink`・`happy`を持つ現在の正本へ更新 | README・PRODUCTION・manifestの現入口と旧SHA | 正式な再読み込み・閉じ目・通常顔・身体/物理保持・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/avatar.blend` | `models/avatar-v1/charakuru/avatar.blend` | 表情を編集できる正本へ更新 | README・PRODUCTION・manifest | 保存後の再読み込み・表情bind・画像pack・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/face-neutral.png` | `images/concept/avatar-v1/charakuru/face-neutral.png` | 現モデルの通常顔 | 画像README・manifest | 視認・元通常顔との比較・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/face-blink.png` | `images/concept/avatar-v1/charakuru/face-blink.png` | まばたきの確認 | 画像README・manifest | 閉じ目の視認・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/face-happy.png` | `images/concept/avatar-v1/charakuru/face-happy.png` | 閉じ目の笑顔の確認 | 画像README・manifest | 閉じ目と小さな笑顔の視認・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/model-final-verification.json` | `models/avatar-v1/charakuru/verification/expressions/model.json` | 構築・再読み込み・顔の比較 | README・PRODUCTION・manifest・現パス | JSON・参照・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/motion-verification.json` | `models/avatar-v1/charakuru/verification/expressions/motion.json` | 身体モーション保持と表情チャンネル | README・PRODUCTION・manifest・完了検証参照 | JSON・身体バイナリ保持・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/browser-playback-verification.json` | `models/avatar-v1/charakuru/verification/expressions/playback.json` | Charakuruの実再生 | README・PRODUCTION・manifest・現パス | 4まばたき/3笑顔・MToon/物理・有限変換・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/production-verification.json` | `models/avatar-v1/charakuru/verification/expressions/production.json` | 画像生成指示と制作素材 | README・PRODUCTION・manifest・現パス | 指示要約と記録全文の区別・JSON・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/dance-tetris-expressions.mp4` | `models/avatar-v1/charakuru/videos/dance-tetris-expressions.mp4` | 表情付きの採用動画 | README・PRODUCTION・manifest | 全体デコード・同期・画面クレジット・表情視認・SHA-256 |
| `output/charakuru/nanatau-avatar-v1/expressions/{video-verification,final-video-verification}.json`と最終視認・音声検証 | `models/avatar-v1/charakuru/verification/expressions/video.json` | 撮影と最終映像・音声・表情の検証を統合 | README・PRODUCTION・manifest・現パス | JSON・全476フレーム・SHA-256 |

適用状況: 全11行のモデル2件・画像3件・動画1件・検証JSON5件を反映済み。現manifestの実パス・サイズ・SHA-256を更新した。元モーション・音源・表情付きVRMA・生成UVパッチ・アトラス・描画素材・制作スクリプトは`output/charakuru/nanatau-avatar-v1/expressions/`と従来の作業素材のパスに置き、Gitへ追加しない。

検証は現manifest全行の実サイズ・SHA-256、相対Markdownリンク、JSONの現パス、旧動画・旧画像・charakit/FBXの不変、身体・材質・物理の保持、VRM/Blendの表情bindと実表示、素材原本のGit非混入、対象Markdown/JSONのsecretlint、`git diff --check`を確認する。site/blogのコードは変更しないため、そのビルドは対象外。


## 2026-10-13：同じHeadの表情修正

Branch: `main`。Mode: `knowledge-agent-ops`。現在のVRM・Blend・表情画像3件・表情付きテトリス・検証JSON5件を同じ固定パスで更新する。新しい日付別の正本は増やさず、既存の`models/`・`images/`・`output/`の役割を保つ。独立した表情頭の生成試作は、顔が別人に見えるため不採用とし、現在の一つのHeadを修正した。笑顔は開眼で口元だけを編集し、まばたきは虹彩の断片だけを退避させて元の眼窩曲面を保つ。

以下は`output/charakuru/nanatau-avatar-v1/expression-fix/`から既存正本への更新表。元ファイルの移動・削除は行わない。2026-10-11時点の正本モデル・表情画像・表情付き動画は、作業領域の`baseline-*`とGitチェックポイント`d71bbb0`に保持する。`project.charakit`・`review.fbx`、表情なしテトリス、愛包・サンバ・MToon動作確認の動画と画像、`verification/{avatar,aipai,samba,tetris}/`は今回の上書き対象から外す。

| Current path | New path | Reason | Updates needed | Validation |
| --- | --- | --- | --- | --- |
| `expression-fix/avatar.vrm` | `models/avatar-v1/charakuru/avatar.vrm` | 同じ顔の開眼笑顔・短いまばたきへ更新 | README・PRODUCTION・manifest・検証の現SHA | 回帰検査5項目・公式再読み込み・10静止画・実再生・SHA-256 |
| `expression-fix/avatar.blend` | `models/avatar-v1/charakuru/avatar.blend` | 現表情を編集できる正本へ更新 | README・PRODUCTION・manifest | 保存後の再読み込み・表情bind・画像pack・SHA-256 |
| `expression-fix/face-neutral.png` | `images/concept/avatar-v1/charakuru/face-neutral.png` | 現モデルの通常顔 | 画像README・manifest | 通常顔の形状・テクスチャ保持・視認・SHA-256 |
| `expression-fix/face-blink.png` | `images/concept/avatar-v1/charakuru/face-blink.png` | 眼窩とまつげを保ったまばたき | 画像README・manifest | 正面・側面・斜めの視認・SHA-256 |
| `expression-fix/face-happy.png` | `images/concept/avatar-v1/charakuru/face-happy.png` | 目を開けたにっこり | 画像README・manifest | 元の瞳・同じ顔・口元の笑顔・SHA-256 |
| `expression-fix/`のモデル・回帰検査・再読み込み・静止画の記録 | `models/avatar-v1/charakuru/verification/expressions/model.json` | 現モデルに対する検証を統合 | README・PRODUCTION・manifest・現パス | JSON・参照・SHA-256 |
| `expression-fix/motion-verification.json`と描画時の身体入力検査 | `models/avatar-v1/charakuru/verification/expressions/motion.json` | 身体入力の保持と表情の時刻 | README・PRODUCTION・manifest | 476フレーム差0・4まばたき/3笑顔・JSON・SHA-256 |
| `expression-fix/`の実ブラウザ再生記録 | `models/avatar-v1/charakuru/verification/expressions/playback.json` | 読み込んだ現VRMと実表示の検証 | README・PRODUCTION・manifest・現パス | バイナリSHA・表情・MToon/物理・有限変換・JSON |
| `expression-fix/`の画像生成2件・入力出力・制作素材の記録 | `models/avatar-v1/charakuru/verification/expressions/production.json` | 今回の指示全文と素材ハッシュ | README・PRODUCTION・manifest・現パス | 指示全文/旧要約の区別・JSON・SHA-256 |
| `expression-fix/dance-tetris-expressions.mp4` | `models/avatar-v1/charakuru/videos/dance-tetris-expressions.mp4` | 現表情で踊る採用動画 | README・PRODUCTION・manifest | 全476フレーム・音声同期・表情/画角/クレジット・SHA-256 |
| `expression-fix/`の描画・最終映像・音声同期・視認の記録 | `models/avatar-v1/charakuru/verification/expressions/video.json` | 最終動画の検証を統合 | README・PRODUCTION・manifest・現パス | JSON・全体デコード・同期・SHA-256 |

この表の移動元の`expression-fix/`は`output/charakuru/nanatau-avatar-v1/`からの相対パス。検証JSONは複数の作業記録を統合し、採用成果物を指す参照だけを現正本パスへ置き換える。元素材・中間出力・スクリプトの作業パスは来歴として残す。今回の2回のimage_gen指示全文は`production.json`へ保存し、初回の指示要約を全文として扱わない。

適用状況: 全11行を反映済み。manifestの全現パス・サイズ・SHA-256と、現モデルのバージョン`1.2.0-charakuru-open-eye-smile`を更新した。新しい生成パッチ・アトラス・VRMA・WAV・描画素材・スクリプト・比較用バックアップは`output/`に保持し、Gitへ追加しない。

検証はmanifest全行の実サイズ・SHA-256、相対Markdownリンク、JSONの現パス、今回の対象外ファイルの不変、通常顔と身体・材質・物理の保持、VRM/Blendの表情bindと実表示、全体動画・音声同期、原素材のGit非混入、対象Markdown/JSONのsecretlintと`git diff --check`を確認する。site/blogのコード・参照・CI・依存・LFS設定は変更しないため、そのビルドは対象外。追加Tripo消費0、購入なし。変更はローカルの採用チェックポイントへ保存し、外部公開は行っていない。
