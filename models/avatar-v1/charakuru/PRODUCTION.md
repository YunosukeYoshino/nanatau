# ななたう：Charakuru制作記録

2026-10-08、ユーザーの「Charakuruが勝ちですね！これを正本にしていきましょう」により採用。以後の3D制作はこのモデルを基準にする。成果物の入口は[一覧](README.md)を参照する。制作方式は **Charakuru標準工程＋手動骨修正**。

同日、[Charakuru v1.0.3](https://github.com/nanocle/Charakuru/releases/tag/v1.0.3)のMToon工程へ更新。全3材質をVRM 1.0 MToonとしてBlend・VRMへ保存した。形状・UV・ウェイト・骨・4Kテクスチャ・揺れ設定・作者と利用条件を保持する。

2026-10-09、完成VRMをCharakuruで踊らせ、髪・スカート・リボンの物理を確認した。公式「愛包ダンスホール」の身体モーションとインスト音源を使った、音付き16秒の縦動画を採用する。

同日、ユーザーの「よくデモで使われるダンスをつかって」に合わせ、Three.js公式デモと同じMixamo「Samba Dancing」を追加。デモ用の動作確認はこの18.2秒サンバを使う。

2026-10-11、[ユーザー指定のテトリス動画](https://x.com/sekai_no_bonjin/status/2108843728945483950)に合わせ、八ツ橋まろんの無料モーションを使う音付き動画を追加。既存の正本モデルを使い、サンバと愛包ダンスホールの動画も保持する。

同日、まばたき`blink`と閉じ目の笑顔`happy`を正本VRM・Blendへ追加。モデルの再読み込み・通常顔の比較・閉じ目・Charakuruの実再生を確認し、表情付きのテトリス動画を採用した。

| ファイル | 用途 |
| --- | --- |
| [avatar.blend](avatar.blend) | 編集用の正本。`Nanatau_Charakuru_Production`シーン、`Nanatau_Charakuru_Rig`を編集する |
| [avatar.vrm](avatar.vrm) | MToon・`blink`・`happy`を保存したVRM 1.0。バージョン`1.1.0-charakuru-expressions` |
| [project.charakit](project.charakit) | 表情追加前の身体制作スナップショット。元絵、8方向素材、候補、配置、骨対応、制作履歴を保持 |
| [review.fbx](review.fbx) | 表情追加前の髪を含むスキニング確認用。現在の表情・VRM物理・利用条件は保存しない |
| [dance-tetris-expressions.mp4](videos/dance-tetris-expressions.mp4) | 表情付きテトリス。1080×1350、30fps、約15.87秒、公式伴奏付き、まばたき4回・笑顔3区間 |
| [dance-demo.mp4](videos/dance-demo.mp4) | デモ用サンバ。1080×1080、30fps、18.2秒、音声なし。全身と揺れ物を確認する |
| [dance-short.mp4](videos/dance-short.mp4) | 採用ダンス動画。720×1280、30fps、16秒、音付き。全身と揺れ物を確認できる |
| [dance-tetris.mp4](videos/dance-tetris.mp4) | 表情追加前のテトリス。1080×1350、30fps、約15.87秒、公式伴奏付き。正面全身と揺れ物を確認する |
| [motion-16s.mp4](videos/motion-16s.mp4) | 再読み込みしたMToon版VRMへ同じ16秒身体入力を与えた動作確認動画 |
| [manifest.json](manifest.json) | 採用判断、来歴、仕様、利用条件、各成果物のSHA-256 |
| [verification/](verification/) | 正式VRMの出力・再読み込み、FBX、動画の検証記録 |

現在の通常顔・まばたき・笑顔と、表情追加前の6方向・顔アップ・動作画像を[画像正本](../../../images/concept/avatar-v1/charakuru/)に保存する。いずれも対応するVRMを再読み込みしてレンダリングしたもの。MToon更新前の比較画像はGitの採用コミット`173e549`に残る。元の[キャラクター資料](../../../images/concept/avatar-v1/README.md)も参照する。

## 編集と保存

`avatar.blend`が形状・ウェイト・材質・VRM物理・表情設定の正本。現在のBlendとVRMは6メッシュ、96,751三角面、127骨、51 Humanoid対応、17揺れチェーン・75ジョイント・9コライダー、3種類の有効な4096×4096画像を持つ。身体と髪は元の4K画像を使い、顔だけは通常・まばたき・笑顔を2×2に配置した4Kアトラスを使う。顔の各状態の実効解像度は2048×2048。表情追加前の編集用Blendは未使用の非変形目骨2本を含む129骨だった。

現在の表情を編集・復元するにはBlendとVRMを使う。`.charakit`とFBXは身体制作時のスナップショットを保持し、新しい顔表情を含まない。`.charakit`だけではBlend内の揺れ設定も復元できない。作業を`output/`で行い、採用した更新をこの固定パスへ反映する。このディレクトリは採用チェックポイントであり、日付別の正本を増やさない。

MToonはv1.0.3の共通設定（陰色係数0.64、影境界0、トゥーン係数0.9、間接光均等化1、輪郭線なし）を使う。手元のVRM Add-on 4.7.1に合わせ、配布スクリプトの`gi_intensity_factor`を`gi_equalization_factor`へ修正した。元VRMの色係数`[1,1,1,1]`も保持し、未使用のPrincipled入力値による暗色化を防ぐ。配布ZIP・修正スクリプトのハッシュと修正前後の検査結果は`verification/avatar/mtoon-upgrade.json`に記録する。

`project.charakit`は100MiBを超えるためGit LFSで管理する。チェックアウト後に実体が未取得なら`git lfs pull`を実行する。公開やpushは別途ユーザーの指示に従う。

表情追加前のモデルはGitチェックポイント`22258cd`に保持する。VRMのSHA-256は`c53a027ec2cc357b11122415659a532a2b2eec7b8b3955bd7c5671cd49fcbaf9`、Blendは`08e35801dd59537a9c3ad1b3143412071e5bf8f27072cf5972fd8da0c723fc70`。以下の愛包・サンバ・表情なしテトリスの動画と`verification/{avatar,aipai,samba,tetris}/`は、その身体制作時のモデルに対する証跡として保持する。現モデルの検証は`verification/expressions/`を参照する。

## ダンス再生と動画

Charakuru v1.0.3の「完成VRM」プレビューへ`avatar.vrm`と作業用`output/charakuru/nanatau-avatar-v1/dance/dance.vrma`を読み込むと「愛包ダンスホール」を再生できる。「再生」で身体と揺れ物を確認する。完成VRMとVRMAの選択は`.charakit`へ保存されないため、ページを再読み込みした場合は再選択する。

VRMAは公式VRM Add-on 4.7.1で書き出し、空のシーンへ読み込んだ正本VRMで再検査した。51 Humanoid骨の回転とhipsの位置だけを渡し、揺れ物は再生環境で計算する。480フレームの身体関節位置の差は最大0.061mm、6時点の身体変形頂点の差は最大0.023mm。記録は`verification/aipai/vrma.json`に保存する。

縦動画は実VRMの再読み込みと60Hzの揺れ計算を使った480フレームを撮影したもの。カメラは固定で、全フレームに最低6%の画面余白を確保する。H.264 / AACで書き出し、映像・音声の全体デコードを検証した。`verification/aipai/video.json`に撮影・音源・書き出しの記録を保存する。16秒を1回再生する動画で、切り出しの始終点は連続ループにならない。Charakuruの標準プレビューは繰り返し再生するため、ブラウザ検査時のみ実行中の再生設定を1回再生へ切り替えた。この設定はページの再読み込みで戻る。

モーション・音源は **HIMEHINA / Studio LaRa「愛包ダンスホール」**の[公式素材倉庫](https://himehina.jp/gallery?slug=material)から提供された素材。曲の44〜60秒を使用し、[二次創作ガイドライン](https://himehina.jp/guideline)を2026-10-09に確認した。元FBX、元WAV、変換VRMA、モーションを含む作業Blendは`output/`の作業素材とし、Gitには撮影済み動画と検証情報を保存する。出典・ハッシュは`verification/aipai/provenance.json`に記録する。

目標として確認した[なのさんのダンス作例](https://x.com/Dstudio_ai/status/2101549849556721968)は[「With U_Challenge Ver.」](https://www.xstage.co/jp/motions/products/31932)の21秒モーションを使用している。その素材は購入が必要だったため、追加購入なしの方針に合わせ、手元の「愛包ダンスホール」で踊るところまで仕上げた。同じ振付や表情機能すべてを再現したという判定ではない。

## デモ用サンバ

**モーション: Adobe Mixamo「Samba Dancing」**。[Three.js公式FBXLoaderデモ](https://threejs.org/examples/webgl_loader_fbx.html)の初期ダンスと同じ[公開FBX](https://github.com/mrdoob/three.js/blob/dev/examples/models/fbx/Samba%20Dancing.fbx)を使う。動作の参照を明確にするために選んだもので、デモ全体での利用頻度を調査したという意味ではない。

身体モーションをななたうのHumanoid骨へ合わせ、MToonと既存の髪・衣装の揺れ設定を保って撮影する。18.2秒の全体を30fpsで再生する、音声なしの動作確認動画。横へ広げた腕まで見える1080×1080の正方形で、全フレームに最低6%の画面余白を確保する。元のMixamoキャラクターは動画へ含めない。サンバ用の作業VRMAは`output/charakuru/nanatau-avatar-v1/dance-demo/dance.vrma`に保存する。Charakuruで見る場合は、完成VRMへこのVRMAを選択する。

身体モーションは公式VRM Add-on 4.7.1のVRMA Exporterで書き出し、空のシーンへ読み込んだ正本VRMで再検査した。546フレームの関節位置の差は最大0.021mm、7時点の身体変形頂点の差は最大0.027mm。揺れ物は60Hz、各フレーム2回の合計1092ステップで計算する。隔離したBlenderプロセス内では自動フレーム処理との二重計算を抑止し、終了前に元の処理へ戻す。正本モデルとライブのBlenderには変更を加えない。

[Adobe公式FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)のMixamo素材による動画制作の条件を2026-10-09に確認した。追加購入なし。元FBX・変換モーション・モーションを含む作業Blendは`output/`へ保持し、撮影した動画と検証情報を正本化する。Three.js本体のMITライセンスをモーションの利用条件として扱わない。

検証記録は`verification/samba/motion.json`（骨対応と物理）、`verification/samba/vrma.json`（再読み込み）、`verification/samba/video.json`（撮影と全体デコード）、`verification/samba/provenance.json`（出典）に保存する。サンバのブラウザ再生は今回の検査範囲に含めず、VRMAの正式な再読み込みと撮影済み動画を確認した。既存の「愛包ダンスホール」のブラウザ検査とは分けて記録する。

## テトリス

モーションは **八ツ橋まろん「テトリス」**の[BOOTH無料配布](https://booth.pm/ja/items/6438933)を使う。配布VRMAの全体約15.87秒を元の速度で再生する。元VRMAの`head`対応が末端の`ENDSITE`を指し、頭の回転キーが取り込まれなかったため、作業用の派生VRMAで対応先を実際の`Head`へ補正した。アニメーションのバイナリ・accessor・sampler・channelと他の文書フィールドは保持し、補正後は51 Humanoid骨すべてのキーを確認した。配布原本と正本モデルは変更しない。

採用動画は1080×1350、30fps、476フレーム、約15.87秒のH.264 / AAC。正本VRMを空のシーンへ読み込み、髪・衣装の揺れを60Hz・952ステップで計算して撮影した。カメラは固定の正面全身で、全フレームに最低6%の画面余白を確保する。全3材質のMToon、形状・テクスチャ・揺れ設定を保持する。通常表情・固定視線のままで、口パクや表情キーは追加しない。

音源は **柊マグネタイト「テトリス」**の[公式インスト音源](https://drive.google.com/file/d/1cYvzt5hsClsHpkxmza8fNoOJWSjjJGUx/view)を使い、歌声は含まない。曲の36.0841875〜51.9508542秒を使用する。作者のデモと音源の波形相関、同じ時刻の身体姿勢を照合し、開始位置を確認した。最終AACと元WAVの相関は0.996465、開始時刻の差は0秒。参考デモの音声は採用動画に含めない。

[作者の利用ガイドライン](https://hiiragimagnetite.wixsite.com/my-site)とモーションZIP同梱規約・[作者指定の現行規約](https://drive.google.com/file/d/16KGd2t12l2CB6K2WoWfuoLoIcIBzt-x5/view)を2026-10-11に確認した。曲名・音源作者・モーション作者を画面に表記し、[曲の本家](https://youtu.be/Soy4jGPHr3g)をここから案内する。モーションは動画制作・改変に使用できるが、無断再配布・再販売はできない。元ZIP・VRMA・WAVと派生VRMAは`output/charakuru/nanatau-avatar-v1/dance-tetris/`に保持し、Gitには撮影動画と検証情報だけを保存する。追加購入・Tripo消費・外部公開は行っていない。

Charakuru v1.0.3で正本VRMと`output/charakuru/nanatau-avatar-v1/dance-tetris/head-map-corrected.vrma`を読み込み、約15.87秒の1回再生を確認した。全3材質のMToon・58本のSpringBone区間・頭の回転を含む身体と揺れ物を再生し、455回の描画更新で変換値が有限であることを検査した。1回再生への変更は検査中の設定のみで、アプリのソースは変更しない。

検証記録は`verification/tetris/motion.json`（頭の対応補正と51骨・物理）、`verification/tetris/video.json`（撮影・映像音声の全体デコード・同期・画面クレジット）、`verification/tetris/provenance.json`（出典・利用条件・素材ハッシュ）、`verification/tetris/playback.json`（Charakuruでの実再生）に保存する。

## 現在の表情とテトリス

VRM 1.0の標準表情`blink`・`happy`を追加した。Head材質のUV切り替えと`ClosedEyes`モーフを組み合わせ、まばたきと閉じ目の笑顔を表示する。どちらも二値の表情で、開いた目から閉じた目への連続補間は持たない。`happy.overrideBlink`は`block`とし、笑顔中にまばたきが重なっても笑顔を保持する。小さな閉じ口の笑顔で、口パクは含まない。

顔のUVパッチはimage_genでまばたき・笑顔を編集し、別に白目のUV領域へ肌色を補填した。目・口の編集箇所だけを元テクスチャへマスク合成し、切り出し・リサイズ・アトラス配置を機械的に行った。制作指示は`verification/expressions/production.json`へ保存する。まばたき・笑顔の記録は`promptSummary`に相当する要約で、実ツールへ渡した指示の全文を再取得したものではない。最終の白目領域の肌色補填は記録した指示全文を保持する。

`ClosedEyes`はHeadの137頂点だけを動かす。58頂点の虹彩と41頂点の分離した目の断片を頭の内側へ隠し、38頂点の白目面をまぶたとして表示する。Headのprimitiveや三角面を増やさず、通常顔の基本座標・トポロジー・ウェイト・骨・身体と髪の材質・揺れ設定を保持する。顔のUV配置と表情用アトラス、モーフと表情bindを追加した。

正式な読み込み・書き出しと保存Blendの再読み込みで、両表情のbindと実際の目・口の切り替えを確認した。通常顔と元モデルの正面比較画像のRMSEは0.3998/255。閉じ目の画像では、検査した目領域の金色の虹彩画素が0となり、目が閉じることを視認した。笑顔にまばたきを重ねても笑顔の表示が同じになることを確認した。顔の各状態が元の4Kから2K相当になる点は制作上のトレードオフとして残る。

公式の再書き出しでは、Headに等価なUV境界の頂点が5個追加される。基本座標・UV・モーフ差分を双方向で照合し、最大の対応誤差は`2.38×10^-7`。追加された境界頂点を含め、形状と表情の値を保持することを確認した。

Charakuru v1.0.3で、採用VRMの実際に読み込まれたバイナリとSHA-256を照合し、身体モーションと表情を全約15.87秒再生した。まばたき4回・笑顔3区間、全3材質のMToon・58本のSpringBone区間を確認し、変換値のNaN・無限値は0。口パク、LookAt、本人トラッキング、配信アプリとの連携は今回の検査に含めない。

表情付きの身体モーションは元のテトリスVRMAへ`blink`・`happy`の2チャンネルだけを追加する。元の身体バイナリ・accessor・view・sampler・channel・骨対応を保持し、撮影の身体と揺れ物は前回の検証済み入力を再利用する。まばたきは1.8・4.2・8.8・11.8秒から各0.16秒の区間に設定し、30fpsの動画では各4フレーム（約0.13秒）・計16フレームで閉じ目を表示する。笑顔は2.35〜2.95秒、6.0〜6.6秒、13.0秒〜終端に設定し、計121フレームで表示する。作業用VRMAは`output/charakuru/nanatau-avatar-v1/expressions/dance-tetris-expressions.vrma`。

表情付き動画は1080×1350、30fps、476フレーム、約15.87秒のH.264 / AACで保存した。固定正面の全身カメラと最低6%の余白を使い、前回と同じ公式伴奏の36.0841875〜51.9508542秒を合わせる。映像・音声の全体デコード、7時点の描画画像と4時点の最終エンコード画像の表情・画角・クレジットを確認した。最終AACと公式WAV区間の相関は0.993313、時刻差は0サンプル。モーション・音源の出典と利用条件、画面クレジットは前節を引き継ぐ。元モーション・音源・生成UVパッチ・アトラス・描画素材・スクリプトは`output/`の作業領域に置く。

検証記録は`verification/expressions/model.json`（構築・正式な再読み込み・通常顔と閉じ目）、`motion.json`（身体の保持と表情チャンネル）、`playback.json`（実際のCharakuru再生）、`production.json`（生成指示と制作素材）、`video.json`（撮影・最終エンコード・音声同期・視認）へ保存する。追加Tripo消費・素材購入・外部公開は行っていない。

## 確認範囲と残課題

表情追加前のMToon更新では、Blender 5.2.1 / VRM Add-on 4.7.1で正式VRMを空のシーンへ再読み込みし、形状・UV・ウェイト・元の4K画像・全3材質のMToon設定を検査した。同じ身体入力を480フレーム・30fps・16秒で与え、実際のVRM物理を60Hzで計算する。更新前に確認した動きとの差は、全フレームの関節位置で最大0.557mm、6時点の変形頂点で最大0.359mm。動画も再読み込み後のVRMから作成する。数値は`verification/avatar/vrm-reload.json`、画像と動画の出力記録は`verification/avatar/mtoon-render.json`と`verification/avatar/video.json`に保存する。

現在は通常顔・二値のまばたき・閉じ目の笑顔と固定視線。口パク、LookAt、まぶたの連続補間、他の表情は未実装。配信アプリと本人トラッキングは未検証。髪や細かい装飾の交差、モーション中の接地差は残る。これは採用した制作基準であり、配信機能をすべて備えた完成品という判定ではない。

Charakuru v1.0.3のブラウザでも完成VRMとVRMAの読み込み・16秒再生・全3材質のMToon・揺れ物を確認済み。17チェーン・75ジョイントは、末端を除く58本のSpringBone区間として再生され、各区間の変換値が有限であることを確認した。以前の読み込み停止は、自動操作で選択したファイルの`File.arrayBuffer()`が完了しない段階で発生していた。同じ正本のバイト列をローカルHTTPから取得してブラウザ内のFileにし、通常の選択イベントへ渡すと読み込めた。アプリ本体のコードは変更していない。表示・再生の検査記録は`verification/aipai/playback.json`に保存する。

有料自動リグ2回は不採用となり、承認済みの手動骨配置・素体ウェイト転送・指の補正で仕上げた。Tripo実消費400クレジット、確認時残高195、追加購入なし。ジョブ8件の作成から完了までの合計519.44秒は総制作工数ではなく、手作業・待機・UV・検証を含まない。

作者`Nanatau`と利用条件は既存のななたうVRMを引き継いだ。本人のみ使用、本人の商用利用可、再配布不可、改変可、クレジット表記必須。詳細は`manifest.json`のVRMメタデータに記録する。
