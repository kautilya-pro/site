// @ts-check
import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";
import svgo from "vite-plugin-svgo";

// https://astro.build/config
export default defineConfig({
  site: "https://kautilya.pro",
  output: "server",
  adapter: cloudflare({
    imageService: "compile",
  }),
  env: {
    schema: {
      PUBLIC_GA_TRACKING_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
        default: "1x00000000000000000000AA",
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
        default: "1x0000000000000000000000000000000AA",
      }),
      PUBLIC_GISCUS_REPO: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_GISCUS_REPO_ID: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_GISCUS_CATEGORY: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_GISCUS_CATEGORY_ID: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    partytown({
      config: { forward: ["dataLayer.push"] },
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      svgo({
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      }),
    ],
  },
});
