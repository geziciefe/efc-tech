Update v1.4.3: The home page map/contact panel now shows the phone number +90 532 244 75 55 as a click-to-call link in both Turkish and English, instead of the previous "Eklenecek" placeholder. Other changes from v1.4.2 are preserved.

Update: The shared footer on TR/EN pages now shows the +90 532 244 75 55 click-to-call telephone number. The reference logo cleanup and all WhatsApp settings from v1.4.1 are retained.

# EFC Website (v1.4 contact update)

Bilingual, multi-page static product catalogue for EFC Technology. Turkish is the default. This is the v1.3.2 pre-production build and has not been deployed.

## v1.4 contact update

- Added the client-provided `+90 532 244 75 55` number to the TR/EN contact panels, with click-to-call support.
- Configured the shared WhatsApp destination as `https://wa.me/905322447555` for the floating tab and all product-detail WhatsApp buttons. Product-specific and bilingual prefilled messages remain enabled.

## v1.3.2 changelog

- Corrected the swapped Diver Communication and Cables/Power category photographs.
- Added the supplied fourth homepage hero image and enabled a five-second automatic rotation.
- Added the supplied Products introduction, homepage About and About-page imagery.
- Improved spacing and text contrast in the compact homepage About section.

## v1.3.1 changelog

- Returned the homepage About area to the simpler dark split composition while preserving the current typography, navigation and imagery.
- Expanded the standalone About page with a field-focused company section, audience areas and visual links to the three product groups.
- Removed the supporting sentence beside the Educational Videos heading in both languages.

## v1.3 changelog

- Rebuilt the homepage category area as a seamless edge-to-edge 50/50 visual composition: Underwater Imaging fills the left half, while Diver Communication & Control and Cables, Power & Accessories share the right half.
- Added the approved category photographs, removed the introductory category copy and small English section labels, and kept all category destinations bilingual.
- Removed the dark green camera-and-light bracket photograph from the project and retained only the white-background product view.
- Reworked the homepage About section with real imagery, fuller bilingual company copy and three unnumbered service focuses. The About page now uses approved imagery and a complete editorial company/approach layout.
- Retained the compact featured-products grid, single-row educational videos, reference marquee, contact/map composition, header, hero, footer and all existing product routes and interactions.

## v1.1 changelog

- Rebuilt the shared header around Amron's proportions: 128px desktop height, larger 600-weight Montserrat navigation, generous spacing and a fixed transparent opening state. Hover, keyboard focus, scroll and the mobile drawer share a coordinated navy surface and logo crossfade. Internal pages retain the same header geometry with an appropriate solid state.
- Removed the header **Bilgi Al / Request Information** action and the old hero CTA pair. The full-screen opening now presents one title: **EFC ÜRÜNLER / EFC PRODUCTS**, with the working three-slide controls retained.
- Derived transparent light, active blue/light and original-color logo states directly from the supplied artwork. Their alpha geometry is identical; no white box, CSS color filter, distortion or redrawing is used. The footer retains its light-on-ink identity.
- Added the asymmetric underwater products introduction to Home and Products. Its approved-photo slot, focal points and draft label are centralized. Category panels, product data, detail routes and carousel behavior are preserved.
- Replaced the green WhatsApp circle with a compact navy contact tab, subtle entrance, keyboard/hover treatment, mobile safe-area spacing and automatic clearance from nearby action controls. Its existing destination configuration, product messages and safe missing-number dialog are unchanged.
- Refined tablet, small-phone and landscape layouts. The mobile menu locks and restores the exact scroll position, updates its translated open/close label, traps focus and resets correctly after browser history restoration.
- Preserved all 20 localized routes plus 404, catalogue search/filters, local-only forms, references, galleries and educational videos. Added regression checks for the v1.1 header, hero, menu and WhatsApp behavior.
- After the functional pass, consolidated the existing local variable-font declarations and retained both font preloads. Optional font display avoids a late font swap. No runtime dependencies, unapproved photos or generated imagery were added.

## v1.0.1 changelog (retained history)

