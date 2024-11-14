import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";
import { fileURLToPath } from "url";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import path from "path";
import vueJsx from '@vitejs/plugin-vue-jsx'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    cssInjectedByJsPlugin(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "vue-i18n"],
      dirs: ["./src/store", "./src/api", "./src/composables"],
    }),
    Component({
      dirs: ["./src/components"],
    }),
    VueI18n({
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/sdk.js`,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
