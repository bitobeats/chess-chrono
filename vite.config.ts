import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import autoprefixer from "autoprefixer";
import { VitePWA } from "vite-plugin-pwa";
import devtools from "solid-devtools/vite";

export default defineConfig({
  base: "/chess-clock-solid/",
  build: {
    target: "ES2022",
    assetsInlineLimit: 0,
  },
  plugins: [
    solid(),
    devtools(),
    VitePWA({
      registerType: "prompt",
      injectRegister: "auto",
      manifest: {
        name: "Chess Clock",
        short_name: "ChessClock",
        description: "An offline chess clock app. Forever free.",
        theme_color: "#1e1e1e",
        background_color: "#1e1e1e",
        categories: ["tools", "utilities", "chess", "clock"],
        icons: [
          {
            src: "assets-pwa/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "assets-pwa/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "assets-pwa/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "assets-pwa/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svf,woff,woff2,wasm,caf,webm}"],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
