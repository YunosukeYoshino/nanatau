# Grok 377c88d2 MotionPNGTuber Runbook

## Inputs

- source video:
  - `output/motion-pngtuber/grok_377c88d2/source_grok-video-377c88d2.mp4`
- source origin:
  - `/Users/yunosukeyoshino/Documents/playground/ai/png-tuber/assets/grok_377c88d2/source_grok-video-377c88d2.mp4`

## Adopted Loop

- adopted candidate:
  - `candidate_rank02_s014_e135_b6`
- reason:
  - `seam_mae=6.5212`
  - `dy=-0.0902`
  - 最良 seam 候補にかなり近く、戻り方向のズレが小さい

## Current Assets

- loop clip:
  - `output/motion-pngtuber/grok_377c88d2/loop.mp4`
- mouth track:
  - `output/motion-pngtuber/grok_377c88d2/mouth_track.npz`
- mouthless loop:
  - `output/motion-pngtuber/grok_377c88d2/loop_mouthless.mp4`
- extracted mouth backup:
  - `output/motion-pngtuber/grok_377c88d2/mouth_extracted/`
- production mouth:
  - `output/motion-pngtuber/grok_377c88d2/mouth/`
- browser bundle:
  - `output/motion-pngtuber/grok_377c88d2/browser/`

## Metrics

- loop.mp4:
  - `1504x832`
  - `122 frames`
  - `23.999fps`
  - `5.0835s`
- mouth_track.npz:
  - `valid_rate = 1.0`
  - `mean_conf = 0.9691`
  - `p10_conf = 0.9511`
  - `jitter_p95_over_width = 0.0147`
- loop_mouthless.mp4:
  - best params:
    - `valid_policy = hold`
    - `coverage = 0.70`
    - `ref_frame = 94`
    - `qa_score = 7.0580`

## Mouth Decision

- `extract_mouth.py` で `mouth_extracted/` を生成した
- 本番採用は、既存の検証済み tuned mouth を `mouth/` に配置した
- 理由:
  - 同一キャラクター系列では抽出版に青ハローと色被りが出やすく、frontend 品質が下がりやすいため

## Verification

- `verify_server.py --mode stub` で起動
- `/healthz` は `200 OK`
- `/api/chat` は 1 ターン成功
- `/` は `200 OK`

