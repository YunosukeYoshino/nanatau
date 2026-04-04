import { Page } from "lume/core/file.ts";
import { Resvg } from "npm:@resvg/resvg-js@2.6.2";

const OGP_WIDTH = 1200;
const OGP_HEIGHT = 630;
const OGP_RENDER_SCALE = 2;
const OGP_OUTPUT_WIDTH = OGP_WIDTH * OGP_RENDER_SCALE;
const OGP_OUTPUT_HEIGHT = OGP_HEIGHT * OGP_RENDER_SCALE;
const TITLE_FONT_SIZE = 54;
const DESCRIPTION_FONT_SIZE = 26;
const META_FONT_SIZE = 26;
const SITE_LABEL_FONT_SIZE = 24;
const TITLE_MAX_LINES = 3;
const DESCRIPTION_MAX_LINES = 2;

const fontFilePathsPromise = loadFontFiles();
const iconDataUrlPromise = loadIconDataUrl();

export function attachOgImageData(pages) {
  for (const page of pages) {
    if (page.data.type !== "post" || page.data.draft) {
      continue;
    }

    page.data.image ??= getOgImagePath(page);
  }
}

export function attachHomeOgImageData(allPages) {
  const homePage = allPages.find((page) => page.data.url === "/");

  if (homePage) {
    homePage.data.image ??= "/og/home.png";
  }
}

