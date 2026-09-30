import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  server: { host: 'localhost', port: 4173 },
});
