# Historical EFC v1.1 verification — 11 September 2026

## Build and functional verification

- Astro/TypeScript: 37 files checked, 0 errors, 0 warnings, 0 hints.
- Production output: all 20 localized routes plus `404.html` build successfully.
- DOM suite: 3,458 assertions pass across all 21 generated pages, including internal asset/link resolution, in-page anchors, a single H1, metadata, version and both language directions on every route.
- The shared header has the correct transparent/solid configuration on each route, two aligned transparent logo states and no header CTA. The hero has the new EFC PRODUCTS / EFC ÜRÜNLER title and no old CTA links.
- Menu tests verify expanded state, translated open/close labels, background inertness, the stored scroll offset, restored scroll position, Escape closing and history-restoration cleanup. Focus-trap code is retained; actual keyboard order needs rendered-browser review.
- Header state initializes correctly on a scrolled page and resets at the top. WhatsApp clearance is exercised with controlled element rectangles, including its return to the default position after space becomes available.
- All language switches preserve navigation, categories, product routes, enquiry parameters, accessible labels, alt text and placeholders. Only the language preference is persisted; direct TR/EN routes remain available.
- Search, categories, empty/reset state, every product detail, related products, preselected enquiries and home/product tutorial placeholders pass.
- Hero controls pass previous/next wrapping, dots, arrow keys, swipe, default-off autoplay, opt-in timing, hover pause, focus stop, mobile play/pause and reduced motion. Product controls pass desktop rotation/cleanup and mobile scroll/wrapping branches using controlled dimensions.
- Form required fields, email, optional phone, consent placeholder and the local development-state result pass in both languages. No form endpoint or transmission is configured. WhatsApp retains its safe missing-number dialog and product-specific message code.
- Existing Prettier formatting is checked. No separate lint command is configured in this project.

## Visual implementation and browser limitation

All twelve v1.1 comparison screenshots were inspected individually and identified by branding: seven EFC and five Amron. Amron's active header is approximately 132px tall in the supplied screenshot; EFC uses 128px at desktop with a 196px transparent logo, 600-weight navigation, larger spacing and coordinated logo/surface transitions. The old white logo zone, header request button and hero CTA pair are removed.

Home, Products and About use a transparent initial header over their editorial canvas. Product detail, References, Contact and legal placeholders use the same header geometry with a solid surface. The opening hero uses a full viewport canvas and one title, while the new Products introduction positions its heading left of center on a separate replaceable underwater-photo canvas. Existing catalogue, references, videos, CTA and footer structures remain functional.

**Rendered browser QA is not verified.** The supervised preview started successfully, but the provided browser again rejected the local preview with `net::ERR_BLOCKED_BY_CLIENT`. No alternate browser, host, network route or deployment was used to bypass the restriction. This is an environment access limitation, not a claimed website error or a passed visual test.

Consequently, actual browser console output, pixel-level layout, clipping/overflow, final motion appearance, image focal areas, logo contrast over future photography and measured layout shift still require local screen review. DOM tests, CSS inspection and controlled test geometry do not establish those results.

| Viewport          | Implemented composition                                                    | Rendered result |
| ----------------- | -------------------------------------------------------------------------- | --------------- |
| 1920×1080         | 128px header, wide navigation, full-screen hero, three categories/products | Unverified      |
| 1440×900          | Wide desktop header and catalogue with controlled margins                  | Unverified      |
| 1024×768          | 104px header, mobile drawer, tablet catalogue                              | Unverified      |
| 768×1024          | 104px header, tablet product rail, wrapping footer                         | Unverified      |
| 390×844           | 90px header, full-screen title, stacked categories, compact contact tab    | Unverified      |
| 360×800           | 86px header, small-phone spacing and controls, stacked footer              | Unverified      |
| 844×390 landscape | 78px header, compact hero, two-column mobile drawer                        | Unverified      |

The same breakpoints cover both languages. Paired translation cells reserve both languages' dimensions; the logo layers share identical dimensions and alpha geometry. Header height does not change between transparent, hovered or scrolled states. Reduced-motion rules remove entrance/crossfade effects and retain manual slider navigation. The reference strip preserves its continuous equal-width groups, whole-logo edge fading, pause controls and static reduced-motion layout.

For local rendered review, run `npm ci` then `npm run dev`. Check every page in both languages at the sizes above, all slider controls, hover/focus/scroll header states, mobile scroll locking, keyboard order, 200% text zoom, reduced motion, reference looping and WhatsApp clearance. Repeat focal-point and contrast checks when approved photographs are added.

## Assets, content and safe performance pass

- Only the supplied EFC artwork and official Kıyı Emniyeti logo are raster content. No AI images, unrelated stock, Amron photos or screenshots are website assets.
- The new light/active/original-color logos are lossless transparent WebP derivatives of the supplied logo, with identical alpha masks. The original and legacy asset paths are preserved. Light-background rendering is available through `Brand.astro`.
- All missing hero/category/product/company/video photography remains an intentional full-region placeholder. One setting controls editorial draft labels. No company or equipment claims, specifications, contact details or institutions were invented.
- All original product, reference, video, contact, bilingual routing and SEO data structures are retained. Legal routes remain truthful placeholders; the review draft remains `noindex,nofollow`.
- After functional verification, the existing variable fonts were consolidated into two local WOFF2 range declarations. Both subsets are preloaded; optional display avoids a delayed swap. Turkish characters and the SIL OFL are included.
- Static build minification remains enabled. Below-fold images retain lazy loading and reserved dimensions. No UI framework, heavy slider dependency, backend, tracking or embed was added. Scroll work is scheduled once per animation frame without polling.

## Delivery scope

The RAR delivery contains the runnable source, public assets, configuration, package metadata, lockfile, documentation and regression tests. It excludes node_modules, build output, caches, comparison screenshots and old archives. RAR integrity and extracted source hashes are checked before delivery. The site has not been deployed.
