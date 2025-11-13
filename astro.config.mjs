// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

const deploy = import.meta.env.PROD
  ? { site: `https://liputenpo.org/` }
  : { site: "http://localhost/" };

// https://astro.build/config
export default defineConfig({
  ...deploy,
  integrations: [mdx()],
});
