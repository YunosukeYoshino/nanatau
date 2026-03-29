#!/usr/bin/env python3
"""Generate anime character reference sheets from a reference image.

Usage:
    python3 scripts/generate_character_sheet.py \\
        --reference path/to/reference.png \\
        --type turnaround \\
        --output output/character/sheets/sheet.png

    python3 scripts/generate_character_sheet.py \\
        --reference path/to/reference.png \\
        --type expressions \\
        --character-desc "blonde hair, golden eyes, yellow magical girl dress" \\
        --output output/character/sheets/expressions.png

Sheet types:
    turnaround   - Front, side, back views (3-view)
    detailed     - 3-view + face close-up + accessory detail
    expressions  - 6 expression variations
    poses        - 4 pose variations
    full         - All of the above (generates multiple files)

Requires:
    - google-genai
    - Pillow
    - GEMINI_API_KEY environment variable
"""

import argparse
import io
import sys
import time
from pathlib import Path

from PIL import Image
from google import genai


SHEET_PROMPTS = {
    "turnaround": """Using this reference image as the EXACT character design to reproduce, create a professional anime character turnaround reference sheet.

IMPORTANT: Preserve the EXACT character from the reference — same hair color, eye color, outfit, accessories, proportions. Do NOT redesign. Faithfully reproduce this specific character from multiple angles.

SHEET LAYOUT:
- White or very light neutral background
- Three full-body views arranged LEFT to RIGHT: FRONT view, 3/4 SIDE view, BACK view
- All three views: same character, neutral standing pose, relaxed arms, balanced posture, clear silhouette
- Same height alignment across all three views
- Clean spacing between views, professional settei (setting material) layout

CHARACTER CONSISTENCY (maintain across ALL views):
{char_desc}

STYLE: Polished anime illustration, official setting material aesthetic. Consistent design across all views. Clean lineart, soft cel shading, {head_ratio} head ratio, warm color temperature. Professional anime production studio quality.

No extra fingers, consistent proportions, clean shading, no text labels, no watermark.""",

    "detailed": """Using this reference image as the EXACT character design to reproduce, create a professional anime character reference sheet with turnaround views and detail close-ups.

IMPORTANT: Preserve the EXACT character from the reference. Do NOT redesign.

SHEET LAYOUT:
- White or very light neutral background
- LEFT SECTION: Three full-body views — FRONT, 3/4 SIDE, BACK — neutral standing pose, same height alignment
- RIGHT SECTION (stacked vertically):
  - TOP: Face CLOSE-UP showing eyes, expression, hair details, blush, earrings
  - BOTTOM: Accessory/detail CLOSE-UP showing key items (hair ornament, wand tip, jewelry, outfit trim)
- Clean panel borders or neat spacing, highly readable presentation

CHARACTER CONSISTENCY:
{char_desc}

STYLE: Polished anime illustration, official settei aesthetic. Consistent across all views and close-ups. Clean lineart, soft cel shading, {head_ratio} head ratio. High detail in close-up panels.

No extra fingers, consistent proportions, clean shading, no watermark.""",

    "expressions": """Using this reference image as the EXACT character design, create a professional anime expression sheet showing 6 different facial expressions of the SAME character.

IMPORTANT: Same character, same hair, same accessories — ONLY the expression changes.

SHEET LAYOUT:
- White background
- 2 rows x 3 columns grid of FACE CLOSE-UPS (head and shoulders)
- Each panel shows a different expression:
  Row 1: (1) Neutral/default smile  (2) Happy/laughing  (3) Crying/teary
  Row 2: (4) Embarrassed/blushing  (5) Surprised/shocked  (6) Sleepy/drowsy
- Clean grid borders, even spacing
- Each expression is clearly distinct but unmistakably the same person

CHARACTER BASE:
{char_desc}

EXPRESSION DETAILS:
1. NEUTRAL: Gentle default smile, calm eyes, soft blush
2. HAPPY: Big bright smile, eyes closed in joy, mouth open
3. CRYING: Tears streaming, sparkling tear drops, trembling lip, trying to smile
4. EMBARRASSED: Intense blush across face and ears, eyes looking away
5. SURPRISED: Eyes wide open, small "o" mouth, eyebrows raised
6. SLEEPY: Half-lidded droopy eyes, small yawn, relaxed expression

STYLE: Polished anime, consistent character across all 6 panels. Clean lineart, soft cel shading. Each expression immediately readable.

No extra fingers, consistent face, clean shading, no watermark.""",

    "poses": """Using this reference image as the EXACT character design, create a professional anime pose sheet showing 4 different poses of the SAME character.

IMPORTANT: Same character, same outfit — ONLY the pose and expression changes.

SHEET LAYOUT:
- White or light background
- 4 full-body poses arranged left to right
- Poses:
  (1) Neutral standing (default, relaxed)
  (2) Action/dynamic pose (holding wand, casting)
  (3) Sitting pose (casual, on ground)
  (4) Emotional pose (crying, embarrassed, or sleeping)
- Even spacing, same ground line

CHARACTER:
{char_desc}

STYLE: Polished anime, consistent character across all 4 poses. Clean lineart, soft cel shading, {head_ratio} head ratio. Clear silhouettes.

No extra fingers, consistent proportions, clean shading, no watermark.""",
}

