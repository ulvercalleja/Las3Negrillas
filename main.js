// ============================================================
//  CONFIGURACIÓN FIREBASE
//  Sustituye estos valores por los tuyos de Firebase Console
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZbPUbUZnypUVCCIabY35q18mhiilbf78", // ¡Esta clave solo funciona en este dominio!
  authDomain: "las-tres-llas.firebaseapp.com",
  projectId: "las-tres-llas",
  storageBucket: "las-tres-llas.firebasestorage.app",
  messagingSenderId: "861346331198",
  appId: "1:861346331198:web:71202d921e3bf97fb32f6f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================================
//  INTERCEPTOR GLOBAL DE ANCHORS — evita que aparezca # en la URL
// ============================================================
document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  e.preventDefault();
  const targetId = link.getAttribute('href').replace('#', '');
  const target = document.getElementById(targetId);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', window.location.pathname);
});

// ============================================================
//  ESTADO DE NAVEGACIÓN
// ============================================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('header[id], section[id]');

function setActiveLink(activeLink) {
  navLinks.forEach(l => {
    l.classList.remove('nav-active');
    l.classList.add('nav-inactive');
  });
  activeLink.classList.remove('nav-inactive');
  activeLink.classList.add('nav-active');
}

function initNavClick() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveLink(link);
      const targetId = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    });
  });
}

function initScrollSpy() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) setActiveLink(activeLink);
        history.replaceState(null, '', window.location.pathname);
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}

function initMoreRooms() {
  const btn = document.getElementById('btn-more-rooms');
  const moreRooms = document.getElementById('more-rooms');
  const text = document.getElementById('text-more-rooms');

  if (!btn || !moreRooms) return;

  btn.addEventListener('click', () => {
    const isHidden = moreRooms.classList.contains('hidden');

    if (isHidden) {
      moreRooms.classList.remove('hidden');
      btn.textContent = '−';
      text.textContent = 'Ocultar';
    } else {
      moreRooms.classList.add('hidden');
      btn.textContent = '+';
      text.textContent = 'Mostrar otros rincones';
    }
  });
}

function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.add('is-open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-label', 'Cerrar menú');
    }
  });

  // Cerrar al hacer clic en un enlace del menú e interceptar navegación
  mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      const targetId = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    });
  });
}

window.closeMobileMenu = function () {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) return;
  mobileMenu.classList.remove('is-open');
  if (hamburger) {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-label', 'Abrir menú');
  }
};

function init() {
  initNavClick();
  initScrollSpy();
  initMoreRooms();
  initHamburger();
}
init();

