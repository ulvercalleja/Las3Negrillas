// ---- Estado de navegación ----
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('header[id], section[id]');

// Mueve el estado activo al enlace recibido
function setActiveLink(activeLink) {
  navLinks.forEach(l => {
    l.classList.remove('nav-active');
    l.classList.add('nav-inactive');
  });
  activeLink.classList.remove('nav-inactive');
  activeLink.classList.add('nav-active');
}

// Escucha el click en cada enlace y activa el que se ha pulsado
function initNavClick() {
  navLinks.forEach(link => {
    link.addEventListener('click', () => setActiveLink(link));
  });
}

// Activa el enlace del nav según la sección visible en pantalla
function initScrollSpy() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) setActiveLink(activeLink);
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }); // franja central de la pantalla

  sections.forEach(section => observer.observe(section));
}

/* ── Hover y LIGHTBOX de las fotos del entorno ── */
function init() {
  initNavClick();
  initScrollSpy();
}

init();

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
    // Pequeño delay para limpiar src y evitar flash
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  // Abrir al clicar cualquier .photo-card
  document.querySelectorAll('.photo-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openLightbox(
        card.dataset.src,
        card.dataset.caption,
        card.dataset.desc
      );
    });
  });

  // Cerrar con el botón X
  lbClose.addEventListener('click', closeLightbox);

  // Cerrar al clicar el fondo
  lbBackdrop.addEventListener('click', closeLightbox);

  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();

/* Politica de privacidad */
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
/* ── Calendario de disponibilidad ── */
(function () {

  // ── Define aquí las fechas reservadas ──────────────────────
  // Formato ISO: "YYYY-MM-DD"
  const BOOKED_DATES = [
    "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15",
    "2026-04-23", "2026-04-24",
  ];

  const bookedSet = new Set(BOOKED_DATES);

  const MONTHS_ES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const today = new Date();
  const YEAR_MIN  = today.getFullYear();
  const MONTH_MIN = today.getMonth();
  const YEAR_MAX  = YEAR_MIN + 40;

  let currentYear  = YEAR_MIN;
  let currentMonth = MONTH_MIN;

  function toISO(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function renderCalendar() {
    const grid    = document.getElementById('cal-grid');
    const title   = document.getElementById('cal-title');
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

    const firstDow   = new Date(currentYear, currentMonth, 1).getDay();
    const startOffset = (firstDow === 0) ? 6 : firstDow - 1;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrev  = new Date(currentYear, currentMonth, 0).getDate();
    const todayISO    = toISO(today.getFullYear(), today.getMonth(), today.getDate());

    grid.innerHTML = '';

    // Días del mes anterior (relleno)
    for (let i = startOffset - 1; i >= 0; i--) {
      const cell = document.createElement('div');
      cell.className = 'cal-day cal-day--outside';
      cell.textContent = daysInPrev - i;
      grid.appendChild(cell);
    }

    // Días del mes actual
    for (let d = 1; d <= daysInMonth; d++) {
      const iso    = toISO(currentYear, currentMonth, d);
      const isPast   = iso < todayISO;
      const isToday  = iso === todayISO;
      const isBooked = bookedSet.has(iso);

      let cls = 'cal-day';
      if (isToday)       cls += ' cal-day--today';
      else if (isPast)   cls += ' cal-day--past';
      else if (isBooked) cls += ' cal-day--booked';
      else               cls += ' cal-day--free';

      const cell = document.createElement('div');
      cell.className = cls;
      cell.textContent = d;
      grid.appendChild(cell);
    }

    // Días del mes siguiente (relleno)
    const totalCells = grid.children.length;
    const remaining  = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let d = 1; d <= remaining; d++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day cal-day--outside';
      cell.textContent = d;
      grid.appendChild(cell);
    }
  }

  function prevMonth() {
    if (currentYear === YEAR_MIN && currentMonth === MONTH_MIN) return;
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  }

  function nextMonth() {
    if (currentYear === YEAR_MAX && currentMonth === 11) return;
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  }

  function initCalendar() {
  const prev = document.getElementById('cal-prev');
  const next = document.getElementById('cal-next');
  const grid = document.getElementById('cal-grid');
  const title = document.getElementById('cal-title');

  if (!prev || !next || !grid || !title) {
    console.warn("Calendario no encontrado en esta página");
    return;
  }

  prev.addEventListener('click', prevMonth);
  next.addEventListener('click', nextMonth);

  renderCalendar();

  const ref = doc(db, "reservas", "fechas");
  onSnapshot(ref, (snap) => {
    bookedSet = snap.exists() ? new Set(snap.data().ocupadas || []) : new Set();
    renderCalendar();
  });
}

  window.addEventListener('load', initCalendar);

})();
