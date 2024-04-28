import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import autoprefixer from "autoprefixer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      injectRegister: "script-defer",
      manifest: {
        name: "Chess Clock",
        short_name: "ChessClock",
        theme_color: "transparent",
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