export async function createOgImagePages(allPages) {
  const postPages = allPages.filter((page) =>
    page.data.type === "post" && !page.data.draft &&
    typeof page.data.title === "string"
  );

  const fontFilePaths = await fontFilePathsPromise;
  const iconDataUrl = await iconDataUrlPromise;

  for (const page of postPages) {
    const svg = buildOgSvg(page, iconDataUrl);
    const png = renderPng(svg, fontFilePaths);
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

  if (!allPages.some((page) => page.data.url === "/og/home.png")) {
    allPages.push(
      Page.create({
        url: "/og/home.png",
        content: await renderHomeOgImage(),
      }, {
        path: "og/home",
        ext: ".png",
      }),
    );
  }
}

export async function renderExternalPreviewImage(post) {
  const fontFilePaths = await fontFilePathsPromise;
  const iconDataUrl = await iconDataUrlPromise;
  const svg = buildExternalPreviewSvg(post, iconDataUrl);
  return renderPng(svg, fontFilePaths);
}

export async function renderHomeOgImage() {
  const fontFilePaths = await fontFilePathsPromise;
  const iconDataUrl = await iconDataUrlPromise;
  const svg = buildHomeOgSvg(iconDataUrl);
  return renderPng(svg, fontFilePaths);
}

function buildOgSvg(page, iconDataUrl) {
  const title = String(page.data.title ?? "");
  const tags = Array.isArray(page.data.tags)
    ? page.data.tags.slice(0, 2).map(String)
    : typeof page.data.tags === "string"
    ? [page.data.tags]
    : [];
  const titleLines = wrapText(title, 58, 980, 3);

  const titleTspans = titleLines.map((line, index) =>
    `<tspan x="86" dy="${index === 0 ? 0 : 78}">${escapeXml(line)}</tspan>`
  ).join("");
  const chipMarkup = tags
    .map((label, index) => renderChip(label, index))
    .join("");

  return `
<svg width="${OGP_OUTPUT_WIDTH}" height="${OGP_OUTPUT_HEIGHT}" viewBox="0 0 ${OGP_WIDTH} ${OGP_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OGP_WIDTH}" height="${OGP_HEIGHT}" fill="url(#bg)"/>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFE8BA"/>
      <stop offset="1" stop-color="#EFCB8B"/>
    </linearGradient>
    <clipPath id="authorAvatarClip">
      <circle cx="124" cy="528" r="36"/>
    </clipPath>
    <filter id="cardShadow" x="30" y="30" width="1140" height="570" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#D2B06A" flood-opacity="0.24"/>
    </filter>
  </defs>
  <g filter="url(#cardShadow)">
    <rect x="38" y="38" width="1124" height="554" rx="24" fill="#FFFEFB"/>
  </g>

  <text x="86" y="146" fill="#111111" font-size="60" font-family="'Nunito', 'Kosugi Maru', sans-serif" font-weight="900">
    ${titleTspans}
  </text>

  <g transform="translate(86 186)">
    ${chipMarkup}
  </g>

  <circle cx="124" cy="528" r="42" fill="#F4E2B6"/>
  <image href="${iconDataUrl}" x="88" y="492" width="72" height="72" preserveAspectRatio="xMidYMid slice" clip-path="url(#authorAvatarClip)"/>
  <text x="184" y="528" dominant-baseline="central" fill="#111111" font-size="40" font-family="'Nunito', 'Kosugi Maru', sans-serif" font-weight="900">@pomufgd</text>

  <text x="1110" y="528" dominant-baseline="central" text-anchor="end" fill="#111111" font-size="30" font-family="'Nunito', 'Kosugi Maru', sans-serif" font-weight="900">ななたうのぶろぐ！</text>
</svg>
`;
}

function buildExternalPreviewSvg(post, iconDataUrl) {
  const title = String(post.title ?? "");
  const description = cleanupOgText(post.excerpt ?? "");
  const source = String(post.source ?? "External");
  const date = post.date ? formatOgDate(post.date) : "";
  const titleLines = wrapText(title, 50, 760, 3);
  const descriptionLines = wrapText(description, 24, 720, 2);
  const titleTspans = titleLines.map((line, index) =>
    `<tspan x="92" dy="${index === 0 ? 0 : 70}">${escapeXml(line)}</tspan>`
  ).join("");
  const descriptionTspans = descriptionLines.map((line, index) =>
    `<tspan x="92" dy="${index === 0 ? 0 : 34}">${escapeXml(line)}</tspan>`
  ).join("");
  const chips = [date, source].filter(Boolean).map((label, index) =>
    renderChip(label, index)
  ).join("");

  return `
<svg width="${OGP_OUTPUT_WIDTH}" height="${OGP_OUTPUT_HEIGHT}" viewBox="0 0 ${OGP_WIDTH} ${OGP_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OGP_WIDTH}" height="${OGP_HEIGHT}" fill="#FFF9F0"/>
  <rect x="30" y="28" width="1140" height="574" rx="34" fill="#FFFEFB" stroke="#F1E3CB" stroke-width="2"/>
  <circle cx="1060" cy="112" r="168" fill="#F6E7C3" opacity="0.42"/>
  <rect x="882" y="82" width="200" height="200" rx="28" fill="#FFF8E8" stroke="#F0DFC2"/>
  <image href="${iconDataUrl}" x="902" y="102" width="160" height="160" preserveAspectRatio="xMidYMid slice" opacity="0.98"/>
  <text x="92" y="160" fill="#D9BE79" font-size="50" font-family="'Nunito', 'Kosugi Maru', sans-serif" font-weight="800">
    ${titleTspans}
  </text>
  <text x="92" y="338" fill="#6B5B7B" font-size="24" font-family="'Nunito', 'Kosugi Maru', sans-serif" opacity="0.92">
    ${descriptionTspans}
  </text>
  <g transform="translate(92 420)">
    ${chips}
  </g>
  <line x1="92" y1="500" x2="1110" y2="500" stroke="#F0E6D8" stroke-width="2"/>
  <text x="92" y="548" fill="#6B5B7B" font-size="24" font-family="'Nunito', 'Kosugi Maru', sans-serif">ななたうのぶろぐ！</text>
  <text x="1110" y="548" text-anchor="end" fill="#A1887F" font-size="18" font-family="'Nunito', 'Kosugi Maru', sans-serif">${
    escapeXml(source)
  }</text>
</svg>
`;
}

function buildHomeOgSvg(iconDataUrl) {
  const centerX = OGP_WIDTH / 2;
  const cardTop = 38;
  const cardHeight = 554;
  const cardCenterY = cardTop + cardHeight / 2;

  const avatarRadius = 110;
  const avatarDiameter = avatarRadius * 2;
  const gapAvatarTitle = 28;
  const titleVisualHeight = 52;

  const totalContentHeight = avatarDiameter + gapAvatarTitle +
    titleVisualHeight;
  const contentStartY = cardCenterY - totalContentHeight / 2;

  const avatarCenterY = contentStartY + avatarRadius;
  const titleY = Math.round(
    contentStartY + avatarDiameter + gapAvatarTitle + titleVisualHeight * 0.82,
  );
  const titleText = "ななたうのぶろぐ！";
  const titleWidth = estimateTextWidth(titleText, 64);
  const titleX = Math.round(centerX - titleWidth / 2);

  return `
<svg width="${OGP_OUTPUT_WIDTH}" height="${OGP_OUTPUT_HEIGHT}" viewBox="0 0 ${OGP_WIDTH} ${OGP_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="homeBg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFE8BA"/>
      <stop offset="1" stop-color="#F2D397"/>
    </linearGradient>
    <filter id="homeCardShadow" x="30" y="30" width="1140" height="570" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#D2B06A" flood-opacity="0.24"/>
    </filter>
    <clipPath id="homeAvatarClip">
      <circle cx="${centerX}" cy="${Math.round(avatarCenterY)}" r="${avatarRadius}"/>
    </clipPath>
  </defs>
  <rect width="${OGP_WIDTH}" height="${OGP_HEIGHT}" fill="url(#homeBg)"/>
  <g filter="url(#homeCardShadow)">
    <rect x="38" y="38" width="1124" height="554" rx="24" fill="#FFFEFB"/>
  </g>

  <circle cx="${centerX}" cy="${Math.round(avatarCenterY)}" r="${avatarRadius + 6}" fill="#F4E2B6"/>
  <image href="${iconDataUrl}" x="${centerX - avatarRadius}" y="${Math.round(avatarCenterY) - avatarRadius}" width="${avatarRadius * 2}" height="${avatarRadius * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#homeAvatarClip)"/>

  <text x="${titleX}" y="${titleY}" fill="#111111" font-size="64" font-family="'Kosugi Maru', 'Nunito', sans-serif" font-weight="800">${escapeXml(titleText)}</text>

  <text x="86" y="564" fill="#B8A07A" font-size="22" font-family="'Kosugi Maru', 'Nunito', sans-serif" font-weight="700">@pomufgd</text>
</svg>
`;
}

function renderChip(label, index) {
  const textWidth = estimateTextWidth(label, META_FONT_SIZE);
  const width = Math.max(106, Math.ceil(textWidth + 38));
  const positions = [0, 118, 226];
  const x = positions[index] ??
    (positions[positions.length - 1] + (index - 2) * 150);

  return `
  <g transform="translate(${x} 0)">
    <rect width="${
    Math.max(94, Math.ceil(textWidth + 32))
  }" height="46" rx="12" fill="#FFF9EE" stroke="#EADCC2" stroke-width="2"/>
    <text x="${
    Math.max(94, Math.ceil(textWidth + 32)) / 2
  }" y="30" text-anchor="middle" fill="#8D80AB" font-size="19" font-family="'Nunito', 'Kosugi Maru', sans-serif">${
    escapeXml(label)
  }</text>
  </g>`;
}


function renderPng(svg, fontFilePaths) {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "original",
    },
    font: {
      loadSystemFonts: false,
      fontFiles: fontFilePaths,
    },
  });

  return resvg.render().asPng();
}

async function loadFontFiles() {
  const cssResponse = await fetch(
    "https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=Nunito:wght@500;700;800&display=swap",
    {
      headers: {
        "user-agent": "Mozilla/5.0 (Linux; U; Android 2.2; en-us)",
      },
    },
  );
  const css = await cssResponse.text();
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)].map((match) =>
    match[1]
  );
  const uniqueUrls = [...new Set(urls)];

  const fontDir = new URL("./.og-fonts/", import.meta.url);
  await Deno.mkdir(fontDir, { recursive: true });
  const paths = await Promise.all(
    uniqueUrls.map(async (url, index) => {
      const response = await fetch(url);
      const buffer = new Uint8Array(await response.arrayBuffer());
      const ext = url.includes(".woff2")
        ? ".woff2"
        : url.includes(".woff")
        ? ".woff"
        : ".ttf";
      const fileUrl = new URL(`font-${index}${ext}`, fontDir);
      await Deno.writeFile(fileUrl, buffer);
      return fileUrl.pathname;
    }),
  );
  return paths;
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