- Replaced the split corporate composition with an Amron-inspired industrial catalogue: wide navy navigation, a full-width three-slide hero, large visual category panels, borderless featured products and a full-width capability/company band.
- Reworked the references strip, 16:9 educational media, contact CTA and dense ink footer. Applied the same typography, widths and visual hierarchy to Products, every product detail, About, References and Contact.
- Added keyboard/swipe hero controls, opt-in autoplay, pause states, native product scrolling and desktop carousel rotation. Preserved TR/EN routes, search, filters, galleries, local form validation and safe WhatsApp handling.
- Centralized hero/field imagery and focal points in `src/data/visuals.ts`. Category imagery and destinations remain in `src/data/products.ts`. One setting hides draft asset labels.
- Strengthened mobile menu focus handling, reduced-motion support and localized accessibility labels. Fixed mobile hero Play/Pause taps and reference-strip spacing; removed empty gallery thumbnail boxes.
- Retained the supplied EFC logo and verified institution artwork. All missing photography uses full-region CSS placeholders. No AI, stock or Amron photographs were added.
- Added local font preloads after the functional pass. Production assets remain static and minified, with no new runtime dependency.

Build and DOM interaction checks pass. **Rendered browser QA remains unverified because the provided browser blocks the preview.** See `QA-NOTES.md` for the precise scope and required local screen review.

## Run locally

Install **Node.js 22.12 or later**. Extract the complete archive, open a terminal in the `EFC-v1.3.2` directory and run:

```sh
npm ci
npm run dev
```

Open `http://localhost:4173`. On Windows PowerShell, if execution policy prevents `npm`, use `npm.cmd ci` and `npm.cmd run dev`.

Build and view the production version:

```sh
npm run check
npm run build
npm run preview
```

`dist/` is generated by the build. Neither it nor `node_modules/` is included in the archive. The lockfile is included for repeatable installation. No account, API key, database, or environment variable is needed.

## Architecture

Astro + TypeScript, static output, custom responsive CSS. No client UI framework is required. Small vanilla TypeScript modules handle language switching, search/filtering, the mobile menu, local validation, gallery controls, carousels and WhatsApp.

| Content                                                                           | Edit here                    |
| --------------------------------------------------------------------------------- | ---------------------------- |
| Logo, contact details, WhatsApp, legal URLs, version, draft-label toggle          | `src/data/site.ts`           |
| Hero slides, products intro, capability image, ratios, focal points and autoplay  | `src/data/visuals.ts`        |
| Navigation                                                                        | `src/data/site.ts`           |
| UI translations and provisional company copy                                      | `src/data/translations.ts`   |
| Categories, products, image galleries, model numbers, specifications, PDF manuals | `src/data/products.ts`       |
| Reference institutions, original logos, source URLs                               | `src/data/references.ts`     |
| Educational videos, product relationships, thumbnails, duration, URL/provider     | `src/data/videos.ts`         |
| Existing catalogue styling                                                        | `src/styles/global.css`      |
| v1.1 header, hero, product intro, logo states, WhatsApp and responsive rules      | `src/styles/chrome.css`      |
| Reusable transparent/light/color logo rendering                                   | `src/components/Brand.astro` |
| Reusable page sections and templates                                              | `src/components/`            |
| Shared header, footer and metadata                                                | `src/layouts/Layout.astro`   |
| Real static page generation                                                       | `src/pages/[...path].astro`  |
| Language, menu, catalogue, form, gallery and WhatsApp interactions                | `src/scripts/client.ts`      |
| Hero, product carousel and reference edge behavior                                | `src/scripts/carousels.ts`   |
| Header scroll state and floating contact clearance                                | `src/scripts/chrome.ts`      |

Routes: `/`, `/products/`, `/products/product-01/`, `/products/product-02/`, `/products/product-03/`, `/about/`, `/references/`, `/contact/`, `/privacy/`, `/kvkk/`. Each has an English route under `/en/`. A separate `404.html` is included in builds.

TR/EN switches instantly without fetching another document. Paired translation cells reserve the dimensions of both languages to avoid language-driven reflow. Links and metadata update with the chosen language. Direct localized URLs work independently of saved preferences. The selected language is saved locally; returning to `/` restores English when previously selected. No form values are persisted.

## Add real content

### Photography and draft labels

Set `site.draft.showAssetLabels` to `false` to hide all editorial image labels and the catalogue draft note. This does not hide missing legal/contact/specification notices, which must stay truthful until content is supplied.

