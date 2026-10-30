# Charakuru成果物の配置

2026-10-31。Branch: `apply`。Mode: `knowledge-agent-ops`。Directory Architectureの `references/patterns.md` の「Knowledge / Agent Operations Repo」を参照し、このリポジトリのmodels・images・output規約に合わせた。

## 現在の配置

```text
models/avatar-v1/charakuru/
├── README.md / PRODUCTION.md / ORGANIZATION.md / manifest.json
├── releases/k6/           # 表情付きVRM・Blend・動画・検証
├── studies/true-front-b/  # 確認済みの正面顔、通常顔まで
├── dances/                # 曲ごとの動画・出典・検証
└── archive/               # 身体制作時のデータと過去の記録
```

画像は `images/concept/avatar-v1/charakuru/` の下に同じ分類で保存している。サイト用の画像は既存の `images/concept/showcase/` にある。成果物は[一覧](README.md)、過去の配置は[履歴](archive/layout-history.md)から確認できる。

## 参照関係と移動範囲

ルートのBunコマンドはsiteとsecretlintを使う。pyproject.tomlは別系統のMotionPNGTuber用で、今回のモデル整理には関わらない。siteはReact/Vite、blogはLume。`.codegraph/` は存在せず、リポジトリの指示に従って作成していない。

サイトが使う動画2本は、ViteとTypeScriptの既存alias名から新しいファイルを参照する。CIのパス指定もその2本に合わせた。Charakuruプロジェクトは移動先でも同じGit LFSの実体を使う。

README、制作記録、JSONの現行パス、manifestを更新した。JSON内の過去バージョンの記録と、archiveに保存した文書の当時の相対パスは履歴として残している。モデル・動画・画像の内容は変更していない。

## 移動表

全パスはリポジトリルート基準。文書2件は移動後に元の場所へ現行の案内を新規作成した。移動前に全行の保存先の衝突を確認し、`git mv` で反映した。