// ============================================================
//  LIGHTBOX
// ============================================================
(function () {
  const lightbox = document.getElementById('lightbox');
  const lbBackdrop = document.getElementById('lightbox-backdrop');
  const lbClose = document.getElementById('lightbox-close');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbDesc = document.getElementById('lightbox-desc');

  function openLightbox(src, caption, desc) {
    lbImg.src = src;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    lbDesc.textContent = desc || '';
    lightbox.classList.add('is-open');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  document.querySelectorAll('.photo-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openLightbox(card.dataset.src, card.dataset.caption, card.dataset.desc);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
})();

// ============================================================
//  POLÍTICA DE PRIVACIDAD
// ============================================================
(function () {
  const modal = document.getElementById('privacy-modal');
  const backdrop = document.getElementById('privacy-backdrop');
  const btnClose = document.getElementById('privacy-close');

  window.openPrivacy = function (e) {
    if (e) e.preventDefault();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  function closePrivacy() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  btnClose.addEventListener('click', closePrivacy);
  backdrop.addEventListener('click', closePrivacy);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closePrivacy();
  });
})();

// ============================================================
//  CALENDARIO — lee fechas reservadas desde Firebase
// ============================================================
(function () {

  const MONTHS_ES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const today = new Date();
  const YEAR_MIN = today.getFullYear();
  const MONTH_MIN = today.getMonth();
  const YEAR_MAX = YEAR_MIN + 40;

  let currentYear = YEAR_MIN;
  let currentMonth = MONTH_MIN;
  let bookedSet = new Set();

  function toISO(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function renderCalendar() {
    const grid = document.getElementById('cal-grid');
    const title = document.getElementById('cal-title');
    const btnPrev = document.getElementById('cal-prev');
    const btnNext = document.getElementById('cal-next');
    if (!grid || !title) return;

    title.textContent = `${MONTHS_ES[currentMonth]} ${currentYear}`;

    const isMinMonth = currentYear === YEAR_MIN && currentMonth === MONTH_MIN;
    const isMaxMonth = currentYear === YEAR_MAX && currentMonth === 11;
    btnPrev.disabled = isMinMonth;
    btnPrev.style.opacity = isMinMonth ? '0.3' : '';
    btnPrev.style.pointerEvents = isMinMonth ? 'none' : '';
    btnNext.disabled = isMaxMonth;
    btnNext.style.opacity = isMaxMonth ? '0.3' : '';
    btnNext.style.pointerEvents = isMaxMonth ? 'none' : '';

    const firstDow = new Date(currentYear, currentMonth, 1).getDay();
    const startOffset = firstDow === 0 ? 6 : firstDow - 1;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrev = new Date(currentYear, currentMonth, 0).getDate();
    const todayISO = toISO(today.getFullYear(), today.getMonth(), today.getDate());

    grid.innerHTML = '';

    for (let i = startOffset - 1; i >= 0; i--) {
      const cell = document.createElement('div');
      cell.className = 'cal-day cal-day--outside';
      cell.textContent = daysInPrev - i;
      grid.appendChild(cell);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const iso = toISO(currentYear, currentMonth, d);
      const isPast = iso < todayISO;
      const isToday = iso === todayISO;
      const isBooked = bookedSet.has(iso);

      let cls = 'cal-day';
      if (isToday) cls += ' cal-day--today';
      else if (isPast) cls += ' cal-day--past';
      else if (isBooked) cls += ' cal-day--booked';
      else cls += ' cal-day--free';

      const cell = document.createElement('div');
      cell.className = cls;
      cell.textContent = d;
      grid.appendChild(cell);
    }

    const remaining = grid.children.length % 7 === 0 ? 0 : 7 - (grid.children.length % 7);
    for (let d = 1; d <= remaining; d++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day cal-day--outside';
      cell.textContent = d;
      grid.appendChild(cell);
    }
  }

  function prevMonth() {
    if (currentYear === YEAR_MIN && currentMonth === MONTH_MIN) return;
    if (--currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  }

  function nextMonth() {
    if (currentYear === YEAR_MAX && currentMonth === 11) return;
    if (++currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  }

  function initCalendar() {
    document.getElementById('cal-prev').addEventListener('click', prevMonth);
    document.getElementById('cal-next').addEventListener('click', nextMonth);

    // Renderiza inmediatamente mientras Firebase carga
    renderCalendar();

    // Escucha cambios en Firestore en tiempo real
    const ref = doc(db, "reservas", "fechas");
    onSnapshot(ref, (snap) => {
      bookedSet = snap.exists() ? new Set(snap.data().ocupadas || []) : new Set();
      renderCalendar();
    }, (error) => {
      console.warn("Firebase no disponible:", error);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendar);
  } else {
    initCalendar();
  }

})();

// ============================================================
//  MODAL DE CONTACTO
// ============================================================
(function () {
  const modal    = document.getElementById('contact-modal');
  const backdrop = document.getElementById('contact-backdrop');
  const btnClose = document.getElementById('contact-close');

  // Construir email por JS para evitar ofuscación de Cloudflare
  const em = ['jcmerayo', 'gmail.com'].join('@');
  const display = document.getElementById('contact-email-display');
  if (display) display.textContent = em;

  const copyBtn = document.getElementById('contact-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(em).then(() => {
        copyBtn.title = '¡Copiado!';
        setTimeout(() => copyBtn.title = 'Copiar correo', 2000);
      });
    });
  }

  window.openContact = function () {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  function closeContact() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Adjuntar a todos los botones que abren el modal
  document.querySelectorAll('[data-open-contact]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openContact();
      if (el.dataset.closeMenu) closeMobileMenu();
    });
  });

  btnClose.addEventListener('click', closeContact);
  backdrop.addEventListener('click', closeContact);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeContact();
  });
})();
