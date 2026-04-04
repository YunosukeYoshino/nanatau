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
];

let externalPostsPromise: Promise<ExternalPost[]> | undefined;

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
      post.author,
      post.tags.join(" "),
    ]
      .filter(Boolean)
      .join("\n\n"),
    meta: {
      title: post.title,
      source: post.source,
      author: post.author ?? "",
    },
    filters: {
      filter: post.tags,
      ...(post.author ? { author: [post.author] } : {}),
    },
    sort: {
      date: post.date.toISOString(),
    },
  }));
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
      return parseFeed(source, xml);
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

function parseFeed(source: ExternalFeedSource, xml: string): ExternalPost[] {
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/g)]
    .map(([itemXml]) => {
      const title = getTagText(itemXml, "title");
      const url = getTagText(itemXml, "link");
      const pubDate = getTagText(itemXml, "pubDate");

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
        image: getAttribute(itemXml, "enclosure", "url"),
        author: cleanupText(
          getTagText(itemXml, "dc:creator") || getTagText(itemXml, "creator"),
        ),
        source: source.title,
        external: true as const,
        tags: source.tags ?? [],
      };
    })
    .filter((post): post is ExternalPost => Boolean(post));
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

function cleanupText(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^!+\s*/g, "")
    .trim();
}
