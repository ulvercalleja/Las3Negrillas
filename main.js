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