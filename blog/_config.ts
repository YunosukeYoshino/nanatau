import lume from "lume/mod.ts";
import blog from "blog/mod.ts";
import { getPagefindCustomRecords } from "./external_feeds.ts";

const site = lume({
  location: new URL("https://blog.nanatau.com/"),
});

const externalPagefindRecords = await getPagefindCustomRecords();

site.use(blog({
  toc: {
    title: "目次",
  },
  pagefind: {
    customRecords: externalPagefindRecords,
  },
}));

site.ignore("index.vto");

site.process("*", (_pages, allPages) => {
  for (let index = allPages.length - 1; index >= 0; index -= 1) {
    if (allPages[index].data.draft) {
      allPages.splice(index, 1);
    }
  }
});

// Custom filter to strip HTML tags
site.filter("stripTags", (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/<[^>]*>/g, "");
});

site.copy("images");

export default site;
