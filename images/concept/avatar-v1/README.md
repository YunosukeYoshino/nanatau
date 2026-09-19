# 配信用3Dアバターの採用デザイン

2026-09-12時点でユーザーが採用したキャラクターデザインの正本。

- `approved-design.png`: 全身と顔アップ。顔・髪・衣装の外観基準。
- `approved-turnaround.png`: 正面・側面・背面と小物の資料。画像に記載された背面は暫定案として扱う。

添付された採用画像を `output/` 経由でそのままコピーしており、再描画・加工は行っていない。
Tripo向けのAポーズ資料・パーツ資料・未採用の3D試作は `output/tripo/` に保存する。
Showcaseの画像はこの正本への切り替え対象に含めない。

## 公式振付「愛包ダンスホール」 v4（音付きダンス候補）

HIMEHINA公式配布の田中ヒメ用モーションを、最新v12のリグへ転送。従来のRokoko汎用ダンスから、指先まで収録された振付へ差し替えた。楽曲44–60秒の16秒間、30fps・480フレーム、540×648の音付きプレビュー。

- `output/tripo/nanatau-avatar-v1/dance-v4-aipai/aipai-dance-preview.mp4`: 公式インスト音源付きの確認動画。
- `output/tripo/nanatau-avatar-v1/dance-v4-aipai/aipai-motion-preview.blend`: 身体・指・表情・揺れ物を含む編集用ファイル。
- 同ディレクトリの `README.md` / `provenance.json` / `artifact-manifest.json`: 素材の出典、転送・補正、検証範囲と成果物SHA-256。

固定軸で回転を転送して肘・指の反転を修正。靴底へ接地を合わせ、Bodyの271頂点のウェイト不連続を局所補修。手と前腕の衝突形状を追加し、95本の揺れ骨を焼き込んだ。静的v12のBlend・VRMとメッシュ形状・UVは保持し、ウェイト補修はダンス内のみ。

全480フレームの床抜け・急な回転、追加ブーツの床抜け、33時点のメッシュ変形・画角、動画の全フレームデコードを検査済み。**手と髪の交差は49/480フレームに残る**。すべての見た目の検査に合格した状態や「粗さゼロ」、Goal全体の完了とは扱わない。配信アプリでの読み込み・FPS・本人のトラッキングは未検証。

