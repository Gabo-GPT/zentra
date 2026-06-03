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

/** Tarjetas «Conoce lo nuevo» — página servicios.html */
const SERVICE_SHOWCASE = [
  {
    id: 'cctv',
    number: 1,
    title: 'CCTV',
    tagline: 'Videovigilancia y sistemas de seguridad.',
    items: [
      { code: 'IP', text: 'Cámaras IP, domo y bala para interior y exterior' },
      { code: 'HD', text: 'Grabación NVR/DVR con retención configurable' },
      { code: 'APP', text: 'Monitoreo remoto seguro desde móvil o PC' },
      { code: 'NET', text: 'Integración con tu red y cableado estructurado' },
    ],
  },
  {
    id: 'electricas',
    number: 2,
    title: 'Electricidad',
    tagline: 'Mantenimiento e instalaciones eléctricas.',
    items: [
      { code: 'RET', text: 'Proyectos bajo normativa RETIE' },
      { code: 'TAB', text: 'Tableros, canalización y distribución de potencia' },
      { code: 'LED', text: 'Iluminación empresarial e industrial' },
      { code: 'IND', text: 'Mantenimiento en planta y cuadros de control' },
    ],
  },
  {
    id: 'soporte',
    number: 3,
    title: 'Soporte Técnico',
    tagline: 'Asistencia técnica especializada.',
    items: [
      { code: 'PC', text: 'Mantenimiento preventivo y correctivo de equipos' },
      { code: 'IMP', text: 'Impresoras láser e inyección en red' },
      { code: 'DOC', text: 'Diagnóstico con informe de hallazgos' },
      { code: 'SLA', text: 'Tiempos de respuesta acordados por contrato' },
    ],
  },
  {
    id: 'redes',
    number: 4,
    title: 'Configuración de Redes',
    tagline: 'Gestión de redes y conectividad.',
    items: [
      { code: 'GPON', text: 'Fibra óptica y redes de alto rendimiento' },
      { code: 'LAN', text: 'Cableado Cat6/Cat6A certificado' },
      { code: 'WAN', text: 'Enlaces multi-sede y VPN' },
      { code: 'DOC', text: 'Documentación as-built entregada al cliente' },
    ],
  },
  {
    id: 'continuidad',
    number: 5,
    title: 'Continuidad (Pilas/UPS)',
    tagline: 'Sistemas de respaldo y energía ininterrumpida.',
    items: [
      { code: 'UPS', text: 'Equipos dimensionados para carga crítica' },
      { code: 'BAT', text: 'Bancos de baterías instalados y mantenidos' },
      { code: 'TRF', text: 'Transferencias eléctricas automatizadas' },
      { code: 'TST', text: 'Pruebas de autonomía documentadas' },
    ],
  },
];

