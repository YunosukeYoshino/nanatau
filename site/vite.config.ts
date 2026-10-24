import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@showcase-assets": new URL("../images/concept/showcase", import.meta.url).pathname,
      "@avatar-videos": new URL("../models/avatar-v1/charakuru/videos", import.meta.url).pathname,
    },
  },
});
