# MotionPNGTuberの採用サンプル

採用したループ動画と口の画像を収録したセットです。採用理由と検証値は[口画像の選定記録](../../../../docs/adr/0002-motion-pngtuber-sample-mouth-selection.md)にあります。

| 保存先 | 内容 |
| --- | --- |
| [loop.mp4](loop.mp4) | 採用したループ動画 |
| [loop_mouthless.mp4](loop_mouthless.mp4) | 口を消した動画 |
| [mouth/](mouth/) | 閉じ口・半開き・開き口・う・えの画像5枚 |
| [mouth_track.npz](mouth_track.npz) | 口の位置を記録したデータ |
| [browser/](browser/) | 再生用ページ、H.264動画、JSON形式の口位置と口画像 |
| [source_grok-video-377c88d2.mp4](source_grok-video-377c88d2.mp4) | 制作元の動画 |

`mouth/` と `browser/mouth/` は制作・再処理用とブラウザー再生用です。ブラウザー用セットは必要な画像を同梱しています。

リポジトリ直下から、外部APIを使わない確認用サーバーを起動できます。

```bash
python3.10 .claude/skills/motion-pngtuber-nanatau/scripts/verify_server.py \
  --asset-dir images/png-tuber/motion/sample/browser \
  --mode stub
```

起動後は <http://127.0.0.1:8765/> を開きます。制作・正本化の手順は[MotionPNGTuber制作ガイド](../../../../.claude/skills/motion-pngtuber-nanatau/README.md)を参照してください。
