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

## ダンス v2（モーションキャプチャ使用）

Rokokoの公開素材`DancingMedium_mixamo.fbx`から16秒の振り付けを転送し、ブーツの接地、髪・リボン・スカートの揺れ、瞬きを調整した。作業領域は `output/tripo/nanatau-avatar-v1/`。

- `nanatau-dance-v2-editable.blend`: 30fps・480フレームのダンス、表情、焼き込み済みの揺れ物を含む編集用ファイル。
- `dance-v2/dance.mp4`: 900×1080の無音ダンス動画。
- `dance-v2/README.md`: 素材出典、接地・変形検証と編集上の制約。

指先・スカートの局所ウェイト補正はダンス用Blender内に保持し、静的VRM v3には反映していない。動画はループ専用ではなく、動作を変更するときは揺れ物の再計算が必要。

## 旧ダンス v1（不採用）

v3の既存リグを使った6秒のダンスは、同じ作業領域に保存する。ユーザー評価で動きがぎこちないため不採用。接地・メッシュ変形の数値検証は通過したが、ダンスとしての品質を満たすものではない。

- `nanatau-dance-v1-editable.blend`: ダンス、表情、焼き込み済みの揺れ物を含む編集用ファイル。
- `dance-v1/dance.mp4`: 左右のステップと腕振りを合わせた無音の確認動画。
- `dance-v1/README.md`: 振り付け・検証内容と編集上の制約。

ダンスはBlenderのアクションとして保存し、v3のVRMには追加していない。

改善方針と公式モーション素材の調査は `dance-research/motion-sources.md` に記録。公開素材の取得・選定と既存リグへの転送をv2で実施した。
