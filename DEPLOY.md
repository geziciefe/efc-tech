# GitHub + Cloudflare Pages deployment

This archive has no enclosing `EFC-v1.4` folder. After extraction, `package.json`, `package-lock.json`, `astro.config.mjs`, `src/`, and `public/` should all be at the top level. Upload **the contents** of the extracted folder to the root of your existing GitHub repository. On GitHub's main file list, `package.json` should be visible directly, with no folder click required. Replace the previous nested `EFC-v1.4/` directory if it is still present so there is only one project copy.

In Cloudflare Pages, open your existing project and check **Settings → Build & deployments** (wording may differ slightly):

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Root directory | repository root (blank or `/`) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main`, if this is your GitHub branch |

Save the settings, then push/upload the corrected files to GitHub and retry the deployment. If the old Cloudflare project still has `EFC-v1.4` configured as its root directory, clear that setting when using this flattened archive. This is a static Astro build; no Wrangler configuration or Cloudflare adapter is needed.

Cloudflare reads `.node-version` to use Node 22.16.0. No build secrets are needed for this project. To check the same build locally:

```sh
npm ci
npm run check
npm run build
```

The generated `dist/` folder is the upload output and should not be committed to GitHub. `node_modules/` is also excluded by `.gitignore`.

The contact form uses FormSubmit and requires first-time email activation for `info@efctechnology.com`; see `FORM-AKTIVASYON.txt`. A successful Pages deployment alone does not activate form delivery.
