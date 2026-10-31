# ディレクトリの整理方針

採用素材、参照資料、制作履歴、作業中のデータを分けて保存します。

| 保存先 | 役割 |
| --- | --- |
| [images/](../images/README.md) | 採用画像と配信用2D素材。`reference/` に制作の入力資料をまとめる |
| [models/](../models/README.md) | 採用・確認用3Dモデル、動画、検証記録 |
| [docs/](README.md) | 制作方針、採用判断、過去の試作履歴、デザイン原稿 |
| `output/` | 生成途中の素材と再現用スクリプト。Git管理外 |
| [site/](../site/README.md) | キャラクター紹介サイトのソース |
| [blog/](../blog/CLAUDE.md) | ブログのソースと配信に使う画像 |

Charakuru固有の配置・manifest更新は[モデルの整理記録](../models/avatar-v1/charakuru/ORGANIZATION.md)に従います。MotionPNGTuberの正本は `images/png-tuber/motion/<set-name>/` にまとめ、ブラウザー用セットに同梱する画像も保持します。

## 2026-10-31の移動一覧

素材とデザイン原稿の内容は変えずに配置を整理しました。採用デザインのREADMEは現在の画像への案内に絞り、試作履歴の本文を `docs/history/` に移しました。履歴中の採用判断・数値・未完了項目は当時の記録を保持しています。

| 移動前 | 移動先 | 理由 |
| --- | --- | --- |
| `images/concept/key_visual.png` | [images/concept/initial/key_visual.png](../images/concept/initial/key_visual.png) | 初期のキービジュアルと三面図を同じ場所にまとめる |
| `images/concept/reference_sheet.png` | [images/concept/initial/reference_sheet.png](../images/concept/initial/reference_sheet.png) | 初期のキービジュアルと三面図を同じ場所にまとめる |
| `images/reference/assets/sheet.png` | [images/reference/templates/three-panel.png](../images/reference/templates/three-panel.png) | 番号付き3枠のテンプレートを用途で命名する |
| `images/reference/nanatau-chan-chibi-pet-reference-sheet.png` | [images/reference/pets/nanatau-chan/reference-sheet.png](../images/reference/pets/nanatau-chan/reference-sheet.png) | ペット用資料を対象別にまとめる |
| `images/png-tuber/loop.mp4` | [images/png-tuber/archive/loop.mp4](../images/png-tuber/archive/loop.mp4) | セット外の旧動画とMotionPNGTuberの採用セットを区別する |
| `blog/design/pencil-new.pen` | [docs/design/blog/theme.pen](../docs/design/blog/theme.pen) | デザイン原稿をブログの配信ソースから分ける |
| `blog/design/images/generated-1772694468981.png` | [docs/design/blog/images/generated-1772694468981.png](../docs/design/blog/images/generated-1772694468981.png) | デザイン原稿と同梱画像を一緒に移す |
| `blog/design/images/generated-1772694786081.png` | [docs/design/blog/images/generated-1772694786081.png](../docs/design/blog/images/generated-1772694786081.png) | デザイン原稿と同梱画像を一緒に移す |
| `blog/design/images/generated-1772731013572.png` | [docs/design/blog/images/generated-1772731013572.png](../docs/design/blog/images/generated-1772731013572.png) | デザイン原稿と同梱画像を一緒に移す |
| `blog/design/images/generated-1772731022111.png` | [docs/design/blog/images/generated-1772731022111.png](../docs/design/blog/images/generated-1772731022111.png) | デザイン原稿と同梱画像を一緒に移す |
| `images/concept/avatar-v1/README.md` | [docs/history/avatar-v1-tripo.md](../docs/history/avatar-v1-tripo.md) | 採用画像の入口と481行の試作履歴を分ける |
