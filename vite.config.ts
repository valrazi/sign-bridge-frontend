import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";
import { fileURLToPath } from "url";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "vue-i18n"],
      dirs: ["./src/store"],
    }),
    Component({
      dirs: ["./src/components"],
    }),
    VueI18n({
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
