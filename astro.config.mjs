// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://modh07ltd.co.uk',
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      lastmod: new Date('2026-08-18'),
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        if (item.url === 'https://modh07ltd.co.uk') {
          item.url = 'https://modh07ltd.co.uk/';
        }
        return item;
      },
    }),
  ],

    adapter: cloudflare({
      imageService: 'compile',
      prerenderEnvironment: 'node',
    }),
    output: 'static',
  });