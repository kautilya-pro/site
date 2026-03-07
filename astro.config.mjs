// @ts-check
import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

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
    plugins: [tailwindcss()],
  },
});
