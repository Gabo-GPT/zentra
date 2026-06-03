/**
 * ZENTRA — Landing (optimizado: menos listeners, caché modal, imágenes bajo demanda)
 */

const ZENTRA_CONFIG = {
  whatsappNumber: '573178343978',
  whatsappMessage: 'Hola, me interesa solicitar una cotización con ZENTRA.',
  contactEmail: 'contacto@zentra.co',
  contactPhone: '+57 317 834 3978',
  contactPhoneTel: '+573178343978',
};

const SERVICE_CHECK_ICON =
  '<svg class="service-modal-guarantees__icon h-4 w-4 shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>';

const SERVICE_CATEGORIES = {
  soporte: {
    title: 'Soporte Técnico',
    description: 'Continuidad operativa para tu parque tecnológico con respuesta ágil en Bogotá.',
    context:
      'Aplicamos protocolos de mantenimiento documentados, repuestos de calidad y configuración en red alineada a buenas prácticas. Tu infraestructura de cómputo e impresión queda estable, trazable y lista para el día a día de la oficina.',
    services: [
      { title: 'Mantenimiento de equipos de cómputo', text: 'Preventivo y correctivo para PCs, portátiles y estaciones de trabajo.' },
      { title: 'Mantenimiento de impresoras', text: 'Láser e inyección: diagnóstico, repuestos y configuración en red.' },
    ],
    gallery: [
      { src: 'img/mantenimiento_equipos_computo.png', alt: 'Mantenimiento de equipos de cómputo en sitio' },
      { src: 'img/servicio-impresoras.png', alt: 'Servicio técnico de impresoras en oficina' },
      { src: 'img/soc_dvr.png', alt: 'Soporte a estaciones y equipos de monitoreo' },
      { src: 'img/rack_cableado.png', alt: 'Organización de equipos en rack' },
    ],
    guarantees: [
      'Diagnóstico técnico con informe de hallazgos',
      'Repuestos y consumibles de alta durabilidad',
      'Tiempos de respuesta acordados por contrato',
      'Configuración segura en red local (LAN)',
    ],
  },
  redes: {
    title: 'Infraestructura de Redes',
    description: 'Conectividad diseñada con estándares internacionales y cableado certificado.',
    context:
      'Implementamos estándares internacionales (TIA/EIA), cableado certificado Cat6/Cat6A y fibra óptica GPON con pruebas de certificación en cada punto. Tu red escala sin cuellos de botella y con trazabilidad de cada enlace.',
    services: [
      { title: 'Redes GPON', text: 'Fibra óptica de alto rendimiento para conectividad estable.' },
      { title: 'Enlaces P2P', text: 'Conexión dedicada o inalámbrica entre sedes.' },
      { title: 'Redes LAN', text: 'Cableado estructurado, switches y segmentación.' },
      { title: 'Redes WAN', text: 'VPN, enlaces de área amplia e interconexión multi-sede.' },
    ],
    gallery: [
      { src: 'img/rack_cableado.png', alt: 'Rack con cableado estructurado certificado' },
      { src: 'img/soc_dvr.png', alt: 'Centro de operaciones y red de monitoreo' },
      { src: 'img/camaras_exterior.png', alt: 'Despliegue de infraestructura en exterior' },
      { src: 'img/servicio-videovigilancia.png', alt: 'Integración de red con sistemas IP' },
    ],
    guarantees: [
      'Certificación de puntos y pruebas Fluke',
      'Materiales de alta resistencia y categoría certificada',
      'Documentación de red (as-built) entregada al cliente',
      'Diseño escalable GPON, LAN y WAN',
    ],
  },
  electricas: {
    title: 'Instalaciones Eléctricas',
    description: 'Proyectos eléctricos con cumplimiento normativo RETIE y seguridad industrial.',
    context:
      'Diseñamos e instalamos sistemas eléctricos con canalización profesional, tableros normalizados y materiales de alta capacidad. Cada proyecto cumple RETIE y buenas prácticas de seguridad para entornos residenciales, comerciales e industriales.',
    services: [
      { title: 'Proyectos residenciales', text: 'Tableros, tomas, iluminación y puesta a tierra en viviendas y conjuntos.' },
      { title: 'Proyectos empresariales', text: 'Cuadros eléctricos, potencia, iluminación LED y ampliaciones comerciales.' },
      { title: 'Proyectos industriales', text: 'Media y baja tensión, tableros de control y mantenimiento en planta.' },
    ],
    gallery: [
      { src: 'img/rack_cableado.png', alt: 'Canalización y organización de cableado de potencia' },
      { src: 'img/camaras_exterior.png', alt: 'Instalación eléctrica en entorno exterior' },
      { src: 'img/soc_dvr.png', alt: 'Tablero y sala técnica empresarial' },
      { src: 'img/mantenimiento_equipos_computo.png', alt: 'Mantenimiento eléctrico en sala de equipos' },
    ],
    guarantees: [
      'Cumplimiento normativo RETIE',
      'Materiales de alta resistencia y calibre certificado',
      'Pruebas de continuidad y aislamiento documentadas',
      'Proyectos alineados a estándares ISO de gestión',
    ],
  },
};

