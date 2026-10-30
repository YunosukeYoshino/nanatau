import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@showcase-assets": new URL("../images/concept/showcase", import.meta.url).pathname,
      "@avatar-videos/face-neck-motion.mp4": new URL("../models/avatar-v1/charakuru/releases/k6/motion.mp4", import.meta.url).pathname,
      "@avatar-videos/dance-tetris-expressions.mp4": new URL("../models/avatar-v1/charakuru/dances/tetris-expressions/motion.mp4", import.meta.url).pathname,
    },
  },
});
