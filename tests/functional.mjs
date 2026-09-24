import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import { build } from 'esbuild';

const root = process.cwd();
const dist = path.join(root, 'dist');
const files = fs.readdirSync(dist, { recursive: true }).filter((file) => file.endsWith('.html'));
let assertions = 0;

function check(condition, message) {
  assert.ok(condition, message);
  assertions++;
}

function read(route = '/') {
  const file =
    route === '/404/' ? '404.html' : route.replace(/^\//, '').replace(/\?.*$/, '') + 'index.html';
  return fs.readFileSync(path.join(dist, file), 'utf8');
}

function documentFor(route = '/') {
  return new JSDOM(read(route), { url: `https://efc.test${route}` }).window.document;
}

check(files.length === 39, '38 localized routes plus 404 are built');

for (const route of ['/', '/en/']) {
  const homepage = documentFor(route);
  const footerPhone = homepage.querySelector('.site-footer .footer-phone');
  check(footerPhone?.textContent.trim() === '+90 532 244 75 55', `${route}: footer shows phone`);
  check(footerPhone?.getAttribute('href') === 'tel:905322447555', `${route}: footer phone is callable`);
  // Regression: the homepage map/contact panel is separate from the global footer.
  const homepagePhone = homepage.querySelector('.home-contact-list > div:first-child dd .home-contact-phone');
  check(homepagePhone?.textContent.trim() === '+90 532 244 75 55', `${route}: home contact panel shows phone`);
  check(homepagePhone?.getAttribute('href') === 'tel:905322447555', `${route}: home contact panel phone is callable`);
  check(!homepage.querySelector('.home-contact-list > div:first-child dd .pending'), `${route}: home contact panel has no phone placeholder`);
  const homepageEmail = homepage.querySelector('.home-contact-list a[href^="mailto:"]');
  check(homepageEmail?.textContent.trim() === 'info@efctechnology.com', `${route}: homepage shows the new email`);
  check(homepage.querySelector('.site-footer a[href="mailto:info@efctechnology.com"]'), `${route}: footer has the new email`);
}

for (const route of ['/contact/', '/en/contact/']) {
  const contact = documentFor(route);
  const phoneLink = contact.querySelector('.contact-aside a[href^="tel:"]');
  check(phoneLink?.textContent.trim() === '+90 532 244 75 55', `${route}: visible contact number`);
  check(phoneLink?.getAttribute('href') === 'tel:905322447555', `${route}: callable contact number`);
  const emailLink = contact.querySelector('.contact-aside a[href^="mailto:"]');
  check(emailLink?.textContent.trim() === 'info@efctechnology.com', `${route}: contact panel displays new email`);
  check(contact.querySelector('#enquiry-form')?.getAttribute('action') ===
    'https://formsubmit.co/ajax/info@efctechnology.com', `${route}: form delivers to new email endpoint`);
}


for (const file of files) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  const doc = new JSDOM(html).window.document;
  check(doc.querySelectorAll('h1').length === 1, `${file}: one main heading`);
  check(
    doc.querySelector('meta[name=description]')?.content.length > 0,
    `${file}: SEO description`,
  );
  check(doc.documentElement.lang === (file.startsWith('en/') ? 'en' : 'tr'), `${file}: language`);
  check(!html.includes('@gmail.com'), `${file}: no obsolete email remains`);
  check([...doc.querySelectorAll('a[href^="mailto:"]')].every((link) =>
    link.getAttribute('href') === 'mailto:info@efctechnology.com' &&
    link.textContent.trim() === 'info@efctechnology.com',
  ), `${file}: all email links display and open the new address`);
  check(doc.body.dataset.version === '1.5.0', `${file}: current version`);
  check(!html.includes('camera-light-bracket-dark'), `${file}: removed dark bracket visual`);

  for (const element of doc.querySelectorAll(
    'a[href],img[src],script[src],link[rel=stylesheet],link[rel=icon]',
  )) {
    const url = element.getAttribute('href') ?? element.getAttribute('src');
    check(url !== '#', `${file}: no dead hash link`);
    if (!url || /^(https?:|mailto:|tel:|#)/.test(url)) continue;
    const pathname = decodeURI(url.split(/[?#]/)[0]);
    const target = pathname.endsWith('/')
      ? path.join(dist, pathname, 'index.html')
      : path.join(dist, pathname);
    check(fs.existsSync(target), `${file}: local destination exists: ${url}`);
  }

  check(
    [...doc.querySelectorAll('iframe')].every((frame) =>
      frame.getAttribute('src')?.startsWith('https://www.google.com/maps'),
    ),
    `${file}: only the approved location map may be embedded`,
  );
}

const home = documentFor('/');
check(home.querySelectorAll('[data-hero-slide]').length === 4, 'homepage hero has four slides');
check(
  home.querySelector('[data-hero]')?.dataset.autoplay === 'true',
  'homepage hero autoplay is on',
);
check(home.querySelectorAll('.category-panel').length === 3, 'homepage has three category panels');
check(
  home.querySelectorAll('.video-card').length === 3,
  'homepage videos stay in one three-item row',
);
check(!home.body.textContent.includes('Ürünleri daha yakından tanıyın.'), 'video subtitle removed');
check(home.querySelector('.capability-band'), 'homepage has the simple About band');
check(!home.querySelector('.about-focus-grid'), 'homepage detailed About grid removed');

const homeEn = documentFor('/en/');
check(
  !homeEn.body.textContent.includes('Get to know the products.'),
  'English video subtitle removed',
);

for (const route of ['/about/', '/en/about/']) {
  const about = documentFor(route);
  check(about.querySelector('.about-field'), `${route}: field section`);
  check(about.querySelectorAll('.about-audiences li').length === 4, `${route}: audience areas`);
  check(about.querySelectorAll('.approach-grid article').length === 3, `${route}: approach cards`);
  check(about.querySelectorAll('.about-ranges-grid > a').length === 3, `${route}: product areas`);
}

const bundle = (
  await build({
    entryPoints: ['src/scripts/client.ts'],
    bundle: true,
    write: false,
    format: 'iife',
    platform: 'browser',
  })
).outputFiles[0].text;
const errors = [];
const openedWhatsApp = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', (error) => errors.push(error.message));
const dom = new JSDOM(read('/'), {
  url: 'https://efc.test/',
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole,
  beforeParse(window) {
    window.scrollTo = ({ top = 0, left = 0 } = {}) => {
      window.scrollY = top;
      window.scrollX = left;
    };
    window.matchMedia = () => ({
      matches: false,
      addEventListener() {},
      removeEventListener() {},
    });
    window.open = (...args) => { openedWhatsApp.push(args); return null; };
    window.HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', '');
    };
    window.HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open');
    };
  },
});
dom.window.eval(bundle);
const live = dom.window.document;

live.querySelector('[data-lang=en]').click();
check(live.documentElement.lang === 'en', 'language changes without reload');
check(dom.window.location.pathname === '/en/', 'language switch updates the route');
check(
  live.querySelector('.desktop-nav [data-route="/products/"]').href ===
    'https://efc.test/en/products/',
  'navigation follows the selected language',
);

live.querySelector('[data-hero-next]').click();
check(live.querySelector('[data-hero]').dataset.activeSlide === '1', 'hero next control works');

live.querySelector('.menu-button').click();
check(!live.querySelector('#mobile-nav').hidden, 'mobile menu opens');
check(live.querySelector('main').inert, 'open menu makes the page background inert');
live.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape' }));
check(live.querySelector('#mobile-nav').hidden, 'Escape closes the mobile menu');

live.querySelector('.floating-wa').click();
check(openedWhatsApp.length === 1, 'floating WhatsApp button opens WhatsApp');
check(
  openedWhatsApp[0][0].startsWith('https://wa.me/905322447555?text='),
  'floating WhatsApp button uses the configured number',
);
check(!live.querySelector('dialog').hasAttribute('open'), 'configured number bypasses missing-number dialog');
check(errors.length === 0, `no DOM execution errors: ${errors.join('; ')}`);
dom.window.close();

console.log(
  `PASS: ${assertions} checks across ${files.length} static pages, both languages and primary interactions.`,
);