const detailHtmlCache = Object.create(null);
let defaultWhatsAppUrl = '';

const $ = (id) => document.getElementById(id);

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildWhatsAppUrl(customMessage) {
  const text = encodeURIComponent(customMessage || ZENTRA_CONFIG.whatsappMessage);
  return `https://wa.me/${ZENTRA_CONFIG.whatsappNumber}?text=${text}`;
}

function applyWhatsAppLinks() {
  defaultWhatsAppUrl = buildWhatsAppUrl();
  for (const id of ['nav-whatsapp', 'mobile-whatsapp', 'hero-whatsapp', 'footer-cta-whatsapp', 'footer-whatsapp', 'fab-whatsapp']) {
    const el = $(id);
    if (el) el.href = defaultWhatsAppUrl;
  }
}

function applyContactInfo() {
  const email = $('contact-email');
  const phone = $('contact-phone');
  if (email) {
    email.href = `mailto:${ZENTRA_CONFIG.contactEmail}`;
    email.textContent = ZENTRA_CONFIG.contactEmail;
  }
  if (phone) {
    phone.href = `tel:${ZENTRA_CONFIG.contactPhoneTel.replace(/\s/g, '')}`;
    phone.textContent = ZENTRA_CONFIG.contactPhone;
  }
}

function initContactForm() {
  const form = $('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('contact-name')?.value.trim();
    const email = $('contact-email-input')?.value.trim();
    const details = $('contact-details')?.value.trim();
    const status = $('contact-form-status');

    if (!name || !email || !details) {
      if (status) {
        status.textContent = 'Por favor completa todos los campos.';
        status.className = 'text-center text-sm text-red-400';
        status.classList.remove('hidden');
      }
      return;
    }

    const message = `Hola, me interesa solicitar una cotización con ZENTRA.\n\nNombre: ${name}\nCorreo: ${email}\nDetalles: ${details}`;
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  });
}

function renderServiceDetailHtml(category) {
  if (detailHtmlCache[category]) return detailHtmlCache[category];

  const meta = SERVICE_CATEGORIES[category];
  if (!meta) return '';

  const gridClass =
    meta.services.length >= 4 ? 'services-grid--4' : meta.services.length === 3 ? 'services-grid--3' : 'services-grid--2';

  const parts = [
    `<p class="service-modal__context">${escapeHtml(meta.context)}</p>`,
    `<section class="service-modal__section" aria-labelledby="service-modal-services-heading">`,
    `<h3 id="service-modal-services-heading" class="service-modal__section-title">Servicios incluidos</h3>`,
    `<div class="services-grid ${gridClass}" role="list">`,
  ];

  for (const item of meta.services) {
    parts.push(
      `<article class="service-card rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5" role="listitem">`,
      `<h4 class="text-sm font-bold text-white sm:text-base">${escapeHtml(item.title)}</h4>`,
      `<p class="mt-1.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">${escapeHtml(item.text)}</p>`,
      `</article>`
    );
  }

  parts.push('</div></section>');
  parts.push(
    `<section class="service-modal__section" aria-labelledby="service-modal-gallery-heading">`,
    `<h3 id="service-modal-gallery-heading" class="service-modal__section-title">Trabajos reales</h3>`,
    `<div class="service-modal-gallery">`
  );

  for (const img of meta.gallery) {
    parts.push(
      `<figure class="service-modal-gallery__item">`,
      `<img data-src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" class="service-modal-gallery__img" decoding="async" width="400" height="300">`,
      `</figure>`
    );
  }

  parts.push('</div></section>');
  parts.push(
    `<section class="service-modal__section" aria-labelledby="service-modal-guarantees-heading">`,
    `<h3 id="service-modal-guarantees-heading" class="service-modal__section-title">Lo que garantizamos</h3>`,
    `<ul class="service-modal-guarantees" role="list">`
  );

  for (const item of meta.guarantees) {
    parts.push(`<li class="service-modal-guarantees__item">${SERVICE_CHECK_ICON}<span>${escapeHtml(item)}</span></li>`);
  }

  parts.push('</ul></section>');

  detailHtmlCache[category] = parts.join('');
  return detailHtmlCache[category];
}

function hydrateModalImages(container) {
  container.querySelectorAll('img[data-src]').forEach((img) => {
    img.src = img.dataset.src;
    img.loading = 'lazy';
    img.removeAttribute('data-src');
  });
}

