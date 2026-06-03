/**
 * ZENTRA — Landing Page
 * Configuración, UI, scroll reveal, WhatsApp y formulario.
 */

/* =============================================================================
   PERSONALIZACIÓN — Edita estos valores antes de publicar
   ============================================================================= */
const ZENTRA_CONFIG = {
  whatsappNumber: '573178343978',
  whatsappMessage: 'Hola, me interesa solicitar una cotización con ZENTRA.',
  contactEmail: 'contacto@zentra.co',
  contactPhone: '+57 317 834 3978',
  contactPhoneTel: '+573178343978',
};

/* =============================================================================
   WhatsApp
   ============================================================================= */
function buildWhatsAppUrl(customMessage) {
  const text = encodeURIComponent(customMessage || ZENTRA_CONFIG.whatsappMessage);
  return `https://wa.me/${ZENTRA_CONFIG.whatsappNumber}?text=${text}`;
}

function applyWhatsAppLinks() {
  const url = buildWhatsAppUrl();
  [
    'nav-whatsapp',
    'mobile-whatsapp',
    'hero-whatsapp',
    'footer-cta-whatsapp',
    'footer-whatsapp',
    'fab-whatsapp',
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });
}

function applyContactInfo() {
  const email = document.getElementById('contact-email');
  const phone = document.getElementById('contact-phone');

  if (email) {
    email.href = `mailto:${ZENTRA_CONFIG.contactEmail}`;
    email.textContent = ZENTRA_CONFIG.contactEmail;
  }
  if (phone) {
    phone.href = `tel:${ZENTRA_CONFIG.contactPhoneTel.replace(/\s/g, '')}`;
    phone.textContent = ZENTRA_CONFIG.contactPhone;
  }
}

/* =============================================================================
   Formulario → WhatsApp
   ============================================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email-input')?.value.trim();
    const details = document.getElementById('contact-details')?.value.trim();
    const status = document.getElementById('contact-form-status');

    if (!name || !email || !details) {
      if (status) {
        status.textContent = 'Por favor completa todos los campos.';
        status.className = 'text-center text-sm text-red-400';
        status.classList.remove('hidden');
      }
      return;
    }

    const message = [
      'Hola, me interesa solicitar una cotización con ZENTRA.',
      '',
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Detalles: ${details}`,
    ].join('\n');

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  });
}

/* =============================================================================
   Tarjetas de servicios — entrada suave al cargar / al entrar en vista
   ============================================================================= */
const SERVICE_CHECK_ICON =
  '<svg class="service-modal-guarantees__icon h-4 w-4 shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>';

