// @ts-check

import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import yaml from '@rollup/plugin-yaml';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Enable Svelte to support Svelte components.
  integrations: [svelte(), icon()],

  vite: {
    plugins: [tailwindcss(), yaml()],
  },
});