| Current path | New path | Reason | Updates needed | Validation |
| --- | --- | --- | --- | --- |
| `models/avatar-v1/charakuru/avatar.vrm` | `models/avatar-v1/charakuru/releases/k6/avatar.vrm` | 表情付きK6のモデル | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/avatar.blend` | `models/avatar-v1/charakuru/releases/k6/avatar.blend` | 表情付きK6のモデル | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/videos/face-neck-motion.mp4` | `models/avatar-v1/charakuru/releases/k6/motion.mp4` | K6の動画をモデルと一緒に保存 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/expressions/model.json` | `models/avatar-v1/charakuru/releases/k6/verification/model.json` | K6の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/expressions/motion.json` | `models/avatar-v1/charakuru/releases/k6/verification/motion.json` | K6の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/expressions/playback.json` | `models/avatar-v1/charakuru/releases/k6/verification/playback.json` | K6の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/expressions/production.json` | `models/avatar-v1/charakuru/releases/k6/verification/production.json` | K6の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/expressions/video.json` | `models/avatar-v1/charakuru/releases/k6/verification/video.json` | K6の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/project.charakit` | `models/avatar-v1/charakuru/archive/body/project.charakit` | 身体制作時の復元資料 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/review.fbx` | `models/avatar-v1/charakuru/archive/body/review.fbx` | 身体制作時の復元資料 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/videos/motion-16s.mp4` | `models/avatar-v1/charakuru/archive/body/motion.mp4` | 身体制作時のMToon確認動画 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/avatar/fbx-roundtrip.json` | `models/avatar-v1/charakuru/archive/body/verification/fbx-roundtrip.json` | 身体制作時の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/avatar/manual-rig.json` | `models/avatar-v1/charakuru/archive/body/verification/manual-rig.json` | 身体制作時の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/avatar/mtoon-render.json` | `models/avatar-v1/charakuru/archive/body/verification/mtoon-render.json` | 身体制作時の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/avatar/mtoon-upgrade.json` | `models/avatar-v1/charakuru/archive/body/verification/mtoon-upgrade.json` | 身体制作時の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/avatar/video.json` | `models/avatar-v1/charakuru/archive/body/verification/video.json` | 身体制作時の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/avatar/vrm-export.json` | `models/avatar-v1/charakuru/archive/body/verification/vrm-export.json` | 身体制作時の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/avatar/vrm-reload.json` | `models/avatar-v1/charakuru/archive/body/verification/vrm-reload.json` | 身体制作時の検証 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/videos/dance-short.mp4` | `models/avatar-v1/charakuru/dances/aipai/motion.mp4` | ダンス別の動画 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/aipai/playback.json` | `models/avatar-v1/charakuru/dances/aipai/verification/playback.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/aipai/provenance.json` | `models/avatar-v1/charakuru/dances/aipai/verification/provenance.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/aipai/video.json` | `models/avatar-v1/charakuru/dances/aipai/verification/video.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/aipai/vrma.json` | `models/avatar-v1/charakuru/dances/aipai/verification/vrma.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/videos/dance-demo.mp4` | `models/avatar-v1/charakuru/dances/samba/motion.mp4` | ダンス別の動画 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/samba/motion.json` | `models/avatar-v1/charakuru/dances/samba/verification/motion.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/samba/provenance.json` | `models/avatar-v1/charakuru/dances/samba/verification/provenance.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/samba/video.json` | `models/avatar-v1/charakuru/dances/samba/verification/video.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/samba/vrma.json` | `models/avatar-v1/charakuru/dances/samba/verification/vrma.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/videos/dance-tetris.mp4` | `models/avatar-v1/charakuru/dances/tetris/motion.mp4` | ダンス別の動画 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/tetris/motion.json` | `models/avatar-v1/charakuru/dances/tetris/verification/motion.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/tetris/playback.json` | `models/avatar-v1/charakuru/dances/tetris/verification/playback.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/tetris/provenance.json` | `models/avatar-v1/charakuru/dances/tetris/verification/provenance.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/verification/tetris/video.json` | `models/avatar-v1/charakuru/dances/tetris/verification/video.json` | ダンス別の検証・出典 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/videos/dance-tetris-expressions.mp4` | `models/avatar-v1/charakuru/dances/tetris-expressions/motion.mp4` | ダンス別の動画 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/back.png` | `images/concept/avatar-v1/charakuru/archive/body/back.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/chin-rounding-comparison.png` | `images/concept/avatar-v1/charakuru/releases/k6/chin-rounding-comparison.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/current-fullbody.png` | `images/concept/avatar-v1/charakuru/releases/k6/current-fullbody.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/current-views.jpg` | `images/concept/avatar-v1/charakuru/releases/k6/current-views.jpg` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/expressions-blink-matrix.jpg` | `images/concept/avatar-v1/charakuru/releases/k6/expressions-blink-matrix.jpg` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/expressions-combined-matrix.jpg` | `images/concept/avatar-v1/charakuru/releases/k6/expressions-combined-matrix.jpg` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/expressions-happy-matrix.jpg` | `images/concept/avatar-v1/charakuru/releases/k6/expressions-happy-matrix.jpg` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/face-blink.png` | `images/concept/avatar-v1/charakuru/releases/k6/face-blink.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/face-happy.png` | `images/concept/avatar-v1/charakuru/releases/k6/face-happy.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/face-neutral.png` | `images/concept/avatar-v1/charakuru/releases/k6/face-neutral.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/face.png` | `images/concept/avatar-v1/charakuru/archive/body/face.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/front.png` | `images/concept/avatar-v1/charakuru/archive/body/front.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/left.png` | `images/concept/avatar-v1/charakuru/archive/body/left.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/left45.png` | `images/concept/avatar-v1/charakuru/archive/body/left45.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/right.png` | `images/concept/avatar-v1/charakuru/archive/body/right.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/right45.png` | `images/concept/avatar-v1/charakuru/archive/body/right45.png` | モデルの制作段階に合わせた画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/front-0001.png` | `images/concept/avatar-v1/charakuru/dances/aipai/front-0001.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/front-0091.png` | `images/concept/avatar-v1/charakuru/dances/aipai/front-0091.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/front-0181.png` | `images/concept/avatar-v1/charakuru/dances/aipai/front-0181.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/front-0271.png` | `images/concept/avatar-v1/charakuru/dances/aipai/front-0271.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/front-0361.png` | `images/concept/avatar-v1/charakuru/dances/aipai/front-0361.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/front-0480.png` | `images/concept/avatar-v1/charakuru/dances/aipai/front-0480.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/side-0001.png` | `images/concept/avatar-v1/charakuru/dances/aipai/side-0001.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/side-0091.png` | `images/concept/avatar-v1/charakuru/dances/aipai/side-0091.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/side-0181.png` | `images/concept/avatar-v1/charakuru/dances/aipai/side-0181.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/side-0271.png` | `images/concept/avatar-v1/charakuru/dances/aipai/side-0271.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/side-0361.png` | `images/concept/avatar-v1/charakuru/dances/aipai/side-0361.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/motion-review/side-0480.png` | `images/concept/avatar-v1/charakuru/dances/aipai/side-0480.png` | 愛包の動作検査画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/true-front-b/comparison.png` | `images/concept/avatar-v1/charakuru/studies/true-front-b/comparison.png` | 正面顔スタディの画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/true-front-b/front.png` | `images/concept/avatar-v1/charakuru/studies/true-front-b/front.png` | 正面顔スタディの画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/true-front-b/motion-contact-sheet.jpg` | `images/concept/avatar-v1/charakuru/studies/true-front-b/motion-contact-sheet.jpg` | 正面顔スタディの画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `images/concept/avatar-v1/charakuru/true-front-b/reference.png` | `images/concept/avatar-v1/charakuru/studies/true-front-b/reference.png` | 正面顔スタディの画像 | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/ORGANIZATION.md` | `models/avatar-v1/charakuru/archive/layout-history.md` | 過去の記録を保存し、入口の文書を現状に合わせる | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |
| `models/avatar-v1/charakuru/PRODUCTION.md` | `models/avatar-v1/charakuru/archive/production-history.md` | 過去の記録を保存し、入口の文書を現状に合わせる | README・JSON・manifest・該当するalias/CI/LFS | ハッシュ・参照・ビルド・LFS |

## 検証と作業用データ

`python3 output/charakuru-organization-20261031/verify_layout.py` で移動表、媒体のSHA-256、manifest、相対リンク、JSONの現行パス、Git LFSを確認する。siteの型検査とビルド、出力された動画のハッシュ照合、変更テキストのsecretlint、`git diff --check`も実行する。

移動前のハッシュと詳細な検証結果は `output/charakuru-organization-20261031/` に保存する。再現用スクリプト47件の成果物参照を新しいパスへ更新した。過去のログと検証スナップショットは当時の記録として保持している。今回の作業はローカルコミットまでで、pushとデプロイは行わない。