const SERVICE_CATEGORIES = {
  cctv: {
    title: 'CCTV',
    description: 'Videovigilancia y sistemas de seguridad para proteger tu operación.',
    context:
      'Diseñamos e instalamos soluciones CCTV con cámaras IP y analógicas, grabación confiable y acceso remoto seguro. Integramos videovigilancia con tu red para monitoreo en tiempo real desde cualquier sede.',
    services: [
      { title: 'Cámaras IP y analógicas', text: 'Domo, bala y PTZ para interior y exterior con visión nocturna.' },
      { title: 'Grabación y NVR/DVR', text: 'Almacenamiento redundante y retención de video según política del cliente.' },
      { title: 'Monitoreo remoto', text: 'Acceso seguro desde móvil y PC con alertas configurables.' },
    ],
    gallery: [
      { src: 'img/carrusel/iluminaria.png', alt: 'Instalación técnica en sitio ZENTRA' },
      { src: 'img/Redes/lanwan.png', alt: 'Integración con infraestructura de red' },
    ],
    guarantees: [
      'Equipos de marcas reconocidas y garantía de fábrica',
      'Cableado ordenado y protección contra interferencias',
      'Capacitación básica al personal de monitoreo',
      'Soporte post-instalación en Bogotá',
    ],
  },
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
      { src: 'img/Redes/lanwan.png', alt: 'Infraestructura de redes LAN y WAN' },
      { src: 'img/Redes/wan.png', alt: 'Enlace y despliegue de red WAN' },
      { src: 'img/Redes/olt.pmg.webp', alt: 'Equipo OLT para red GPON con fibra óptica' },
      { src: 'img/Redes/hfc.pmg.png', alt: 'Infraestructura de red HFC' },
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
      { src: 'img/carrusel/tablero.png', alt: 'Transferencia electrica instalada por ZENTRA' },
      { src: 'img/carrusel/transferencias_electricas.png', alt: 'Tablero control de iluminacion instalado por ZENTRA' },
      { src: 'img/carrusel/baterias.png', alt: 'Sistema de respaldo con baterías' },
      { src: 'img/carrusel/banco_de_baterías.png', alt: 'Banco de condesnadores instalado por ZENTRA' },
    ],
    guarantees: [
      'Cumplimiento normativo RETIE',
      'Materiales de alta resistencia y calibre certificado',
      'Pruebas de continuidad y aislamiento documentadas',
      'Proyectos alineados a estándares ISO de gestión',
    ],
  },
  continuidad: {
    title: 'Continuidad (Pilas/UPS)',
    description: 'Sistemas de respaldo y energía ininterrumpida para tu negocio.',
    context:
      'Implementamos bancos de baterías, UPS y esquemas de respaldo que mantienen en operación equipos críticos ante cortes de energía. Dimensionamos la solución según carga, autonomía requerida y espacio disponible.',
    services: [
      { title: 'UPS y respaldo', text: 'Equipos dimensionados para servidores, CCTV y redes.' },
      { title: 'Bancos de baterías', text: 'Instalación, mantenimiento y pruebas de capacidad.' },
      { title: 'Transferencias eléctricas', text: 'Conmutación segura entre fuentes de energía.' },
    ],
    gallery: [
      { src: 'img/carrusel/baterias.png', alt: 'Sistema de respaldo con baterías' },
      { src: 'img/carrusel/banco_de_baterías.png', alt: 'Banco de condesnadores instalado por ZENTRA' },
      { src: 'img/carrusel/transferencias_electricas.png', alt: 'Tablero control de iluminacion' },
      { src: 'img/carrusel/tablero.png', alt: 'Transferencia electrica' },
    ],
    guarantees: [
      'Cálculo de autonomía documentado',
      'Pruebas de carga y descarga programadas',
      'Repuestos y mantenimiento preventivo',
      'Integración con tableros bajo normativa',
    ],
  },
};

const SHOWCASE_ICONS = {
  cctv: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
  electricas:
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
  soporte:
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
  redes:
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>',
  continuidad:
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10m0-5h12.5M20 7v10m0-5H7.5M7 11h10"/>',
};

const detailHtmlCache = Object.create(null);
let defaultWhatsAppUrl = '';

const $ = (id) => document.getElementById(id);

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUserText(text, maxLen = 800) {
  return String(text)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

const MEDIA_PROTECT_SELECTOR = '.media-protected';

function isProtectedMediaTarget(node) {
  return node?.nodeType === 1 && Boolean(node.closest?.(MEDIA_PROTECT_SELECTOR));
}

function hardenProtectedImage(img) {
  if (!img || img.dataset.mediaHardened) return;
  img.draggable = false;
  img.setAttribute('draggable', 'false');
  img.referrerPolicy = 'same-origin';
  img.dataset.mediaHardened = '1';
}

function scanProtectedImages(root = document) {
  root.querySelectorAll?.(`${MEDIA_PROTECT_SELECTOR} img`)?.forEach(hardenProtectedImage);
}

function initMediaProtection() {
  scanProtectedImages();

  document.addEventListener(
    'contextmenu',
    (e) => {
      if (isProtectedMediaTarget(e.target)) e.preventDefault();
    },
    { capture: true }
  );

  document.addEventListener(
    'dragstart',
    (e) => {
      if (isProtectedMediaTarget(e.target)) e.preventDefault();
    },
    { capture: true }
  );

  document.addEventListener(
    'keydown',
    (e) => {
      const img = e.target?.closest?.(`${MEDIA_PROTECT_SELECTOR} img`);
      if (!img) return;
      const key = e.key?.toLowerCase();
      if (e.key === 'PrintScreen') e.preventDefault();
      if ((e.ctrlKey || e.metaKey) && (key === 's' || key === 'u' || key === 'p')) {
        e.preventDefault();
      }
    },
    { capture: true }
  );

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) scanProtectedImages(node);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
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
    const name = sanitizeUserText($('contact-name')?.value, 120);
    const email = sanitizeUserText($('contact-email-input')?.value, 160);
    const details = sanitizeUserText($('contact-details')?.value, 800);
    const status = $('contact-form-status');

    if (!name || !email || !details) {
      if (status) {
        status.textContent = 'Por favor completa todos los campos.';
        status.className = 'text-center text-sm text-red-400';
        status.classList.remove('hidden');
      }
      return;
    }

    if (!isValidEmail(email)) {
      if (status) {
        status.textContent = 'Ingresa un correo electrónico válido.';
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
      `<figure class="service-modal-gallery__item media-protected">`,
      `<img data-src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" class="service-modal-gallery__img" decoding="async" width="400" height="300" draggable="false">`,
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
    hardenProtectedImage(img);
  });
}