音楽・モーション: HIMEHINA / Studio LaRa。[公式素材倉庫](https://himehina.jp/gallery?slug=material)、[配布フォルダ](https://larainc.link/Aipai)、[二次創作ガイドライン](https://himehina.jp/guideline)。元データの再配布・販売はしない。キズナアイの [KAMACHO公式モーション](https://kizunaai.com/download/kamatteaimodel/) も存在するが、Unity `.anim` 形式のため今回は使用していない。

外部からは公式素材を取得しただけで、モデル・動画の外部送信、公開、push、Tripoの呼び出しは行っていない。

## 側面の髪・衣装と靴の仕上げ v12（検証済みの途中候補）

左右の髪と衣装を実モデルのレンダーから描き直し、帯状の継ぎ目や黒いにじみを局所投影で補修。靴の甲・二段フリル・結び目・垂れ・花・紐・紐穴を閉じた形状で作り直した。v10–v11の参考顔、頭・胸・袖・腰のリボンの調整を引き継いでいる。

- `output/tripo/nanatau-avatar-v1/nanatau-avatar-v12-cua-editable.blend` / `nanatau-avatar-v12-candidate.vrm`: 最新の編集用モデルとVRM。
- `output/tripo/nanatau-avatar-v1/finish-v12/review-before-after.jpg`: 側面の髪・衣装・靴を実モデルのレンダーで比較。
- `output/tripo/nanatau-avatar-v1/finish-v12/motion/v12-dance-preview.mp4`: 最終モデルの16秒・30fps・480フレームの確認動画。
- `output/tripo/nanatau-avatar-v1/finish-v12/README.md` / `artifact-manifest.json`: 生成素材と正確なプロンプト、検証範囲、最終ファイルのSHA-256。

36メッシュ・385,021三角形・32埋め込み画像、VRMは約97.8 MB。23個の布・飾りメッシュが閉じた形状。顔の11形状キー、Head/Bodyの既存ウェイトと骨の基準位置を保持。元の靴底は55 mm未満の頂点を動かさず、接地を保持した。側頭部109点・頭頂12点、VRM再読込、表情と動作480フレームを検査。手と髪の交差・新しい靴の床抜けは0フレーム。

Tripoは使用せず、組み込み画像生成を5回使用（左右の髪・衣装とベルト色の修正）。公開・push・正本画像の変更はない。極端な裏側の継ぎ目と旧靴底の輪郭は残るため、「粗さゼロ」やGoal全体の完了・ユーザー採用とは扱わない。曲面と模様の追加で容量が増えており、配信アプリの実負荷は未測定。

## 衣装・リボン・後ろ髪の仕上げ v11（検証済みの途中候補）

v10の参考顔と11表情を保ち、胸元・肩・袖口・裾・後ろ髪の描き込みを補修。袖・ベルト・スカート脇の6個の結び目と背中の長いリボンを、厚み・折り返し・反りを持つ布へ作り直した。Bodyの8材質をMToonへ統一し、VRM再読込で衣装の影が濃くなる不整合も解消した。

- `output/tripo/nanatau-avatar-v1/nanatau-avatar-v11-cua-editable.blend` / `nanatau-avatar-v11-candidate.vrm`: 編集用モデルとVRM。
- `output/tripo/nanatau-avatar-v1/finish-v11/README.md` / `artifact-manifest.json`: 変更、生成素材・プロンプト、検証と正確なファイルハッシュ。
- `output/tripo/nanatau-avatar-v1/finish-v11/motion/v11-dance-preview.mp4`: 最新候補の16秒・30fps・480フレームの確認動画。

34メッシュ・328,541三角形。全骨のレスト位置、Head/Bodyの既存ウェイト、v9の補正済み動作207チャンネルを保持。21個の布・飾りが閉じた形状。側頭部109点・頭頂12点、表情、VRM再読込と動作480フレームを検査し、手と髪の交差0フレーム。衣装の黒い欠け4,543ピクセル→0、元モデルとVRMの画像差は平均20.35→約0.00163 / 255。

Tripoは使用せず、組み込み画像生成で実モデルのレンダーを描き直して局所投影した。公開・push・正本画像の変更はない。側面や裏側のテクスチャ境界、靴などの微細部には粗さが残り、「粗さゼロ」やGoal全体の完了・ユーザー採用とは扱わない。面数とテクスチャ容量が増えており、配信アプリの実負荷は未測定。

## 顔・布形状・接合部の仕上げ v10（検証済みの途中候補）

参考顔へ目の丸み・顎・丸口・前髪を調整。頭と胸のリボン、垂れ、花、首フリルと襟レースを厚みのある曲面へ作り直し、頭頂の段差、肩と襟下の色汚れ、ストラップの埋まりを修正した。

- `output/tripo/nanatau-avatar-v1/nanatau-avatar-v10-cua-editable.blend` / `nanatau-avatar-v10-candidate.vrm`: 編集用モデルとVRM。
- `output/tripo/nanatau-avatar-v1/finish-v10/README.md`: 変更、検証、ハッシュ、途中保存との区別。
- `output/tripo/nanatau-avatar-v1/finish-v10/motion/v10-motion-preview.blend`: 最新形状を使った検証済み480フレームのダンス。v10動画は未作成。

28メッシュ・262,953三角形。全11形状キーと既存リグを保持。VRM再読込、側頭部109点・頭頂12点、閉眼、動作480フレームは合格。手と髪の交差0フレーム。局所補修はBlender内で行い、v10ではTripoや生成APIを使用していない。

胴体の装飾、袖口と腰のリボン、髪の細かさの差は残り、v11で継続中。「粗さがなくなるまで」とGoal全体の完了は未達。面数増加と引き換えに布の曲面を優先しており、配信アプリの負荷は未検証。

## 顔・髪・首の仕上げと全身ダンス v9（確認用候補）

v8で残った左耳上の段差・色差、顎から首の灰桃色の帯を修正。虹彩を丸くし、目幅と前髪の毛先を控えめに調整した。頭頂の角折れした3片をGUIで除去し、下地で前後の髪の空隙を埋めた。襟の白灰まだらと、頭リボンの上縁の色差も局所的に修復している。

- `output/tripo/nanatau-avatar-v1/nanatau-avatar-v9-cua-editable.blend` / `nanatau-avatar-v9-candidate.vrm`: 編集用モデルと静的VRM。
- `output/tripo/nanatau-avatar-v1/finish-v9/motion/`: 最新モデルの16秒・30fps・480フレームのダンス動画、編集用Blend、動作と動画の検査結果。
- `output/tripo/nanatau-avatar-v1/finish-v9/`: 最終6方向・12表情、参考ポーズ、修正別の記録、VRM再読込と検証結果のREADME。

眼の変更でも全11形状キーの相対変形と鼻中央を維持。側頭部109点・頭頂12点を含む最終モデルとVRM再読込の9項目、全身480フレームの動作、動画の全フレームデコードはすべて合格。ダンスは腕6骨の軌道を補正し、手が髪に入る25フレームを解消した。背面スカート7頂点のウェイト不連続も修復し、静的モデルへ反映した。

リボンの板状の形、髪の部分間の細かさの差、襟・肩の角は残る。「粗さがなくなるまで」と元絵の造形品質への到達は未完了。数値検査の合格をGoal全体の完了とは扱わない。既存モデルとリグを使ったBlender内の局所補修で、新しい生成API・Tripoの呼び出し、外部送信・公開・pushは行っていない。

## 側頭部と参考顔の調整 v8（確認用候補）

2026-09-13に指定された参考顔と耳上の頭皮露出画像を基準に、側頭部の髪下地と左右3本ずつの短い髪束を追加。側面UVの縦縞、中央前髪の長さ、目尻を修正した。参考の小さな丸口を `PortraitO` 表情として追加し、発話時の口縁の沈み込みと白帯・灰色のギザを修復。GUIで下地を分離し、入力が反映されない操作はMCPで数値・構造を補助した。

- `output/tripo/nanatau-avatar-v1/nanatau-avatar-v8-cua-editable.blend` / `nanatau-avatar-v8-candidate.vrm`: 編集用候補と静的VRM。
- `output/tripo/nanatau-avatar-v1/side-face-v8/`: 6方向・12表情・参考ポーズ画像、4秒の首振り/瞬き/発話/丸口動画、変更スクリプト、検査結果とREADME。

側頭部109点、側面UV、口・首、ウェイト、表情、埋め込み画像、VRM再読込と揺れ物90フレーム、動画96フレームの検査は合格。最終VRMは14メッシュ・120,655三角形、53 Humanoidボーン、9既存表情＋丸口。

左耳上の髪の接合・色差と、顎下〜首の角張った陰影は残る。全体の仕上げ・採用は未完了。v7の保存ファイルと未保存セッションのバックアップを保持。外部送信・公開と、正本への反映は行っていない。

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
