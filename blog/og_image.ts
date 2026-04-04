import { Page } from "lume/core/file.ts";
import { Resvg } from "npm:@resvg/resvg-js@2.6.2";

const OGP_WIDTH = 1200;
const OGP_HEIGHT = 630;
const TITLE_FONT_SIZE = 54;
const DESCRIPTION_FONT_SIZE = 26;
const META_FONT_SIZE = 26;
const SITE_LABEL_FONT_SIZE = 24;
const TITLE_MAX_LINES = 3;
const DESCRIPTION_MAX_LINES = 2;

const fontBuffersPromise = loadFontBuffers();
const iconDataUrlPromise = loadIconDataUrl();

export function attachOgImageData(pages) {
  for (const page of pages) {
    if (page.data.type !== "post" || page.data.draft) {
      continue;
    }

    page.data.image ??= getOgImagePath(page);
  }
}

export async function createOgImagePages(allPages) {
  const postPages = allPages.filter((page) =>
    page.data.type === "post" && !page.data.draft &&
    typeof page.data.title === "string"
  );

  const fontBuffers = await fontBuffersPromise;
  const iconDataUrl = await iconDataUrlPromise;

  for (const page of postPages) {
    const svg = buildOgSvg(page, iconDataUrl);
    const png = renderPng(svg, fontBuffers);
    const ogPath = getOgImagePath(page);

    allPages.push(
      Page.create({
        url: ogPath,
        content: png,
      }, {
        path: ogPath.replace(/^\//, "").replace(/\.png$/, ""),
        ext: ".png",
      }),
    );
  }
}

function buildOgSvg(page, iconDataUrl) {
  const title = String(page.data.title ?? "");
  const description = String(page.data.description ?? page.data.excerpt ?? "");
  const date = page.data.date ? formatOgDate(page.data.date) : "";
  const tags = Array.isArray(page.data.tags)
    ? page.data.tags.slice(0, 2).map(String)
    : typeof page.data.tags === "string"
    ? [page.data.tags]
    : [];
  const titleLines = wrapText(title, TITLE_FONT_SIZE, 780, TITLE_MAX_LINES);
  const descriptionLines = wrapText(
    cleanupOgText(description),
    DESCRIPTION_FONT_SIZE,
    700,
    DESCRIPTION_MAX_LINES,
  );

  const titleTspans = titleLines.map((line, index) =>
    `<tspan x="88" dy="${index === 0 ? 0 : 76}">${escapeXml(line)}</tspan>`
  ).join("");
  const descriptionTspans = descriptionLines.map((line, index) =>
    `<tspan x="88" dy="${index === 0 ? 0 : 38}">${escapeXml(line)}</tspan>`
  ).join("");

  const chipMarkup = [date, ...tags].filter(Boolean)
    .map((label, index) => renderChip(label, index))
    .join("");

  return `
<svg width="${OGP_WIDTH}" height="${OGP_HEIGHT}" viewBox="0 0 ${OGP_WIDTH} ${OGP_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OGP_WIDTH}" height="${OGP_HEIGHT}" fill="#FFF9F0"/>
  <defs>
    <linearGradient id="cardGlow" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFDF7"/>
      <stop offset="1" stop-color="#FFF9EF"/>
    </linearGradient>
    <linearGradient id="accentWash" x1="802" y1="38" x2="1140" y2="316" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F7EAC8"/>
      <stop offset="1" stop-color="#FFF6E2"/>
    </linearGradient>
  </defs>
  <circle cx="1088" cy="120" r="176" fill="#F5E6C4" opacity="0.5"/>
  <circle cx="1030" cy="570" r="150" fill="#FBF1DD" opacity="0.85"/>
  <rect x="30" y="28" width="1140" height="574" rx="34" fill="url(#cardGlow)" stroke="#F1E3CB" stroke-width="2"/>

  <rect x="872" y="72" width="238" height="238" rx="32" fill="url(#accentWash)" stroke="#F0DFC2"/>
  <rect x="892" y="92" width="198" height="198" rx="28" fill="#FFF8E8"/>
  <image href="${iconDataUrl}" x="892" y="92" width="198" height="198" preserveAspectRatio="xMidYMid slice" opacity="0.98"/>

  <text x="88" y="150" fill="#D9BE79" font-size="${TITLE_FONT_SIZE}" font-family="'Nunito', 'Kosugi Maru', sans-serif" font-weight="800">
    ${titleTspans}
  </text>

  <text x="88" y="300" fill="#6B5B7B" font-size="${DESCRIPTION_FONT_SIZE}" font-family="'Nunito', 'Kosugi Maru', sans-serif" opacity="0.92">
    ${descriptionTspans}
  </text>

  <g transform="translate(88 414)">
    ${chipMarkup}
  </g>

  <line x1="88" y1="494" x2="1112" y2="494" stroke="#ECDD C1" stroke-width="2"/>

  <text x="88" y="545" fill="#6B5B7B" font-size="${SITE_LABEL_FONT_SIZE}" font-family="'Nunito', 'Kosugi Maru', sans-serif">ななたうのブログ</text>
  <text x="1112" y="545" text-anchor="end" fill="#A1887F" font-size="18" font-family="'Nunito', 'Kosugi Maru', sans-serif">blog.nanatau.com</text>
</svg>
`;
}

function renderChip(label, index) {
  const textWidth = estimateTextWidth(label, META_FONT_SIZE);
  const width = Math.max(106, Math.ceil(textWidth + 38));
  const positions = [0, 236, 386];
  const x = positions[index] ??
    (positions[positions.length - 1] + (index - 2) * 150);

  return `
  <g transform="translate(${x} 0)">
    <rect width="${width}" height="52" rx="14" fill="#FFF9EE" stroke="#EADCC2" stroke-width="2"/>
    <text x="${
    width / 2
  }" y="34" text-anchor="middle" fill="#8D80AB" font-size="${META_FONT_SIZE}" font-family="'Nunito', 'Kosugi Maru', sans-serif">${
    escapeXml(label)
  }</text>
  </g>`;
}

function renderPng(svg, fontBuffers) {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "original",
    },
    font: {
      loadSystemFonts: false,
      fontFiles: fontBuffers,
    },
  });

  return resvg.render().asPng();
}

