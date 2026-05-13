export interface ExternalFeedSource {
  id: string;
  title: string;
  feedUrl: string;
  tags?: string[];
}

export interface ExternalPost {
  title: string;
  url: string;
  date: Date;
  excerpt: string;
  image?: string;
  author?: string;
  source: string;
  external: true;
  tags: string[];
}

interface ExternalImageAsset {
  url: string;
  outputPath: string;
  content: Uint8Array;
}

interface PagefindCustomRecord {
  url: string;
  content: string;
  language: string;
  meta: Record<string, string>;
  filters?: Record<string, string | string[]>;
  sort?: Record<string, string>;
}

export const externalFeedSources: ExternalFeedSource[] = [
  {
    id: "zenn-yuche",
    title: "Zenn",
    feedUrl: "https://zenn.dev/yuche/feed",
    tags: ["zenn"],
  },
  {
    id: "note-yuche",
    title: "note",
    feedUrl: "https://note.com/yuche__/rss",
    tags: ["note"],
  },
  {
    id: "qiita-pomufgd",
    title: "Qiita",
    feedUrl: "https://qiita.com/pomufgd/feed",
    tags: ["qiita"],
  },
];

let externalPostsPromise: Promise<ExternalPost[]> | undefined;
let externalImageAssetsPromise: Promise<ExternalImageAsset[]> | undefined;

export function getExternalPosts(): Promise<ExternalPost[]> {
  externalPostsPromise ??= fetchExternalPosts();
  return externalPostsPromise;
}

export async function getPagefindCustomRecords(): Promise<
  PagefindCustomRecord[]
> {
  const posts = await getExternalPosts();

  return posts.map((post) => ({
    url: post.url,
    language: "ja",
    content: [
      post.title,
      post.excerpt,
      post.source,
      post.tags.join(" "),
    ]
      .filter(Boolean)
      .join("\n\n"),
    meta: {
      title: post.title,
      source: post.source,
    },
    filters: {
      filter: post.tags,
    },
    sort: {
      date: post.date.toISOString(),
    },
  }));
}

export function getExternalImageAssets(): Promise<ExternalImageAsset[]> {
  externalImageAssetsPromise ??= fetchExternalImageAssets();
  return externalImageAssetsPromise;
}