For each item in `heroSlides`, set `image.src` to an approved local image, write bilingual `alt`, and adjust `focalPoint` and `mobileFocalPoint`. The entire hero becomes the photograph; no component redesign is needed. The first slide retains the existing `site.heroImage` input for compatibility. Set `productsIntroImage.src` in the same file to add the underwater photograph shared by Home and Products. `capabilityImage` similarly uses `site.companyImage` and currently also supplies the About image zone. Give About its own `EditorialImage` record later if desired.

The primary hero title is the `heroProducts` key in `src/data/translations.ts`. Slide titles remain in `heroSlides` for pagination and accessible announcements; the old CTA pair and supporting copy are no longer rendered.

Hero autoplay is off initially. Visitors can start it using the play control. Set `heroSettings.autoplay` and `interval` centrally to change that default. Keyboard focus, pointer interaction and reduced-motion preferences stop automatic movement. Previous/next buttons, dots and horizontal swipes always remain available.

Category entries accept `image`, `path`, `focalPoint`, `mobileFocalPoint`, `assetSubject` and `tone`. Hero/field assets are composed for wide landscape photographs with a separate mobile focal point; use the ratio/subject guidance shown in each draft area. Product photography uses contain-fit, while editorial photography uses cover-fit.

### Product catalogue

The three numbered records are **draft catalogue slots**, not confirmed EFC models. All model numbers, image arrays, specifications and documents are intentionally empty. Replace these records as the client confirms the actual catalogue; each product added to the collection generates both language pages at build time.

Example product fields:

```ts
images: [
  { src: '/assets/products/confirmed-photo.webp', alt: { tr: 'Doğrulanmış ürün adı', en: 'Confirmed product name' } }
],
specifications: [
  { label: { tr: 'Doğrulanmış özellik', en: 'Confirmed specification' }, value: { tr: 'Müşteri verisi', en: 'Client-supplied value' } }
],
documents: [
  { title: { tr: 'Kullanım kılavuzu', en: 'User manual' }, url: '/assets/manuals/confirmed-manual.pdf' }
]
```

Put approved assets in `public/assets/`. Product images use contain-fit; hero/company images use cover-fit. Use high-resolution approved photographs with stable proportions. The supplied logo original is preserved. `efc-logo.webp` is retained for compatibility. The v1.1 `site.logos` paths point to three proportional transparent states derived from the same supplied artwork. `Brand.astro` renders synchronized layers for the header, a light state for the footer and an original-color state for future light backgrounds. The favicon is derived from the same original asset.

Set `site.contact.whatsapp` to the actual international number, digits including the country code. Until populated, both floating and product buttons show a safe explanatory dialog. Product-page messages automatically use the active product and language.

For each video, populate `thumbnail`, `duration`, `url` and `provider`. Confirmed URLs open the real video; missing videos display Coming Soon. Product pages select videos by `videoIds`. The current implementation supports YouTube, Vimeo and self-hosted video links without third-party embeds or tracking. An embedded player can be introduced after actual videos and privacy requirements are confirmed.

Reference logos are unmodified. The two naval bases use text placeholders because exact official emblems were not verified. Additional records in the same file populate both the homepage strip and References page. Add bilingual `projectDescription` when approved.

## Form and legal state

The enquiry form is intentionally local-only. It validates required fields, email, optional phone and the draft checkbox, then explicitly reports that nothing was sent or saved. Submission is prevented in JavaScript; the form uses non-network `method="dialog"` and a disabled-until-initialized submit button as safeguards. There is no endpoint, CRM, analytics, email integration or live privacy consent collection.

The privacy and KVKK routes are clearly marked placeholders, not legal documents. SEO titles, descriptions, HTML languages and language alternates are prepared. Draft pages are intentionally `noindex,nofollow`; replace this after content/legal approval and add the real domain/canonical URLs and sitemap before launch.

## Verification

```sh
npm run check
npm test
```

The test suite builds all pages and checks internal links/assets, both language switches on every route, localized accessibility labels, filters/search/empty state, product enquiries, mobile-menu state and Escape behavior, local form validation, and safe WhatsApp handling. It also exercises hero pagination/wrapping/swiping, autoplay/pause/reduced motion, and both desktop rotation and mobile scrolling branches of the product carousel. Controlled dimensions in those interaction tests do **not** emulate browser CSS layout or replace visual testing.

See `QA-NOTES.md` for the exact verification performed and the browser limitation. See `ASSET-SOURCES.md` for attachment provenance, the reference-font identification and official institution sources.