function initServiceCategoryModal() {
  const modal = $('service-modal');
  const titleEl = $('service-modal-title');
  const descEl = $('service-modal-desc');
  const mountEl = $('service-modal-mount');
  const bodyEl = modal?.querySelector('.service-modal__body');
  const grid = $('servicios-grid');

  if (!modal || !titleEl || !descEl || !mountEl || !grid) return;

  let lastFocused = null;
  let activeCategory = null;

  const showPanel = (category) => {
    const meta = SERVICE_CATEGORIES[category];
    if (!meta) return;

    activeCategory = category;
    titleEl.textContent = meta.title;
    descEl.textContent = meta.description;
    mountEl.innerHTML = renderServiceDetailHtml(category);
    hydrateModalImages(mountEl);
    mountEl.classList.add('is-active');
  };

  const openModal = (category, trigger) => {
    if (!SERVICE_CATEGORIES[category]) return;

    lastFocused = trigger || document.activeElement;
    showPanel(category);
    bodyEl?.scrollTo(0, 0);

    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    requestAnimationFrame(() => modal.classList.add('is-open'));

    modal.querySelector('.service-modal__close')?.focus();
  };

  const closeModal = () => {
    if (!modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
    mountEl.classList.remove('is-active');
    activeCategory = null;

    window.setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.setAttribute('hidden', '');
        mountEl.textContent = '';
      }
    }, 420);

    lastFocused?.focus?.();
  };

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-service-category]');
    if (btn) openModal(btn.dataset.serviceCategory, btn);
  });

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-service-modal-close]')) closeModal();
  });

  return { openModal, closeModal, isOpen: () => modal.classList.contains('is-open') };
}

function initMotion() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  const categoryCards = document.querySelectorAll('.service-category-enter');
  const grid = $('servicios-grid');

  if (reducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    categoryCards.forEach((el) => el.classList.add('is-entered'));
    return;
  }

  const root = document.documentElement;
  root.classList.add('js-reveal', 'js-service-cards');

  if (revealEls.length) {
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.08 }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    window.setTimeout(() => {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      revealObs.disconnect();
    }, 5000);
  }

  if (grid && categoryCards.length) {
    const playEntrance = () => {
      categoryCards.forEach((card, index) => {
        card.style.setProperty('--enter-delay', `${index * 0.07}s`);
        card.classList.add('is-entered');
      });
    };

    const rect = grid.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      requestAnimationFrame(playEntrance);
      return;
    }

    const catObs = new IntersectionObserver(
      (entries, obs) => {
        if (!entries[0]?.isIntersecting) return;
        requestAnimationFrame(playEntrance);
        obs.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );
    catObs.observe(grid);
  }
}

function initMobileMenu(onEscape) {
  const toggle = $('menu-toggle');
  const menu = $('mobile-menu');
  const iconOpen = $('icon-menu-open');
  const iconClose = $('icon-menu-close');
  if (!toggle || !menu) return null;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    menu.classList.toggle('hidden', !open);
    iconOpen?.classList.toggle('hidden', open);
    iconClose?.classList.toggle('hidden', !open);
    document.body.classList.toggle('overflow-hidden', open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });

  return {
    close: () => {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    },
    isOpen: () => toggle.getAttribute('aria-expanded') === 'true',
  };
}

function initPortfolioCarousel() {
  const root = document.querySelector('[data-portfolio-carousel]');
  const viewport = root?.querySelector('.portfolio-carousel__viewport');
  const track = root?.querySelector('.portfolio-carousel__track');
  const prevBtn = root?.querySelector('.portfolio-carousel__btn--prev');
  const nextBtn = root?.querySelector('.portfolio-carousel__btn--next');

  if (!root || !viewport || !track) return;

  const getScrollStep = () => {
    const card = track.querySelector('.portfolio-carousel__card');
    if (!card) return viewport.clientWidth * 0.85;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    return card.offsetWidth + gap;
  };

  const updateButtons = () => {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 4;
    if (prevBtn) prevBtn.disabled = viewport.scrollLeft <= 4;
    if (nextBtn) nextBtn.disabled = viewport.scrollLeft >= maxScroll;
  };

  const scrollByStep = (direction) => {
    viewport.scrollBy({ left: direction * getScrollStep(), behavior: 'smooth' });
  };

  prevBtn?.addEventListener('click', () => scrollByStep(-1));
  nextBtn?.addEventListener('click', () => scrollByStep(1));

  viewport.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons, { passive: true });

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByStep(-1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByStep(1);
    }
  });

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging = true;
    startX = e.clientX;
    startScrollLeft = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture?.(e.pointerId);
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    viewport.scrollLeft = startScrollLeft - (e.clientX - startX);
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('is-dragging');
    updateButtons();
  };

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  updateButtons();
}

function initHeaderScroll() {
  const header = $('site-header');
  const hero = $('inicio');
  if (!header) return;

  let heroBottom = 400;
  let ticking = false;

  const measure = () => {
    heroBottom = hero ? hero.offsetTop + hero.offsetHeight - 80 : 400;
  };

  const update = () => {
    const past = window.scrollY > heroBottom;
    header.classList.toggle('header-solid', past);
    header.classList.toggle('shadow-lg', past);
    header.classList.toggle('shadow-black/30', past);
    ticking = false;
  };

  measure();
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  applyWhatsAppLinks();
  applyContactInfo();
  initContactForm();
  initMotion();

  const modalApi = initServiceCategoryModal();
  const menuApi = initMobileMenu();

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (modalApi?.isOpen()) modalApi.closeModal();
    else if (menuApi?.isOpen()) menuApi.close();
  });

  initHeaderScroll();
  initPortfolioCarousel();

  const hash = window.location.hash.slice(1);
  if (SERVICE_CATEGORIES[hash]) modalApi?.openModal(hash);
});
