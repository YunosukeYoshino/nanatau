# ななたう：採用3Dモデル

2026-10-08、ユーザーの「Charakuruが勝ちですね！これを正本にしていきましょう」により採用。以後の3D制作はこのモデルを基準にする。制作方式は **Charakuru標準工程＋手動骨修正**。

同日、[Charakuru v1.0.3](https://github.com/nanocle/Charakuru/releases/tag/v1.0.3)のMToon工程へ更新。全3材質をVRM 1.0 MToonとしてBlend・VRMへ保存した。形状・UV・ウェイト・骨・4Kテクスチャ・揺れ設定・作者と利用条件を保持する。

2026-10-09、完成VRMをCharakuruで踊らせ、髪・スカート・リボンの物理を確認した。公式「愛包ダンスホール」の身体モーションとインスト音源を使った、音付き16秒の縦動画を採用する。

| ファイル | 用途 |
| --- | --- |
| [avatar.blend](avatar.blend) | 編集用の正本。`Nanatau_Charakuru_Production`シーン、`Nanatau_Charakuru_Rig`を編集する |
| [avatar.vrm](avatar.vrm) | MToonを保存したVRM 1.0の採用出力。バージョン`1.0.1-charakuru-mtoon` |
| [project.charakit](project.charakit) | Charakuruプロジェクト。元絵、8方向素材、候補、配置、骨対応、制作履歴を保持 |
| [review.fbx](review.fbx) | 髪を含むスキニング確認用。VRMの物理・利用条件は保存しない |
| [dance-short.mp4](dance-short.mp4) | 採用ダンス動画。720×1280、30fps、16秒、音付き。全身と揺れ物を確認できる |
| [motion-16s.mp4](motion-16s.mp4) | 再読み込みしたMToon版VRMへ同じ16秒身体入力を与えた動作確認動画 |
| [manifest.json](manifest.json) | 採用判断、来歴、仕様、利用条件、各成果物のSHA-256 |
| [verification/](verification/) | 正式VRMの出力・再読み込み、FBX、動画の検証記録 |

採用した6方向と顔アップは[画像正本](../../../images/concept/avatar-v1/charakuru/)に保存する。現在の画像は書き出したMToon版VRMを再読み込みしてレンダリングしたもの。更新前の比較画像はGitの採用コミット`173e549`に残る。元の[キャラクター資料](../../../images/concept/avatar-v1/README.md)も参照する。

## 編集と保存

`avatar.blend`が形状・ウェイト・材質・VRM物理設定の正本。6メッシュ、96,751三角面、129骨、51 Humanoid対応、17揺れチェーン・75ジョイント・9コライダー、2枚の4096×4096テクスチャを持つ。VRMでは未使用の非変形目骨2本が省かれ127骨となる。

`.charakit`だけではBlend内の揺れ設定を復元できない。編集時は対応するBlendとVRMを一緒に保管する。作業を`output/`で行い、採用した更新をこの固定パスへ反映する。Charakuruアプリの作業用プロジェクトも同じ内容で保存済み。このディレクトリはその採用チェックポイントであり、日付別の正本を増やさない。

MToonはv1.0.3の共通設定（陰色係数0.64、影境界0、トゥーン係数0.9、間接光均等化1、輪郭線なし）を使う。手元のVRM Add-on 4.7.1に合わせ、配布スクリプトの`gi_intensity_factor`を`gi_equalization_factor`へ修正した。元VRMの色係数`[1,1,1,1]`も保持し、未使用のPrincipled入力値による暗色化を防ぐ。配布ZIP・修正スクリプトのハッシュと修正前後の検査結果は`verification/mtoon-upgrade.json`に記録する。

`project.charakit`は100MiBを超えるためGit LFSで管理する。チェックアウト後に実体が未取得なら`git lfs pull`を実行する。公開やpushは別途ユーザーの指示に従う。

## ダンス再生と動画

Charakuru v1.0.3の「完成VRM」プレビューへ`avatar.vrm`と作業用`output/charakuru/nanatau-avatar-v1/dance/dance.vrma`を読み込むと再生できる。現在のブラウザには両方を読み込み済み。「再生」で身体と揺れ物を確認する。完成VRMとVRMAの選択は`.charakit`へ保存されないため、ページを再読み込みした場合は再選択する。

VRMAは公式VRM Add-on 4.7.1で書き出し、空のシーンへ読み込んだ正本VRMで再検査した。51 Humanoid骨の回転とhipsの位置だけを渡し、揺れ物は再生環境で計算する。480フレームの身体関節位置の差は最大0.061mm、6時点の身体変形頂点の差は最大0.023mm。記録は`verification/dance-vrma.json`に保存する。

縦動画は実VRMの再読み込みと60Hzの揺れ計算を使った480フレームを撮影したもの。カメラは固定で、全フレームに最低6%の画面余白を確保する。H.264 / AACで書き出し、映像・音声の全体デコードを検証した。`verification/dance-short-video.json`に撮影・音源・書き出しの記録を保存する。16秒を1回再生する動画で、切り出しの始終点は連続ループにならない。Charakuruの標準プレビューは繰り返し再生するため、ブラウザ検査時のみ実行中の再生設定を1回再生へ切り替えた。この設定はページの再読み込みで戻る。

モーション・音源は **HIMEHINA / Studio LaRa「愛包ダンスホール」**の[公式素材倉庫](https://himehina.jp/gallery?slug=material)から提供された素材。曲の44〜60秒を使用し、[二次創作ガイドライン](https://himehina.jp/guideline)を2026-10-09に確認した。元FBX、元WAV、変換VRMA、モーションを含む作業Blendは`output/`の作業素材とし、Gitには撮影済み動画と検証情報を保存する。出典・ハッシュは`verification/dance-provenance.json`に記録する。

目標として確認した[なのさんのダンス作例](https://x.com/Dstudio_ai/status/2101549849556721968)は[「With U_Challenge Ver.」](https://www.xstage.co/jp/motions/products/31932)の21秒モーションを使用している。その素材は購入が必要だったため、追加購入なしの方針に合わせ、手元の「愛包ダンスホール」で踊るところまで仕上げた。同じ振付や表情機能すべてを再現したという判定ではない。

## 確認範囲と残課題

Blender 5.2.1 / VRM Add-on 4.7.1で正式VRMを空のシーンへ再読み込みし、形状・UV・ウェイト・元の4K画像・全3材質のMToon設定を検査する。同じ身体入力を480フレーム・30fps・16秒で与え、実際のVRM物理を60Hzで計算する。更新前に確認した動きとの差は、全フレームの関節位置で最大0.557mm、6時点の変形頂点で最大0.359mm。動画も再読み込み後のVRMから作成する。数値は`verification/vrm-reload.json`、画像と動画の出力記録は`verification/mtoon-render.json`と`verification/video.json`に保存する。

標準工程は通常顔・固定視線。口パク、まばたき、表情キー、LookAtは未実装。配信アプリと本人トラッキングは未検証。髪や細かい装飾の交差、モーション中の接地差は残る。これは採用した制作基準であり、配信機能をすべて備えた完成品という判定ではない。

Charakuru v1.0.3のブラウザでも完成VRMとVRMAの読み込み・16秒再生・全3材質のMToon・揺れ物を確認済み。17チェーン・75ジョイントは、末端を除く58本のSpringBone区間として再生され、各区間の変換値が有限であることを確認した。以前の読み込み停止は、自動操作で選択したファイルの`File.arrayBuffer()`が完了しない段階で発生していた。同じ正本のバイト列をローカルHTTPから取得してブラウザ内のFileにし、通常の選択イベントへ渡すと読み込めた。アプリ本体のコードは変更していない。表示・再生の検査記録は`verification/dance-playback.json`に保存する。

有料自動リグ2回は不採用となり、承認済みの手動骨配置・素体ウェイト転送・指の補正で仕上げた。Tripo実消費400クレジット、確認時残高195、追加購入なし。ジョブ8件の作成から完了までの合計519.44秒は総制作工数ではなく、手作業・待機・UV・検証を含まない。

作者`Nanatau`と利用条件は既存のななたうVRMを引き継いだ。本人のみ使用、本人の商用利用可、再配布不可、改変可、クレジット表記必須。詳細は`manifest.json`のVRMメタデータに記録する。
