import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@showcase-assets": new URL("../images/concept/showcase", import.meta.url).pathname,
    },
  },
});
