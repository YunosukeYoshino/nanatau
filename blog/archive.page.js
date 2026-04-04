import { getExternalPosts } from "./external_feeds.ts";

export const layout = "layouts/archive.vto";

export default async function* ({ search, paginate, i18n }) {
  const localPosts = search.pages("type=post", "date=desc").map((post) => ({
    ...post,
    source: "Blog",
    external: false,
  }));
  const externalPosts = await getExternalPosts();
  const mergedPosts = [...localPosts, ...externalPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const data of paginate(mergedPosts, { url, size: 10 })) {
    if (data.pagination.page === 1) {
      data.menu = {
        visible: true,
        order: 1,
      };
    }

    yield {
      ...data,
      title: i18n.nav.archive_title,
      image: "/og/home.png",
    };
  }
}

function url(n) {
  if (n === 1) {
    return "/archive/";
  }

  return `/archive/${n}/`;
}
