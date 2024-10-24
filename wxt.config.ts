import { defineConfig } from "wxt";
import path from "path";

export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
  manifest: {
    name: "GregMat Buddy",
    permissions: ["storage"],
  },
  vite: () => ({
    resolve: {
      alias: {
        "@/": path.resolve("./src/"),
      },
    },
  }),
});