const SERVICE_CATEGORIES = {
  soporte: {
    title: 'Soporte Técnico',
    description: 'Continuidad operativa para tu parque tecnológico con respuesta ágil en Bogotá.',
    context:
      'Aplicamos protocolos de mantenimiento documentados, repuestos de calidad y configuración en red alineada a buenas prácticas. Tu infraestructura de cómputo e impresión queda estable, trazable y lista para el día a día de la oficina.',
    services: [
      {
        title: 'Mantenimiento de equipos de cómputo',
        text: 'Preventivo y correctivo para PCs, portátiles y estaciones de trabajo.',
      },
      {
        title: 'Mantenimiento de impresoras',
        text: 'Láser e inyección: diagnóstico, repuestos y configuración en red.',
      },
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
      {
        title: 'Proyectos residenciales',
        text: 'Tableros, tomas, iluminación y puesta a tierra en viviendas y conjuntos.',
      },
      {
        title: 'Proyectos empresariales',
        text: 'Cuadros eléctricos, potencia, iluminación LED y ampliaciones comerciales.',
      },
      {
        title: 'Proyectos industriales',
        text: 'Media y baja tensión, tableros de control y mantenimiento en planta.',
      },
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

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderServiceDetailHtml(category) {
  const meta = SERVICE_CATEGORIES[category];
  if (!meta) return '';

  const servicesGridClass =
    meta.services.length >= 4 ? 'services-grid--4' : meta.services.length === 3 ? 'services-grid--3' : 'services-grid--2';

  const servicesHtml = meta.services
    .map(
      (item) => `
      <article class="service-card rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5" role="listitem">
        <h4 class="text-sm font-bold text-white sm:text-base">${escapeHtml(item.title)}</h4>
        <p class="mt-1.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">${escapeHtml(item.text)}</p>
      </article>`
    )
    .join('');

  const galleryHtml = meta.gallery
    .map(
      (img) => `
      <figure class="service-modal-gallery__item">
        <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" class="service-modal-gallery__img" loading="lazy" decoding="async" width="400" height="300">
      </figure>`
    )
    .join('');

  const guaranteesHtml = meta.guarantees
    .map(
      (item) => `
      <li class="service-modal-guarantees__item">
        ${SERVICE_CHECK_ICON}
        <span>${escapeHtml(item)}</span>
      </li>`
    )
    .join('');

  return `
    <p class="service-modal__context">${escapeHtml(meta.context)}</p>

    <section class="service-modal__section" aria-labelledby="service-modal-services-heading">
      <h3 id="service-modal-services-heading" class="service-modal__section-title">Servicios incluidos</h3>
      <div class="services-grid ${servicesGridClass}" role="list">${servicesHtml}</div>
    </section>

    <section class="service-modal__section" aria-labelledby="service-modal-gallery-heading">
      <h3 id="service-modal-gallery-heading" class="service-modal__section-title">Trabajos reales</h3>
      <div class="service-modal-gallery">${galleryHtml}</div>
    </section>

    <section class="service-modal__section" aria-labelledby="service-modal-guarantees-heading">
      <h3 id="service-modal-guarantees-heading" class="service-modal__section-title">Lo que garantizamos</h3>
      <ul class="service-modal-guarantees" role="list">${guaranteesHtml}</ul>
    </section>
  `;
}

/* =============================================================================
   Modal categoría → detalle de servicios
   ============================================================================= */
function initServiceCategoryModal() {
  const modal = document.getElementById('service-modal');
  const titleEl = document.getElementById('service-modal-title');
  const descEl = document.getElementById('service-modal-desc');
  const mountEl = document.getElementById('service-modal-mount');
  const triggers = document.querySelectorAll('[data-service-category]');
  const closeEls = modal?.querySelectorAll('[data-service-modal-close]');

  if (!modal || !titleEl || !descEl || !mountEl || !triggers.length) return;

  let lastFocused = null;

  const showPanel = (category) => {
    const meta = SERVICE_CATEGORIES[category];
    if (!meta) return;

    titleEl.textContent = meta.title;
    descEl.textContent = meta.description;
    mountEl.innerHTML = renderServiceDetailHtml(category);
    mountEl.classList.add('is-active');
  };

  const openModal = (category, trigger) => {
    const meta = SERVICE_CATEGORIES[category];
    if (!meta) return;

    lastFocused = trigger || document.activeElement;
    showPanel(category);
    modal.querySelector('.service-modal__body')?.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    modal.removeAttribute('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => modal.classList.add('is-open'));
    });

    const closeBtn = modal.querySelector('.service-modal__close');
    closeBtn?.focus();
  };

  const closeModal = () => {
    if (!modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
    mountEl.classList.remove('is-active');

    window.setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.setAttribute('hidden', '');
      }
    }, 420);

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  };

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.serviceCategory, btn);
    });
  });

  closeEls?.forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  const hash = window.location.hash.replace('#', '');
  if (SERVICE_CATEGORIES[hash]) {
    openModal(hash);
  }
}

function initServiceCardsEntrance() {
  const grid = document.getElementById('servicios-grid');
  const cards = grid?.querySelectorAll('.service-category-enter');
  if (!grid || !cards?.length) return;

  document.documentElement.classList.add('js-service-cards');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const playEntrance = () => {
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.07}s`;
      card.classList.add('is-entered');
    });
  };

  if (reducedMotion) {
    playEntrance();
    return;
  }

  const runOnce = () => {
    requestAnimationFrame(playEntrance);
  };

  const rect = grid.getBoundingClientRect();
  const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

  if (inView) {
    runOnce();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      runOnce();
      obs.disconnect();
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );

  observer.observe(grid);
}

/* =============================================================================
   Scroll reveal — IntersectionObserver
   ============================================================================= */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  document.documentElement.classList.add('js-reveal');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.08,
    }
  );

  elements.forEach((el) => observer.observe(el));

  /* Fallback: mostrar todo si algo falla al detectar scroll */
  setTimeout(() => {
    elements.forEach((el) => el.classList.add('is-visible'));
  }, 4000);
}

/* =============================================================================
   Menú hamburguesa
   ============================================================================= */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-menu-open');
  const iconClose = document.getElementById('icon-menu-close');

  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    menu.classList.toggle('hidden', !open);
    iconOpen?.classList.toggle('hidden', open);
    iconClose?.classList.toggle('hidden', !open);
    document.body.classList.toggle('overflow-hidden', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

/* =============================================================================
   Navbar al hacer scroll
   ============================================================================= */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const hero = document.getElementById('inicio');
  if (!header) return;

  const onScroll = () => {
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight - 80 : 400;
    const pastHero = window.scrollY > heroBottom;
    header.classList.toggle('header-solid', pastHero);
    header.classList.toggle('shadow-lg', pastHero);
    header.classList.toggle('shadow-black/30', pastHero);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* =============================================================================
   Inicialización
   ============================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  applyWhatsAppLinks();
  applyContactInfo();
  initContactForm();
  initServiceCardsEntrance();
  initServiceCategoryModal();
  initScrollReveal();
  initMobileMenu();
  initHeaderScroll();
});
