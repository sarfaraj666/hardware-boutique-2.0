(() => {
  'use strict';
  const config = window.HARDWARE_BOUTIQUE_CONFIG || {};
  const instagram = config.instagram || 'https://www.instagram.com/hardware_boutique_2.0/';
  const wa = String(config.whatsappNumber || '').replace(/\D/g, '');
  const email = String(config.businessEmail || '').trim();
  const header = document.querySelector('.site-header');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const isSmall = () => window.matchMedia('(max-width: 850px)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Precise scroll-progress indicator, updated without blocking scroll.
  const progress = document.querySelector('.scroll-progress');
  let scrollQueued = false;
  function paintScroll() {
    scrollQueued = false;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
  }
  function handleScroll() {
    setHeader();
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(paintScroll);
    }
  }

  // Intro and exit transitions: native anchor navigation still works without JS.
  if (!reduceMotion) document.body.classList.add('motion-ready');
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      const target = new URL(link.href, window.location.href);
      if (target.origin !== window.location.origin) return;
      if (!/\.html$/.test(target.pathname)) return;
      const current = new URL(window.location.href);
      if (target.pathname === current.pathname) return;
      if (reduceMotion) return;
      event.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(() => { window.location.href = target.href; }, 420);
    });
  });
  window.addEventListener('pageshow', () => document.body.classList.remove('is-leaving'));


  function setHeader() {
    header?.classList.toggle('is-scrolled', window.scrollY > 28);
  }
  setHeader();
  window.addEventListener('scroll', handleScroll, {passive: true});
  window.addEventListener('resize', paintScroll, {passive: true});
  paintScroll();

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    menuToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (mobileMenu) mobileMenu.inert = !open;
  }
  menuToggle?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('resize', () => {if (!isSmall()) setMenu(false);}, {passive:true});
  window.addEventListener('keydown', e => {if (e.key === 'Escape') setMenu(false);});

  // Lightweight reveal animation; no external animation library needed.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('js-reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.05, rootMargin:'0px 0px -28px 0px'});
    document.querySelectorAll('.reveal, .gallery-item').forEach(el => observer.observe(el));
  }

  document.querySelectorAll('.js-whatsapp').forEach(link => {
    link.href = wa ? `https://wa.me/${wa}?text=${encodeURIComponent('Hello Hardware Boutique 2.0, I would like to enquire about your collections.')}` : instagram;
    link.textContent = wa ? 'WhatsApp ↗' : 'Enquire via Instagram ↗';
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Gallery image preview with keyboard-friendly close and focus restoration.
  const lightbox = document.getElementById('lightbox');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  const bigImg = lightbox?.querySelector('img');
  const caption = lightbox?.querySelector('.lightbox-caption');
  let previousFocus = null;
  function closeLightbox() {
    if (!lightbox || lightbox.getAttribute('aria-hidden') === 'true') return;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    if (bigImg) bigImg.src = '';
    previousFocus?.focus();
  }
  document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!lightbox || !bigImg) return;
      const img = btn.querySelector('img');
      if (!img) return;
      previousFocus = document.activeElement;
      bigImg.src = img.currentSrc || img.src;
      bigImg.alt = img.alt;
      if (caption) caption.textContent = btn.dataset.caption || img.alt;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      closeBtn?.focus();
    });
  });
  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => {if (e.target === lightbox) closeLightbox();});
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'Tab' && lightbox?.getAttribute('aria-hidden') === 'false') {
      e.preventDefault();
      closeBtn?.focus();
    }
  });

  // No pretend backend: submit via real WhatsApp or email when configured.
  // Without those, prepare text for an Instagram DM using the clipboard.
  const form = document.getElementById('enquiry-form');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const contact = String(data.get('contact') || '').trim();
    const interest = String(data.get('interest') || '').trim();
    const message = String(data.get('message') || '').trim();
    const composed = [
      'Hello Hardware Boutique 2.0,',
      `My name is ${name}.`,
      `I'm interested in: ${interest}`,
      `My contact: ${contact}`,
      message ? `Project details: ${message}` : '',
    ].filter(Boolean).join('\n');
    const note = document.getElementById('form-note');
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(composed)}`, '_blank', 'noopener,noreferrer');
      if (note) note.textContent = 'Your enquiry was opened in WhatsApp. Please press Send there to complete it.';
    } else if (email) {
      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('New Website Enquiry — ' + interest)}&body=${encodeURIComponent(composed)}`;
      if (note) note.textContent = 'Your email app has been opened. Please send the message there to complete your enquiry.';
    } else {
      let copied = false;
      try {await navigator.clipboard.writeText(composed);copied=true;} catch (_) {
        const area=document.createElement('textarea');area.value=composed;area.style.position='fixed';area.style.left='-9999px';document.body.appendChild(area);area.select();copied=document.execCommand('copy');area.remove();
      }
      if (copied) {
        if (note) note.textContent = 'Enquiry copied! Instagram is opening — paste the message into a DM to send it.';
        window.open(instagram, '_blank', 'noopener,noreferrer');
      } else {
        if (note) note.textContent = 'Please copy your enquiry manually and send it through our Instagram profile.';
        window.prompt('Copy your enquiry and send it through Instagram:', composed);
      }
    }
  });
})();
