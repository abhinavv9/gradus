// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { config } from "./assets/config";
export default defineNuxtConfig({
  ssr: true,
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: false },
  site: {
    url: config.hostUrl,
  },
  modules: [
    "@nuxt/content",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt/image",
    "@nuxtjs/sitemap",

    "@nuxtjs/robots",

    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  robots: {
    UserAgent: "*",
    Disallow: "/admin",
    Sitemap: `${config.hostUrl}/sitemap.xml`,
  },
  content: {
    documentDriven: true,
    experimental: {
      clientDb: true,
      search: {
        fields: ["title", "description", "tags"],
      },
    },
    highlight: {
      theme: "light-plus",
      preload: ["lua", "typescript", "javascript"],
    },
    markdown: {
      anchorLinks: {
        depth: 0,
      },
      // tags: {
      //   p: 'MyCustomParagraph'
      // }
    },
  },
  extends: "@nuxt-themes/typography",
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    // firebase: {
    //   gen: 2
    // }
  },
});
