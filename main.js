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

// ---- Inicialización ----
function init() {
  initNavClick();
  initScrollSpy();
}

init();