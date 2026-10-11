# Charakuru版の確認画像

[採用モデル・動画・検証の一覧](../../../../models/avatar-v1/charakuru/README.md)に対応する画像正本。表情の3枚は現在のVRM、外観・動作の画像は表情追加前のMToon版VRMを再読み込みして撮影した。

## 現在の表情

2026-10-11に採用した、通常顔・まばたき・閉じ目の笑顔。現在の`avatar.vrm`と`avatar.blend`に対応する。閉じ目では虹彩と白目を隠し、まぶたを表示する。口パクは含まない。

| 表情 | 画像 |
| --- | --- |
| 通常顔 | [face-neutral.png](face-neutral.png) |
| まばたき | [face-blink.png](face-blink.png) |
| 閉じ目の笑顔 | [face-happy.png](face-happy.png) |

[表情モデルの検証](../../../../models/avatar-v1/charakuru/verification/expressions/model.json)と[表情付きテトリス](../../../../models/avatar-v1/charakuru/videos/dance-tetris-expressions.mp4)を参照できる。

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
