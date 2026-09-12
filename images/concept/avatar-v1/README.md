# 配信用3Dアバターの採用デザイン

2026-09-12時点でユーザーが採用したキャラクターデザインの正本。

- `approved-design.png`: 全身と顔アップ。顔・髪・衣装の外観基準。
- `approved-turnaround.png`: 正面・側面・背面と小物の資料。画像に記載された背面は暫定案として扱う。

添付された採用画像を `output/` 経由でそのままコピーしており、再描画・加工は行っていない。
Tripo向けのAポーズ資料・パーツ資料・未採用の3D試作は `output/tripo/` に保存する。
Showcaseの画像はこの正本への切り替え対象に含めない。

## 口・首・輪郭・髪の修正 v7（採用確認用）

口周囲の穴と重複面、首の浮いた破片と前面の重なりを修復。BlenderのGUIで口幅・顎・襟・横髪・リボン・花の奥行きを調整し、顔のUVを描画用に整理して肌の境目をペイントした。

- `output/tripo/nanatau-avatar-v1/nanatau-avatar-v7-cua-editable.blend` / `nanatau-avatar-v7-candidate.vrm`: 編集用モデルと静的VRM。
- `output/tripo/nanatau-avatar-v1/face-neck-v7/`: 4方向画像、10種類の表情、4秒の首振り動画、回帰検査と再読み込み検証、変更内容・制約を記したREADME。

口・首・埋め込み画像の検査とVRM再読み込み検証は合格。最終採用は未確認。既存の生成メッシュを生かした修正で、髪や衣装の細部には粗さが残る。配信アプリの負荷測定は今回の範囲に含めていない。

## Computer Useによる髪の局所調整 v6（制作途中）

BlenderのGUIで、v5の左側と頭頂の飛び出した毛束を寄せ、前髪の幅を4%広げた。顔の輪郭・表情・UV・ウェイトは保持している。作業領域は `output/tripo/nanatau-avatar-v1/`。

- `nanatau-avatar-v6-cua-editable.blend` / `nanatau-avatar-v6-candidate.vrm`: 編集用モデルと静的VRM。
- `cua-polish-v6/`: v5・v6の4方向比較画像、首振り動画、変更範囲とVRM再読み込み検査、制約を記したREADME。

局所調整の途中候補であり、顔・横髪・髪飾りの仕上げと最終採用は未完了。既存のv2編集状態は保存コピーで保護し、採用画像の正本は変更していない。

## 顔・髪の投影テクスチャ v5（確認中の候補）

実モデルの正面レンダーを基準に、元絵に寄せた髪の流れ・控えめなハイライトと顔の塗りを投影ベイクした。目・まぶたは表情用の既存テクスチャを保持。頭のUV重複と画像の埋め込み不整合も修正した。作業領域は `output/tripo/nanatau-avatar-v1/`。

- `nanatau-avatar-v5-candidate.vrm` / `nanatau-avatar-v5-editable.blend`: 静的VRMと編集用モデル。
- `portrait-polish-v5/portrait.mp4`: 4秒の首振り・瞬き・口パクの描画。
- `portrait-polish-v5/README.md`: 変更内容、回帰検査、VRM再読み込み検証と残る課題。

検査は合格したが、ユーザーの満足・採用は未確認。横髪・髪飾りには生成メッシュの粗さが残り、配信アプリの性能も未検証。候補はGit管理外で保持し、採用画像は変更していない。

## 前髪 v4・ダンス v3

前髪の額の隙間と大きな尖った毛束を、頭に沿う下地と11本の薄い毛束で修正した。頭・首のダンスも調整し、最大前傾を約85度から36度へ抑えた。作業領域は `output/tripo/nanatau-avatar-v1/`。

- `nanatau-avatar-v4-candidate.vrm`: 前髪、表情、揺れ物を含む静的VRM 1.0。
- `nanatau-avatar-v4-editable.blend`: 中立姿勢の編集用モデル。
- `nanatau-dance-v3-editable.blend`: 頭・首の調整と前髪修正を反映した16秒・30fpsのダンス。
- `motion-polish-v3/dance.mp4` / `motion-polish-v3/comparison.mp4`: 新版と、同じ区間を左に旧v2・右に新v3で並べた比較動画。
- `fringe-polish-v4/README.md` / `motion-polish-v3/README.md`: 変更、素材出典、検証結果と制約。

VRMの再読み込み、表情と揺れ物、全頂点のウェイト、ダンス480フレームの姿勢・接地、33時点の変形と画角を検査した。新版と比較MP4は全フレームの正常デコードを確認済み。前髪の揺れ物22本を追加し、全体は95ジョイント・117,299三角形となった。配信アプリでの性能測定は未完了。静的VRMにはダンスを含めない。

制作候補はGit管理外の作業領域に保持し、採用画像の正本は変更していない。

## 旧3D候補 v3

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

## AI制作ノウハウの調査（2026-09-12）

指定されたX 3件とnote 1件から、生成後のUV・法線補修、実モデルのレンダーを基準にした投影ベイク、陰影テクスチャのマスク利用、Text-To-VRMA / ARDYの公開実装を調査した。

- `output/tripo/nanatau-avatar-v1/workflow-research/workflow-notes.md`: 4件の要点、公式資料との照合、現在のモデルとの差と適用順序。
- `output/tripo/nanatau-avatar-v1/workflow-research/x-findings.md`: Xスレッドの続き、OSS実装、Macの実行経路、ライセンスの確認範囲。
- `output/tripo/nanatau-avatar-v1/workflow-research/dstudio-notes.md`: Nano/Dstudioの追加2投稿と動画の実再生・コマ送り確認。Smart Meshの設定、Computer useの位置付け、表情別メッシュ切替とVRM互換性。

公開資料とソースの閲覧のみ。モデルへの実装、依存ソフトのインストール、動作生成の速度・品質測定は行っていない。
