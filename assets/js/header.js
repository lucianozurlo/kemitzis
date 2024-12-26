document.addEventListener ('DOMContentLoaded', function () {
  const sections = document.querySelectorAll ('section[id]');
  const navLinks = document.querySelectorAll ('header .nav-link');
  const highlight = document.querySelector ('.nav-highlight');

  const header = document.querySelector ('header');
  const headerHeight = header.offsetHeight;

  const options = {
    root: null,
    rootMargin: `-${headerHeight}px 0px 0px 0px`,
    threshold: 0.6,
  };

  // Mapeo de IDs de secciones a selectores de enlaces
  const sectionToNavLink = {
    services: '#services',
    tools: '#services', // Ambas secciones mapean al enlace 'Services'
    // Agrega más mapeos si es necesario
  };

  const observer = new IntersectionObserver (function (entries) {
    entries.forEach (entry => {
      if (entry.isIntersecting) {
        // Remover la clase 'active' de todos los enlaces
        navLinks.forEach (link => {
          link.classList.remove ('active');
        });

        // Determinar el selector del enlace activo basado en el mapeo
        let activeLinkSelector = `header .nav-link[href="#${entry.target.id}"]`;
        if (sectionToNavLink.hasOwnProperty (entry.target.id)) {
          activeLinkSelector = `header .nav-link[href="${sectionToNavLink[entry.target.id]}"]`;
        }

        // Seleccionar el enlace correspondiente y agregar la clase 'active'
        const activeLink = document.querySelector (activeLinkSelector);
        if (activeLink) {
          activeLink.classList.add ('active');
          moveHighlight (activeLink);
          highlight.classList.remove ('hide'); // Remover 'hide' cuando hay un enlace activo
        } else {
          highlight.classList.add ('hide'); // Agregar 'hide' si no hay enlace activo
        }
      }
    });
  }, options);

  // Observar cada sección
  sections.forEach (section => {
    observer.observe (section);
  });

  // Función para mover la barra de fondo animada
  function moveHighlight (activeLink) {
    const linkRect = activeLink.getBoundingClientRect ();
    const containerRect = activeLink.parentElement.parentElement.getBoundingClientRect ();

    // Calcular la posición relativa del enlace dentro del contenedor
    const left = linkRect.left - containerRect.left;
    const width = linkRect.width;

    // Actualizar el estilo de la barra de fondo
    highlight.style.left = `${left}px`;
    highlight.style.width = `${width}px`;
  }

  // Inicializar la barra de fondo con el enlace activo actual al cargar la página
  const initialActiveLink = document.querySelector ('header .nav-link.active');
  if (initialActiveLink) {
    moveHighlight (initialActiveLink);
    highlight.classList.remove ('hide');
  } else {
    highlight.classList.add ('hide');
  }

  // Reposicionar la barra de fondo al redimensionar la ventana
  window.addEventListener ('resize', () => {
    const activeLink = document.querySelector ('header .nav-link.active');
    if (activeLink) {
      moveHighlight (activeLink);
      highlight.classList.remove ('hide');
    } else {
      highlight.classList.add ('hide');
    }
  });
});
