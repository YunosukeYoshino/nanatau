# ななたう：Charakuru成果物

3D制作の正本。最初に動きを見る場合は[サンバのデモ動画](videos/dance-demo.mp4)を開く。

| 目的 | ファイル | 内容 |
| --- | --- | --- |
| デモを見る | [Samba Dancing](videos/dance-demo.mp4) | 18.2秒・1080×1080・30fps・無音、MToonと揺れ物 |
| 音付きショートを見る | [愛包ダンスホール](videos/dance-short.mp4) | 16秒・720×1280・30fps・音付き |
| テトリスを見る | [テトリス](videos/dance-tetris.mp4) | 約15.87秒・1080×1350・30fps・公式伴奏付き |
| VRMを使う | [avatar.vrm](avatar.vrm) | 採用VRM 1.0、MToon・髪と衣装の物理設定 |
| モデルを編集する | [avatar.blend](avatar.blend) | 編集用の正本、`Nanatau_Charakuru_Production`シーン |
| Charakuruプロジェクトを復元する | [project.charakit](project.charakit) | 元絵・候補・配置・骨対応・制作履歴、Git LFS管理 |
| スキニングを確認する | [review.fbx](review.fbx) | FBX確認用。VRMの物理・MToon・利用条件はVRMを参照 |
| 画像を見る | [6方向と顔アップ](../../../images/concept/avatar-v1/charakuru/README.md) | 採用MToon版の確認画像と16秒動作の静止画 |
| 更新前後の動きを比べる | [MToon動作確認](videos/motion-16s.mp4) | 16秒の比較・再読み込み確認 |

## 記録と作業領域

- [制作記録](PRODUCTION.md): 採用理由、仕様、編集・再生、出典、利用条件、確認範囲。
- [manifest](manifest.json): 現パスとSHA-256、モデル仕様、採用判断。
- [採用モデルの検証](verification/avatar/)、[愛包の検証](verification/aipai/)、[サンバの検証](verification/samba/)、[テトリスの検証](verification/tetris/)。
- [配置と移動記録](ORGANIZATION.md): このディレクトリの配置ルールと移動表。
- ローカルの作業領域: `output/charakuru/nanatau-avatar-v1/README.md` に、このマシンのKit・再現用データ・元モーションへの案内を置く。Git管理外のためcloneには含まれない。

編集と復元にはBlend・VRM・Charakuruプロジェクトを一緒に保管する。`.charakit`だけではBlend内の揺れ設定を復元できない。LFSの実体が未取得なら `git lfs pull` を実行する。

顔は通常表情・固定視線。まばたき、口パク、表情キー、LookAtは未実装。配信アプリと本人トラッキングの確認範囲、衣装の交差や接地の残りは制作記録を参照する。
