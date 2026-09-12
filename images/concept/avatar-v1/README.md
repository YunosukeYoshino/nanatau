# 配信用3Dアバターの採用デザイン

2026-09-12時点でユーザーが採用したキャラクターデザインの正本。

- `approved-design.png`: 全身と顔アップ。顔・髪・衣装の外観基準。
- `approved-turnaround.png`: 正面・側面・背面と小物の資料。画像に記載された背面は暫定案として扱う。

添付された採用画像を `output/` 経由でそのままコピーしており、再描画・加工は行っていない。
Tripo向けのAポーズ資料・パーツ資料・未採用の3D試作は `output/tripo/` に保存する。
Showcaseの画像はこの正本への切り替え対象に含めない。

## 制作中の3D候補

目元と挨拶動作を調整したv3は `output/tripo/nanatau-avatar-v1/` に保存する。モデルは未採用の制作候補のため、Git管理外の作業領域で保持する。

- `nanatau-avatar-v3-candidate.vrm`: 表情・揺れ物を含むVRM 1.0。
- `nanatau-avatar-v3-editable.blend`: 編集用Blenderファイル。3秒の挨拶アクションを含む。
- `face-polish-v3/greeting.mp4`: 再読み込みしたVRMによる挨拶・表情・揺れ物の確認動画。
- `face-polish-v3/README.md`: 目元の変更内容、検証結果と制約。

挨拶アニメーション自体はBlenderファイルに保存し、VRMには含めない。後ろ髪を調整したv2と `hair-polish-v2/README.md` も保持する。

配信アプリでの実トラッキングと負荷測定は未完了。
