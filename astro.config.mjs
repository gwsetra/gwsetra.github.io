import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gwsetra.github.io',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
