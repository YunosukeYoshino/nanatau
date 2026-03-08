import lume from "lume/mod.ts";
import blog from "blog/mod.ts";

const site = lume({
  location: new URL("https://blog.nanatau.com/"),
});

site.use(blog({
  toc: {
    title: "目次",
  }
}));

// Custom filter to strip HTML tags
site.filter("stripTags", (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/<[^>]*>/g, "");
});

site.copy("images");

export default site;
