---
name: motion-pngtuber-nanatau
description: |
  Orchestrate MotionPNGTuber asset generation inside the nanatau repo.
  Use when user mentions "MotionPNGTuber", "loop.mp4", "mouth_track.npz",
  "mouthless", "browser bundle", "動画ベースのPNGTuber", "口消し動画", "ループ候補".
---

# MotionPNGTuber Nanatau

`nanatau` repo で MotionPNGTuber 用アセットを作るときの導線。

実装本体はこの skill 配下の `scripts/` に同梱する。

## 完了条件

- `output/motion-pngtuber/<set-name>/` に以下が揃う
  - `loop.mp4`
  - `mouth_track.npz`
  - `loop_mouthless.mp4`
  - `mouth/`
  - `browser/`
- `.claude/skills/motion-pngtuber-nanatau/scripts/verify_server.py --mode stub` で `/healthz` と `/api/chat` が通る
- 採用版だけ `images/png-tuber/motion/<set-name>/` に正本化する

## 標準ワークフロー

1. `output/motion-pngtuber/<set-name>/source*.mp4` を用意
2. `.claude/skills/motion-pngtuber-nanatau/scripts/find_loop_candidates.py` で loop 候補を比較
3. 採用した候補を `loop.mp4` に置く
4. `.claude/skills/motion-pngtuber-nanatau/scripts/build_mouth_track.py` で track 生成
5. `.claude/skills/motion-pngtuber-nanatau/scripts/build_mouthless.py` で mouthless 生成
6. `.claude/skills/motion-pngtuber-nanatau/scripts/extract_mouth.py` で mouth 抽出
7. `.claude/skills/motion-pngtuber-nanatau/scripts/export_browser_bundle.py` で browser bundle 生成
8. `.claude/skills/motion-pngtuber-nanatau/scripts/verify_server.py --mode stub` で標準検証
9. 必要なら `--mode openai+aivis` で実サービス検証
10. `.claude/skills/motion-pngtuber-nanatau/scripts/promote_assets.py` で正本化

## Hard Gates

- loop:
  - boundary sheet が自然
  - `dy` が小さい
  - `seam_mae` が比較候補より明確に良い
- track:
  - `valid_rate >= 0.95`
  - `mean_conf >= 0.90`
- mouthless:
  - `qa_score` 最良
- verify:
  - `/healthz` が 200
  - `/api/chat` が 1 ターン成功
  - browser page が描画される

## 注意

- 既存の `nanatau` skill が扱う 4枚PNG の静的 PNGTuber とは別 workflow
- MotionPNGTuber は明示されたときだけ進める
