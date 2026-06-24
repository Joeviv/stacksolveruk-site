import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.stacksolveruk.com',
  integrations: [
    react(),
    sitemap({
      // Exclude the private internal working document from the sitemap.
      filter: (page) => !page.includes('/fox4ndstack'),
    })
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});
