---
status: accepted
---

# MotionPNGTuber Sample Mouth Selection

For the `sample` MotionPNGTuber set, the adopted loop is `candidate_rank02_s014_e135_b6` (`seam_mae=6.5212`, `dy=-0.0902`). The mouth sprites used for production are the existing verified tuned sprites rather than the newly extracted sprites, because extraction introduced a blue halo and color bleed in the same character series, reducing frontend quality.

The set was verified with `verify_server.py --mode stub`: `/healthz`, `/api/chat`, and `/` all succeeded. The retained evidence is `loop.mp4` at `1504x832`, `122` frames, `23.999fps`, `5.0835s`; mouth tracking reached `valid_rate=1.0`, `mean_conf=0.9691`, `p10_conf=0.9511`, and `jitter_p95_over_width=0.0147`; the selected mouthless parameters produced `qa_score=7.0580` with `valid_policy=hold`, `coverage=0.70`, and `ref_frame=94`.
