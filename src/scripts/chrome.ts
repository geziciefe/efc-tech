/** Shared v1.1 navigation state and clearance for the compact contact tab. */
export function initializeChrome() {
  const header = document.querySelector<HTMLElement>('.site-header');
  const contact = document.querySelector<HTMLElement>('.floating-wa');
  const controls = Array.from(
    document.querySelectorAll<HTMLElement>(
      'main .button, main .icon-button, main [data-hero-dot], .footer-bottom a',
    ),
  );
  let queued = false;
  let lift = 0;
  let held = false;

  function update() {
    queued = false;
    if (document.body.classList.contains('menu-open')) return;
    // One stable height throughout; only the surface and logo crossfade.
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    if (!contact || held) return;
    const box = contact.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const bottom = parseFloat(getComputedStyle(contact).bottom) || 0;
    const base = window.innerHeight - bottom - box.height;
    const obstacles = controls
      .map((control) => control.getBoundingClientRect())
      .filter((r) => r.width && r.height && r.right > box.left - 12 && r.left < box.right + 12);
    let top = base;
    // Clear actual buttons and links, including the mobile hero controls.
    // Reads are batched before the single style write; no polling or animation loop.
    for (let i = 0; i <= obstacles.length; i++) {
      const overlap = obstacles.find((r) => r.bottom > top - 12 && r.top < top + box.height + 12);
      if (!overlap) break;
      top = overlap.top - box.height - 12;
    }
    const next = Math.max(0, base - top);
    if (next !== lift) {
      lift = next;
      contact.style.setProperty('--wa-lift', `${lift}px`);
    }
  }
  function schedule() {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  }
  // Never move a target while the user is about to activate it.
  contact?.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') held = true;
  });
  contact?.addEventListener('pointerleave', () => {
    held = contact === document.activeElement;
    schedule();
  });
  contact?.addEventListener('focus', () => (held = true));
  contact?.addEventListener('blur', () => {
    held = false;
    schedule();
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  document.addEventListener('efc:language', schedule);
  document.addEventListener('efc:menu', schedule);
  document.fonts?.ready.then(schedule);
  update();
}
