# ななたう：Charakuru成果物

3D制作の正本。2026-10-26に、元絵を基準に顔と輪郭・首を整えたモデルを採用した。通常顔Kをユーザーが選び、その形状とUVを保って連続まばたき・笑顔を仕上げている。まず[現在のモデルの動作確認](videos/face-neck-motion.mp4)を開く。

| 目的 | ファイル | 内容 |
| --- | --- | --- |
| 現在のモデルの動きを見る | [顔と全身の12秒動画](videos/face-neck-motion.mp4) | 1540×900・24fps・無音。左右の首振り、うなずき、まばたき、笑顔 |
| VRMを使う | [avatar.vrm](avatar.vrm) | VRM 1.0・MToon、連続値の`blink`・`happy`、髪と衣装のSpringBone設定 |
| モデルを編集する | [avatar.blend](avatar.blend) | 画像を内包した静的な編集用正本。Headの笑顔、Eyelids・Lashesのまばたきを編集する |
| 画像を見る | [現在の表情・全身・検査画像](../../../images/concept/avatar-v1/charakuru/README.md) | 1440×1680の3表情、全身、45通りの表情検査 |
| 以前のダンスを見る | [表情付きテトリス](videos/dance-tetris-expressions.mp4) | 2026-10-24版の記録。約15.87秒・1080×1350・30fps・公式伴奏付き |
| 身体と揺れ物の以前のデモを見る | [Samba Dancing](videos/dance-demo.mp4) | 身体制作時の記録。18.2秒・1080×1080・30fps・無音 |
| 以前の音付きショートを見る | [愛包ダンスホール](videos/dance-short.mp4) | 身体制作時の記録。16秒・720×1280・30fps・音付き |
| 表情追加前と比べる | [テトリス](videos/dance-tetris.mp4)・[MToon動作確認](videos/motion-16s.mp4) | 以前のモデルによる動作記録 |
| 身体制作プロジェクトを復元する | [project.charakit](project.charakit) | 元絵・候補・配置・骨対応・制作履歴。身体制作時のスナップショット、Git LFS管理 |
| 以前のスキニングを確認する | [review.fbx](review.fbx) | 身体制作時のFBX。現在の顔・表情・物理・MToon・利用条件はVRMを参照 |

## 記録と作業領域

- [制作記録](PRODUCTION.md): 採用理由、編集方法、出典、利用条件、検証範囲。
- [manifest](manifest.json): 現パス・サイズ・SHA-256、モデル仕様、採用判断。
- [現在のモデル・表情・動画の検証](verification/expressions/)。
- 身体制作時の検証: [avatar](verification/avatar/)・[愛包](verification/aipai/)・[サンバ](verification/samba/)・[テトリス](verification/tetris/)。
- [配置と移動記録](ORGANIZATION.md)。
- 今回のローカル作業領域: `output/face-likeness-20261026/README.md`。制作スクリプト・検査画像・アニメーション入りBlend・全連番を保持する。Git管理外のためcloneには含まれない。

まばたき・笑顔・併用の各5段階を3方向から確認し、保存したBlendと書き出したVRMを読み込み直した。首と胴体の接続境界は4ポーズと動画の全288フレームで検査している。新しい動画は手付けの頭・首・上体と表情の動作で、揺れ物の物理再計算は含まない。

通常顔のHeadの形状とUVは承認されたKと一致する。可動まぶたの追加に伴い、目元の肌や細い線の表示は調整している。横顔の目は髪に隠れる部分がある。視線は固定、口パク・LookAt・配信アプリ・本人トラッキングは未検証。現在の141,076三角形のモデルで実配信時の負荷は測定していない。

現在の顔を編集・復元するにはBlendとVRMを使う。`.charakit`とFBXは現在の顔・表情を含まない。LFSの実体が未取得なら`git lfs pull`を実行する。
