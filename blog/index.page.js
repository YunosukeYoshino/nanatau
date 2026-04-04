import { getExternalPosts } from "./external_feeds.ts";

export const layout = "layouts/base.vto";

export default async function ({ search }) {
  const localPosts = search.pages("type=post", "date=desc").map((post) => ({
    ...post,
    source: "Blog",
    external: false,
  }));
  const externalPosts = await getExternalPosts();
  const mergedPosts = [...localPosts, ...externalPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return renderHome(mergedPosts);
}

function renderHome(posts) {
  const articles = posts.map((post) => renderPost(post)).join("\n");

  return `
<header class="page-header">
  <div class="search" id="search"></div>
</header>

<section class="section-header-custom">
  <h2 class="section-title-custom">最新の記事 📝</h2>
</section>

<section class="postList">
${articles}
</section>

<hr>

<p class="archive-link-custom">More posts can be found in <a href="/archive/">the archive</a> →</p>
`;
}

function renderPost(post) {
  const hrefAttrs = post.external
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
  const tags = (post.tags ?? [])
    .map((tag) =>
      `<a data-pagefind-filter="filter" class="badge" href="/archive/${
        encodeURIComponent(tag)
      }/">${escapeHtml(tag)}</a>`
    )
    .join("");
  const excerpt = post.excerpt
    ? `<p class="post-excerpt body">${
      escapeHtml(toPlainExcerpt(post.excerpt))
    }</p>`
    : "";
  const shouldShowExcerpt = !(post.external && post.image);
  const image = post.external && post.image
    ? `
    <a href="${escapeAttribute(post.url)}" class="post-media"${hrefAttrs}>
      <img src="${
      escapeAttribute(post.image)
    }" alt="" class="post-thumb" loading="lazy" decoding="async">
    </a>`
    : "";
  const readingInfo = post.readingInfo?.minutes
    ? `<p>${post.readingInfo.minutes} min read</p>`
    : "";
  const date = post.date
    ? `<p><time datetime="${new Date(post.date).toISOString()}">${
      formatDate(post.date)
    }</time></p>`
    : "";
  const cta = post.external ? "記事を読む" : "Continue reading →";

  return `
  <article class="post">
    ${image}
    <header class="post-header">
      <h2 class="post-title">
        <a href="${escapeAttribute(post.url)}"${hrefAttrs}>
          ${escapeHtml(post.title || post.url)}
        </a>
      </h2>

      <div class="post-details">
        ${date}
        ${readingInfo}
        <div class="post-tags">${tags}</div>
      </div>
    </header>

    ${shouldShowExcerpt ? excerpt : ""}

    <a href="${escapeAttribute(post.url)}" class="post-link"${hrefAttrs}>
      ${cta}
    </a>
  </article>`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function toPlainExcerpt(value) {
  return String(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~#>-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
