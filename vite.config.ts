import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import autoprefixer from "autoprefixer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svf,woff,woff2,wasm}"],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
