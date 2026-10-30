# ななたうの3Dモデルと動画

最新の顔、表情付きVRM、ダンスの記録を用途ごとにまとめた。モデルと動画の内容はそのまま保存し、それぞれの検証記録を同じフォルダに置いている。

| 見たいもの・使いたいもの | 保存先 | 状態 |
| --- | --- | --- |
| 確認済みの正面顔B | [studies/true-front-b](studies/true-front-b/README.md) | 2026-10-29に顔の雰囲気を確認。通常顔のBlendと12秒動画。表情は調整前 |
| 表情付きVRMと編集用Blend | [releases/k6](releases/k6/README.md) | 顎先を丸めたK6。連続まばたきと笑顔、12秒の動作動画 |
| 以前のダンス動画 | [dances](dances/README.md) | 愛包ダンスホール、サンバ、テトリス。制作時のモデルと検証範囲を記載 |
| 身体制作時のデータ | [archive/body](archive/body/README.md) | Charakuruプロジェクト、FBX、MToon確認動画と当時の検証 |
| 正面顔・表情・全身の画像 | [画像一覧](../../../images/concept/avatar-v1/charakuru/README.md) | モデルの制作段階と同じ配置で保存 |

正面顔Bは顔の方向性を確認した段階で、VRMへの反映はまだ行っていない。表情付きVRMを使う場合はK6を選ぶ。口パク、LookAt、配信アプリ、本人トラッキング、実配信時の負荷は未検証。

## 制作と保存の記録

- [制作記録と利用条件](PRODUCTION.md)
- [現在の配置と移動表](ORGANIZATION.md)
- [ファイルのサイズとSHA-256](manifest.json)
- [過去の制作記録](archive/production-history.md)・[過去の配置記録](archive/layout-history.md)

作業用の候補、連番、再現用スクリプト、元モーションと音源は `output/` に保存している。Git管理外なのでcloneには含まれない。主な作業領域は `output/face-likeness-20261026/` と `output/charakuru/nanatau-avatar-v1/`。
