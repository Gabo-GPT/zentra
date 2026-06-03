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
const SERVICE_CATEGORIES = {
  soporte: {
    title: 'Soporte Técnico',
    description: 'Mantenimiento de equipos de cómputo e impresoras para oficinas y PYMES.',
  },
  redes: {
    title: 'Infraestructura de Redes',
    description: 'GPON, P2P, LAN y WAN: conectividad diseñada e implementada con estándares profesionales.',
  },
  electricas: {
    title: 'Instalaciones Eléctricas',
    description: 'Proyectos eléctricos residenciales, empresariales e industriales bajo normativa RETIE.',
  },
};

/* =============================================================================
   Modal categoría → detalle de servicios
   ============================================================================= */
function initServiceCategoryModal() {
  const modal = document.getElementById('service-modal');
  const titleEl = document.getElementById('service-modal-title');
  const descEl = document.getElementById('service-modal-desc');
  const panels = modal?.querySelectorAll('[data-service-panel]');
  const triggers = document.querySelectorAll('[data-service-category]');
  const closeEls = modal?.querySelectorAll('[data-service-modal-close]');

  if (!modal || !titleEl || !descEl || !panels?.length || !triggers.length) return;

  let lastFocused = null;

  const showPanel = (category) => {
    const meta = SERVICE_CATEGORIES[category];
    if (!meta) return;

    titleEl.textContent = meta.title;
    descEl.textContent = meta.description;

    panels.forEach((panel) => {
      const isActive = panel.dataset.servicePanel === category;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);
    });
  };

  const openModal = (category, trigger) => {
    const meta = SERVICE_CATEGORIES[category];
    if (!meta) return;

    lastFocused = trigger || document.activeElement;
    showPanel(category);

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
    panels.forEach((panel) => panel.classList.remove('is-active'));

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
