import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  server: { host: '0.0.0.0', port: 4173 },
});