DEFAULT_CHAR_DESC = """- Hair: Soft pale yellow/butter blonde, long flowing waves
- Eyes: Warm golden amber with multiple sparkle highlights
- Outfit: Pastel yellow and white magical girl dress
- Accessories: As shown in reference image
- Body type: Petite, delicate frame"""

DEFAULT_HEAD_RATIO = "5.5-6"


def generate_sheet(
    client: genai.Client,
    ref_img: Image.Image,
    sheet_type: str,
    char_desc: str,
    head_ratio: str,
    model: str,
) -> tuple[Image.Image | None, dict]:
    template = SHEET_PROMPTS[sheet_type]
    prompt = template.format(char_desc=char_desc, head_ratio=head_ratio)

    response = client.models.generate_content(
        model=model,
        contents=[ref_img, prompt],
        config=genai.types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
        ),
    )

    usage = response.usage_metadata
    is_pro = "pro" in model
    rate = 120 if is_pro else 30
    cost = usage.candidates_token_count * rate / 1_000_000
    usage_info = {
        "input_tokens": usage.prompt_token_count,
        "output_tokens": usage.candidates_token_count,
        "total_tokens": usage.total_token_count,
        "cost_usd": cost,
        "cost_yen": int(cost * 150),
    }

    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            img = Image.open(io.BytesIO(part.inline_data.data))
            return img, usage_info

    return None, usage_info


def main():
    parser = argparse.ArgumentParser(description="Generate character reference sheets")
    parser.add_argument("--reference", required=True, help="Reference image path")
    parser.add_argument(
        "--type",
        required=True,
        choices=["turnaround", "detailed", "expressions", "poses", "full"],
        help="Sheet type",
    )
    parser.add_argument("--output", required=True, help="Output path (for 'full', used as directory)")
    parser.add_argument(
        "--model",
        default="gemini-3-pro-image-preview",
        help="Gemini model (default: gemini-3-pro-image-preview)",
    )
    parser.add_argument(
        "--character-desc",
        default=None,
        help="Character description override (default: auto from template)",
    )
    parser.add_argument(
        "--head-ratio",
        default=DEFAULT_HEAD_RATIO,
        help=f"Head-to-body ratio (default: {DEFAULT_HEAD_RATIO})",
    )
    args = parser.parse_args()

    ref_img = Image.open(args.reference)
    char_desc = args.character_desc or DEFAULT_CHAR_DESC
    client = genai.Client()

    if args.type == "full":
        out_dir = Path(args.output)
        out_dir.mkdir(parents=True, exist_ok=True)
        total_cost = 0.0

        for sheet_type in ["turnaround", "expressions", "poses"]:
            print(f"Generating {sheet_type} sheet...")
            img, usage = generate_sheet(
                client, ref_img, sheet_type, char_desc, args.head_ratio, args.model
            )
            if img is None:
                print(f"  FAILED: No image returned for {sheet_type}")
                continue

            out_path = out_dir / f"{sheet_type}.png"
            img.save(str(out_path), "PNG")
            total_cost += usage["cost_usd"]
            print(f"  Saved: {out_path} ({img.size})")
            print(f"  Tokens: in={usage['input_tokens']} out={usage['output_tokens']} | ${usage['cost_usd']:.4f} ({usage['cost_yen']}yen)")
            time.sleep(2)

        print(f"---\nTotal cost: ${total_cost:.4f} (approx {int(total_cost * 150)}yen)")
    else:
        print(f"Generating {args.type} sheet...")
        img, usage = generate_sheet(
            client, ref_img, args.type, char_desc, args.head_ratio, args.model
        )

        if img is None:
            print("FAILED: No image returned", file=sys.stderr)
            sys.exit(1)

        out = Path(args.output)
        out.parent.mkdir(parents=True, exist_ok=True)
        img.save(str(out), "PNG")
        print(f"Saved: {out} ({img.size})")
        print(f"Tokens: in={usage['input_tokens']} out={usage['output_tokens']} | ${usage['cost_usd']:.4f} ({usage['cost_yen']}yen)")


if __name__ == "__main__":
    main()
