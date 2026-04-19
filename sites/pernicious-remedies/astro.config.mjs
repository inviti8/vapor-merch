import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://pernicious.co',
  output: 'server',
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [mdx(), sitemap(), svelte()],
  vite: {
    plugins: [tailwindcss()],
  },
});