async function loadFontBuffers() {
  const cssResponse = await fetch(
    "https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=Nunito:wght@500;700;800&display=swap",
    {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
      },
    },
  );
  const css = await cssResponse.text();
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)].map((match) =>
    match[1]
  );
  const uniqueUrls = [...new Set(urls)];

  const fontResponses = await Promise.all(uniqueUrls.map((url) => fetch(url)));
  return await Promise.all(fontResponses.map(async (response) => {
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  }));
}

async function loadIconDataUrl() {
  const bytes = await Deno.readFile(
    new URL("./images/favicon.png", import.meta.url),
  );
  return `data:image/png;base64,${encodeBase64(bytes)}`;
}

function getOgImagePath(page) {
  const slug = page.src.path.split("/").pop() || page.data.basename || "post";
  return `/og/${slug}.png`;
}

function wrapText(text, fontSize, maxWidth, maxLines) {
  const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
  const segments = [...segmenter.segment(text)].map(({ segment }) => segment);
  const lines = [];
  let current = "";

  for (const segment of segments) {
    const next = current + segment;

    if (estimateTextWidth(next, fontSize) <= maxWidth) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current.trim());
      current = segment.trimStart();
    } else {
      lines.push(segment.trim());
      current = "";
    }

    if (lines.length === maxLines) {
      lines[maxLines - 1] = clampWithEllipsis(
        lines[maxLines - 1],
        fontSize,
        maxWidth,
      );
      return lines;
    }
  }

  if (current) {
    lines.push(current.trim());
  }

  if (lines.length > maxLines) {
    return lines.slice(0, maxLines).map((line, index) =>
      index === maxLines - 1
        ? clampWithEllipsis(line, fontSize, maxWidth)
        : line
    );
  }

  return lines;
}

function clampWithEllipsis(text, fontSize, maxWidth) {
  let result = text;

  while (
    result.length > 1 && estimateTextWidth(`${result}…`, fontSize) > maxWidth
  ) {
    result = result.slice(0, -1);
  }

  return `${result}…`;
}

function estimateTextWidth(text, fontSize) {
  let width = 0;

  for (const char of text) {
    if (/[A-Z]/.test(char)) {
      width += fontSize * 0.72;
    } else if (/[a-z0-9]/.test(char)) {
      width += fontSize * 0.58;
    } else if (/\s/.test(char)) {
      width += fontSize * 0.28;
    } else if (/[\u3040-\u30ff\u3400-\u9fff\uff01-\uff60]/.test(char)) {
      width += fontSize * 0.98;
    } else {
      width += fontSize * 0.72;
    }
  }

  return width;
}

function formatOgDate(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function cleanupOgText(value) {
  return String(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function encodeBase64(bytes) {
  let binary = "";

  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }

  return btoa(binary);
}
