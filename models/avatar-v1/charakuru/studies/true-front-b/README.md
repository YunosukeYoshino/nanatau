# ななたう：確認済みの正面顔B

真正面の顔資料から作り直した、通常顔の3Dモデルと12秒の動作動画。2026-10-29に、生成した2枚目の正面顔Bについて本人から「あってるのでここで区切ろう」と確認を受け、この顔の方向性で制作を一区切りにした。

確認済みなのは正面顔の雰囲気。現在の保存内容は通常顔と身体の動きまでで、表情の調整とVRMへの反映は未着手。

| 用途 | ファイル |
| --- | --- |
| 動画を見る | [motion.mp4](motion.mp4)：12秒・1540×900・24fps・無音 |
| モデルと動きを編集する | [motion.blend](motion.blend)：画像内包、1〜288フレーム |
| 元の正面資料を見る | [reference.png](../../../../../images/concept/avatar-v1/charakuru/true-front-b/reference.png) |
| 通常顔を見る | [front.png](../../../../../images/concept/avatar-v1/charakuru/true-front-b/front.png) |
| K6との違いを見る | [comparison.png](../../../../../images/concept/avatar-v1/charakuru/true-front-b/comparison.png)：同一の正面カメラで比較 |
| 動画の各場面を見る | [motion-contact-sheet.jpg](../../../../../images/concept/avatar-v1/charakuru/true-front-b/motion-contact-sheet.jpg) |
| 制作・検証を確認する | [production.json](production.json)・[verification.json](verification.json) |

動画は全身と顔アップを並べ、左右の首振り、うなずき、首かしげを収録した。顔カメラの横ずれは0。通常顔の形状・UV・ウェイトを保ち、全288フレームで首と胴体の接続を検査している。

Blender 5.2.1 LTS・EEVEE・48サンプル、Apple M2 ProのMetalで描画。Standard色管理と既存の材質・照明を使用し、デノイズなし。全連番の整合性、MP4全体のデコード、通常速度の全編再生を確認した。

このBlendは通常顔と身体の動きの確認用。旧まぶた・まつげは非表示で保持し、新しい顔のまばたき・笑顔・口パクは未調整。VRMへの再書き出し、揺れ物の物理、LookAt、配信アプリは未検証。表情付きの採用モデルは[Charakuru成果物一覧](../../README.md)にあるK6を参照する。

再現用スクリプト、連番、ログ、旧候補は `output/face-likeness-20261026/true-front-b/` にまとめた。Git管理外なのでcloneには含まれないが、このBlendは画像を内包しており単体で編集できる。制作時のパスはJSONの来歴として残す。保存した画像・動画・Blendのハッシュは[manifest](../../manifest.json)で照合できる。
