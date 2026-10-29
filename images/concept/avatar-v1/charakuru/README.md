# Charakuru版の確認画像

[採用モデル・動画・検証の一覧](../../../../models/avatar-v1/charakuru/README.md)に対応する画像正本。

## 確認済みの正面顔B

2026-10-29に本人が顔の雰囲気を確認した正面資料Bと、それをもとにした3Dモデルの画像。新しい顔のまばたき・笑顔は調整前で、[通常顔のモデルと動画](../../../../models/avatar-v1/charakuru/studies/true-front-b/README.md)に対応する。

- [正面資料](true-front-b/reference.png)
- [3Dの通常顔](true-front-b/front.png)
- [K6との同一カメラでの比較](true-front-b/comparison.png)
- [12秒動画の各場面](true-front-b/motion-contact-sheet.jpg)

## 現在の表情と全身

2026-10-26採用の顔から顎先だけを丸めた`approved-reference-face-k6-rounded-chin`を、VRMから読み込み直して撮影した。目・口・頬幅を保持し、まばたきと笑顔を0〜100%で連続変形できる。[顎先の修正前後](chin-rounding-comparison.png)も参照できる。

| 表情 | 1440×1680の画像 |
| --- | --- |
| 通常顔 | [face-neutral.png](face-neutral.png) |
| まばたき | [face-blink.png](face-blink.png) |
| 目を開けたにっこり | [face-happy.png](face-happy.png) |

- [髪・衣装と組み合わせた全身](current-fullbody.png)
- [全身の6方向](current-views.jpg)
- [まばたき5段階×3方向](expressions-blink-matrix.jpg)
- [笑顔5段階×3方向](expressions-happy-matrix.jpg)
- [まばたきと笑顔の併用5段階×3方向](expressions-combined-matrix.jpg)

[検証記録](../../../../models/avatar-v1/charakuru/verification/expressions/model.json)と[現在のK6の12秒動画](../../../../models/avatar-v1/charakuru/videos/face-neck-motion.mp4)を参照できる。動画はK6の全身と顔アップを並べた無音の動作確認で、揺れ物の物理計算を含まない。横顔の目は髪に隠れる部分がある。

## 表情追加前の外観

以下は身体制作時のMToon版（Gitチェックポイント`22258cd`、VRM SHA-256 `c53a027ec2cc357b11122415659a532a2b2eec7b8b3955bd7c5671cd49fcbaf9`）の画像。新しい3表情の画像とは分けて保持する。

| 方向 | 画像 |
| --- | --- |
| 正面 | [front.png](front.png) |
| 左斜め | [left45.png](left45.png) |
| 右斜め | [right45.png](right45.png) |
| 左側面 | [left.png](left.png) |
| 右側面 | [right.png](right.png) |
| 背面 | [back.png](back.png) |
| 顔アップ | [face.png](face.png) |

## 愛包ダンスホールの動作確認

`motion-review/` の12枚は、表情追加前のMToon版VRMへ「愛包ダンスホール」の16秒身体入力と揺れ計算を与えた確認画像。各時点を正面と側面で撮影している。サンバデモの抜き出し画像ではない。

| フレーム | 正面 | 側面 |
| --- | --- | --- |
| 0001 | [front-0001.png](motion-review/front-0001.png) | [side-0001.png](motion-review/side-0001.png) |
| 0091 | [front-0091.png](motion-review/front-0091.png) | [side-0091.png](motion-review/side-0091.png) |
| 0181 | [front-0181.png](motion-review/front-0181.png) | [side-0181.png](motion-review/side-0181.png) |
| 0271 | [front-0271.png](motion-review/front-0271.png) | [side-0271.png](motion-review/side-0271.png) |
| 0361 | [front-0361.png](motion-review/front-0361.png) | [side-0361.png](motion-review/side-0361.png) |
| 0480 | [front-0480.png](motion-review/front-0480.png) | [side-0480.png](motion-review/side-0480.png) |

対応する[再読み込みの動作確認動画](../../../../models/avatar-v1/charakuru/videos/motion-16s.mp4)と、[音付き16秒縦動画](../../../../models/avatar-v1/charakuru/videos/dance-short.mp4)を参照できる。