function renderServiciosShowcaseHtml() {
  const parts = [];

  for (const card of SERVICE_SHOWCASE) {
    const iconPath = SHOWCASE_ICONS[card.id] || SHOWCASE_ICONS.soporte;
    const listItems = card.items
      .map(
        (item) =>
          `<li><strong>${escapeHtml(item.code)}:</strong> ${escapeHtml(item.text)}</li>`
      )
      .join('');

    parts.push(
      `<article class="servicios-nist-card service-category-enter reveal-on-scroll" data-servicios-card tabindex="0" role="listitem" aria-label="${escapeHtml(card.title)}">`,
      `<div class="servicios-nist-card__inner">`,
      `<div class="servicios-nist-card__front">`,
      `<span class="servicios-nist-card__icon" aria-hidden="true">`,
      `<svg class="h-12 w-12 sm:h-14 sm:w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">${iconPath}</svg>`,
      `</span>`,
      `<h3 class="servicios-nist-card__heading">${card.number}. ${escapeHtml(card.title)}</h3>`,
      `<p class="servicios-nist-card__tagline">${escapeHtml(card.tagline)}</p>`,
      `</div>`,
      `<div class="servicios-nist-card__panel" aria-hidden="true">`,
      `<h3 class="servicios-nist-card__panel-title">${card.number}. ${escapeHtml(card.title)}</h3>`,
      `<ul class="servicios-nist-card__list">${listItems}</ul>`,
      `<button type="button" class="servicios-nist-card__more btn-service-detail" data-service-category="${escapeHtml(card.id)}" aria-haspopup="dialog" aria-controls="service-modal">Ver ficha completa</button>`,
      `</div>`,
      `</div>`,
      `</article>`
    );
  }

  return parts.join('');
}

function initServiciosShowcase() {
  const mount = $('servicios-showcase-grid');
  if (!mount) return;

  mount.innerHTML = renderServiciosShowcaseHtml();
  const cards = mount.querySelectorAll('[data-servicios-card]');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const setActive = (activeCard) => {
    cards.forEach((c) => {
      const on = c === activeCard;
      c.classList.toggle('is-active', on);
      c.querySelector('.servicios-nist-card__panel')?.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
  };

  cards.forEach((card) => {
    if (canHover) {
      card.addEventListener('mouseenter', () => setActive(card));
      card.addEventListener('mouseleave', () => setActive(null));
    }

    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-service-category]')) return;
      if (!canHover) {
        const next = card.classList.contains('is-active') ? null : card;
        setActive(next);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('[data-service-category]')) return;
        e.preventDefault();
        setActive(card.classList.contains('is-active') ? null : card);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-servicios-card]')) setActive(null);
  });
}

