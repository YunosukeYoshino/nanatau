import { getExternalPosts } from "./external_feeds.ts";

export const layout = "layouts/archive_result.vto";

export default async function* ({ search, i18n, paginate }) {
  const localPosts = search.pages("type=post", "date=desc").map((post) => ({
    ...post,
    source: "Blog",
    external: false,
  }));
  const externalPosts = await getExternalPosts();
  const mergedPosts = [...localPosts, ...externalPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const tags = uniqueValues(mergedPosts.flatMap((post) => post.tags ?? []));

  for (const tag of tags) {
    const url = (n) => (n === 1) ? `/archive/${tag}/` : `/archive/${tag}/${n}/`;
    const pages = mergedPosts.filter((post) => post.tags?.includes(tag));

    for (const page of paginate(pages, { url, size: 10 })) {
      yield {
        ...page,
        title: `${i18n.search.by_tag}  “${tag}”`,
        type: "tag",
        tag,
      };
    }
  }

  const authors = uniqueValues(
    mergedPosts
      .map((post) => post.author)
      .filter(Boolean),
  );

  for (const author of authors) {
    const url = (n) =>
      (n === 1) ? `/author/${author}/` : `/archive/${author}/${n}/`;
    const pages = mergedPosts.filter((post) => post.author === author);

    for (const page of paginate(pages, { url, size: 10 })) {
      yield {
        ...page,
        title: `${i18n.search.by_author} ${author}`,
        type: "author",
        author,
      };
    }
  }
}

function uniqueValues(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "ja"));
}
