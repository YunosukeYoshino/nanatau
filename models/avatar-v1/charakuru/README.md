# ななたう：Charakuru成果物

3D制作の正本。2026-10-24にRound 3修正版`refine01`を採用した。VRMとBlendは、顔立ちを保った連続まばたきと笑顔に対応する。まず[表情付きテトリス](videos/dance-tetris-expressions.mp4)を開く。身体と揺れ物のデモは[サンバ](videos/dance-demo.mp4)を参照する。

| 目的 | ファイル | 内容 |
| --- | --- | --- |
| 表情付きのテトリスを見る | [まばたきと笑顔](videos/dance-tetris-expressions.mp4) | 約15.87秒・1080×1350・30fps・公式伴奏付き、連続まばたき4回・笑顔3区間 |
| デモを見る | [Samba Dancing](videos/dance-demo.mp4) | 18.2秒・1080×1080・30fps・無音、MToonと揺れ物 |
| 音付きショートを見る | [愛包ダンスホール](videos/dance-short.mp4) | 16秒・720×1280・30fps・音付き |
| 表情追加前と比べる | [テトリス](videos/dance-tetris.mp4) | 約15.87秒・1080×1350・30fps・公式伴奏付き、通常表情 |
| VRMを使う | [avatar.vrm](avatar.vrm) | 採用VRM 1.0、MToon・髪と衣装の物理設定、連続値の`blink`・`happy` |
| モデルを編集する | [avatar.blend](avatar.blend) | 保存・再読み込み済みの静的な編集用正本 |
| 身体制作プロジェクトを復元する | [project.charakit](project.charakit) | 元絵・候補・配置・骨対応・制作履歴、表情追加前のスナップショット、Git LFS管理 |
| スキニングを確認する | [review.fbx](review.fbx) | 表情追加前のFBX確認用。現在の表情・物理・MToon・利用条件はVRMを参照 |
| 画像を見る | [表情と外観の確認画像](../../../images/concept/avatar-v1/charakuru/README.md) | 現在の通常顔・まばたき・笑顔と、表情追加前の6方向・16秒動作の静止画 |
| 更新前後の動きを比べる | [MToon動作確認](videos/motion-16s.mp4) | 16秒の比較・再読み込み確認 |

## 記録と作業領域

- [制作記録](PRODUCTION.md): 採用理由、仕様、編集・再生、出典、利用条件、確認範囲。
- [manifest](manifest.json): 現パスとSHA-256、モデル仕様、採用判断。
- [採用モデルの検証](verification/avatar/)、[愛包の検証](verification/aipai/)、[サンバの検証](verification/samba/)、[テトリスの検証](verification/tetris/)。
- [現在の表情モデル・再生の検証](verification/expressions/)。上記の身体制作・動画の検証は表情追加前のモデルを記録する。
- [配置と移動記録](ORGANIZATION.md): このディレクトリの配置ルールと移動表。
- ローカルの作業領域: `output/charakuru/nanatau-avatar-v1/README.md` に、このマシンのKit・再現用データ・元モーションへの案内を置く。Git管理外のためcloneには含まれない。

現在の表情を編集・復元するにはBlendとVRMを使う。`.charakit`とFBXは表情追加前の身体制作スナップショットで、現在の顔表情を含まない。`.charakit`だけではBlend内の揺れ設定も復元できない。LFSの実体が未取得なら `git lfs pull` を実行する。

まばたきと笑顔は0〜100%で連続変形し、両方を重ねられる。5段階×3方向×3表情の45通りと、Blendの保存・再読み込み、VRMの再書き出しを確認済み。動画の髪と衣装は既存の計算済みの揺れを再生している。視線は固定、口パクとLookAtは未実装。今回の修正版を配信アプリや本人トラッキングで動かす検証は行っていない。再書き出し時の法線差、髪による目元の遮蔽、衣装の交差や接地の残りは制作記録を参照する。