async function fetchExternalPosts(): Promise<ExternalPost[]> {
  const settled = await Promise.allSettled(
    externalFeedSources.map(async (source) => {
      const response = await fetch(source.feedUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${source.feedUrl}: ${response.status}`,
        );
      }

      const xml = await response.text();
      const posts = parseFeed(source, xml);
      return await enrichMissingImages(source, posts);
    }),
  );

  const posts: ExternalPost[] = [];

  for (const result of settled) {
    if (result.status === "fulfilled") {
      posts.push(...result.value);
    } else {
      console.warn("[external_feeds] feed fetch failed:", result.reason);
    }
  }

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

async function fetchExternalImageAssets(): Promise<ExternalImageAsset[]> {
  const posts = await getExternalPosts();
  const qiitaPosts = posts.filter((post) =>
    post.source === "Qiita" && post.image?.startsWith("http")
  );

  const settled = await Promise.allSettled(
    qiitaPosts.map(async (post) => {
      const slug = slugify(post.url);
      const outputPath = `/external-og/qiita-${slug}.png`;
      const content = await fetchQiitaPreviewImage(post);

      post.image = outputPath;

      return {
        url: post.url,
        outputPath,
        content,
      };
    }),
  );

  const assets: ExternalImageAsset[] = [];

  for (const result of settled) {
    if (result.status === "fulfilled") {
      assets.push(result.value);
    } else {
      console.warn(
        "[external_feeds] image localization failed:",
        result.reason,
      );
    }
  }

  return assets;
}

async function fetchQiitaPreviewImage(post: ExternalPost): Promise<Uint8Array> {
  if (!post.image) {
    return await renderFallbackExternalPreviewImage(post);
  }

  try {
    const response = await fetch(post.image, {
      headers: {
        "user-agent": "Mozilla/5.0",
        "accept":
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "referer": "https://qiita.com/",
      },
    });

    if (response.ok) {
      return new Uint8Array(await response.arrayBuffer());
    }
  } catch (_error) {
    // Fall through to generated preview.
  }

  return await renderFallbackExternalPreviewImage(post);
}

async function renderFallbackExternalPreviewImage(
  post: ExternalPost,
): Promise<Uint8Array> {
  const { renderExternalPreviewImage } = await import("./og_image.ts");
  return await renderExternalPreviewImage(post);
}

async function enrichMissingImages(
  source: ExternalFeedSource,
  posts: ExternalPost[],
) {
  if (source.title !== "Qiita") {
    return posts;
  }

  return await Promise.all(posts.map(async (post) => {
    if (post.image) {
      return post;
    }

    const image = await fetchOgImageFromPage(post.url);
    return {
      ...post,
      image: image || post.image,
    };
  }));
}

function parseFeed(source: ExternalFeedSource, xml: string): ExternalPost[] {
  const itemBlocks = [
    ...xml.matchAll(/<item\b[\s\S]*?<\/item>/g),
    ...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/g),
  ];

  return itemBlocks
    .map(([itemXml]) => {
      const title = getTagText(itemXml, "title");
      const url = getItemUrl(itemXml);
      const pubDate = getTagText(itemXml, "pubDate") ||
        getTagText(itemXml, "published") ||
        getTagText(itemXml, "updated");

      if (!title || !url || !pubDate) {
        return null;
      }

      const date = new Date(pubDate);

      if (Number.isNaN(date.getTime())) {
        return null;
      }

      return {
        title,
        url,
        date,
        excerpt: cleanupText(getTagText(itemXml, "description")),
        image: getAttribute(itemXml, "enclosure", "url") ||
          getAttribute(itemXml, "media:thumbnail", "url") ||
          getTagText(itemXml, "media:thumbnail"),
        author: cleanupText(
          getTagText(itemXml, "dc:creator") ||
            getTagText(itemXml, "creator") ||
            getTagText(itemXml, "note:creatorName"),
        ),
        source: source.title,
        external: true as const,
        tags: source.tags ?? [],
      };
    })
    .filter((post): post is ExternalPost => Boolean(post));
}

function getItemUrl(xml: string): string {
  return getTagText(xml, "link") ||
    getTagText(xml, "url") ||
    getAtomLinkHref(xml);
}

function getTagText(xml: string, tagName: string): string {
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(
    new RegExp(
      `<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`,
      "i",
    ),
  );

  if (!match) {
    return "";
  }

  return match[1]
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function getAttribute(
  xml: string,
  tagName: string,
  attributeName: string,
): string {
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedAttr = attributeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(
    new RegExp(
      `<${escapedTag}\\b[^>]*\\s${escapedAttr}="([^"]+)"[^>]*>`,
      "i",
    ),
  );

  return match?.[1]?.trim() ?? "";
}

function getAtomLinkHref(xml: string): string {
  const links = [...xml.matchAll(/<link\b([^>]*)\/?>/gi)];

  for (const [, attrs] of links) {
    const rel = getAttributeFromAttrs(attrs, "rel");
    const href = getAttributeFromAttrs(attrs, "href");

    if (href && (!rel || rel === "alternate")) {
      return href;
    }
  }

  return "";
}

function getAttributeFromAttrs(attrs: string, attributeName: string): string {
  const escapedAttr = attributeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = attrs.match(new RegExp(`${escapedAttr}="([^"]+)"`, "i"));
  return match?.[1]?.trim() ?? "";
}

function cleanupText(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^!+\s*/g, "")
    .trim();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchOgImageFromPage(url: string): Promise<string> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return "";
    }

    const html = await response.text();
    return getMetaContent(html, "property", "og:image") ||
      getMetaContent(html, "name", "twitter:image");
  } catch (error) {
    console.warn("[external_feeds] og:image fetch failed:", url, error);
    return "";
  }
}

function getMetaContent(
  html: string,
  attrName: string,
  attrValue: string,
): string {
  const escapedValue = attrValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta\\b[^>]*${attrName}=["']${escapedValue}["'][^>]*content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  const reversePattern = new RegExp(
    `<meta\\b[^>]*content=["']([^"']+)["'][^>]*${attrName}=["']${escapedValue}["'][^>]*>`,
    "i",
  );

  const value = pattern.exec(html)?.[1]?.trim() ||
    reversePattern.exec(html)?.[1]?.trim() ||
    "";

  return decodeHtmlEntities(value);
}

function decodeHtmlEntities(value: string): string {
  let decoded = value;

  while (decoded.includes("&amp;")) {
    decoded = decoded.replaceAll("&amp;", "&");
  }

  return decoded
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}