function initServiceCategoryModal() {
  const modal = $('service-modal');
  const titleEl = $('service-modal-title');
  const descEl = $('service-modal-desc');
  const mountEl = $('service-modal-mount');
  const bodyEl = modal?.querySelector('.service-modal__body');

  if (!modal || !titleEl || !descEl || !mountEl) return;

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

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-service-category]');
    if (!btn || !SERVICE_CATEGORIES[btn.dataset.serviceCategory]) return;
    openModal(btn.dataset.serviceCategory, btn);
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
  const grid = $('servicios-grid') || $('servicios-showcase-grid');

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

  const AUTOPLAY_MS = 4500;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let autoplayId = null;
  let isDragging = false;
  let isPaused = false;
  let isVisible = true;

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

  const advanceAutoplay = () => {
    if (isPaused || isDragging || !isVisible || reducedMotion) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 4;
    if (viewport.scrollLeft >= maxScroll) {
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollByStep(1);
    }
    updateButtons();
  };

  const stopAutoplay = () => {
    if (autoplayId) window.clearInterval(autoplayId);
    autoplayId = null;
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (reducedMotion || isPaused || !isVisible) return;
    autoplayId = window.setInterval(advanceAutoplay, AUTOPLAY_MS);
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  prevBtn?.addEventListener('click', () => {
    scrollByStep(-1);
    resetAutoplay();
  });
  nextBtn?.addEventListener('click', () => {
    scrollByStep(1);
    resetAutoplay();
  });

  viewport.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons, { passive: true });

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByStep(-1);
      resetAutoplay();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByStep(1);
      resetAutoplay();
    }
  });

  let startX = 0;
  let startScrollLeft = 0;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.target.closest('[data-portfolio-zoom]')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging = true;
    stopAutoplay();
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
    resetAutoplay();
  };

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  root.addEventListener('mouseenter', () => {
    isPaused = true;
    stopAutoplay();
  });
  root.addEventListener('mouseleave', () => {
    isPaused = false;
    startAutoplay();
  });
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', () => {
    if (!root.contains(document.activeElement)) startAutoplay();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  const visObs = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
      if (isVisible) startAutoplay();
      else stopAutoplay();
    },
    { threshold: 0.25 }
  );
  visObs.observe(root);

  updateButtons();
  startAutoplay();
}

function initPortfolioLightbox() {
  const lightbox = $('portfolio-lightbox');
  const imgEl = $('portfolio-lightbox-img');
  const captionEl = $('portfolio-lightbox-caption');
  if (!lightbox || !imgEl || !captionEl) return;

  let lastFocused = null;

  const open = (src, alt, title) => {
    lastFocused = document.activeElement;
    imgEl.src = src;
    imgEl.alt = alt;
    hardenProtectedImage(imgEl);
    captionEl.textContent = title;
    lightbox.removeAttribute('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    lightbox.querySelector('.portfolio-lightbox__close')?.focus();
  };

  const close = () => {
    if (!lightbox.classList.contains('is-open')) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');

    window.setTimeout(() => {
      if (!lightbox.classList.contains('is-open')) {
        lightbox.setAttribute('hidden', '');
        imgEl.removeAttribute('src');
        imgEl.alt = '';
        captionEl.textContent = '';
      }
    }, 320);

    lastFocused?.focus?.();
  };

  document.querySelectorAll('[data-portfolio-zoom]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      if (!img?.src) return;
      const title =
        btn.closest('.portfolio-carousel__card-inner')?.querySelector('.portfolio-carousel__title')?.textContent?.trim() ||
        img.alt;
      open(img.currentSrc || img.src, img.alt, title);
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target.closest('[data-portfolio-lightbox-close]')) close();
  });

  return { close, isOpen: () => lightbox.classList.contains('is-open') };
}

function initServiciosPageHeader() {
  const header = $('site-header');
  if (!header || !document.body.classList.contains('page-servicios')) return;
  header.classList.add('header-solid', 'shadow-lg', 'shadow-black/30');
}

function initHeaderScroll() {
  const header = $('site-header');
  const hero = $('inicio');
  if (!header || !hero) return;

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
  initMediaProtection();
  applyWhatsAppLinks();
  applyContactInfo();
  initContactForm();
  initServiciosShowcase();

  const modalApi = initServiceCategoryModal();
  const lightboxApi = initPortfolioLightbox();
  const menuApi = initMobileMenu();

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (lightboxApi?.isOpen()) lightboxApi.close();
    else if (modalApi?.isOpen()) modalApi.closeModal();
    else if (menuApi?.isOpen()) menuApi.close();
  });

  initServiciosPageHeader();
  initHeaderScroll();
  initPortfolioCarousel();
  initMotion();

  const hash = window.location.hash.slice(1);
  if (SERVICE_CATEGORIES[hash]) modalApi?.openModal(hash);
});
