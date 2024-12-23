// assets/js/swiper.js

// Función para inicializar Swiper en una sección específica
function initializeSwipers (containerSelector) {
  // Inicializar el swiper principal
  var swiper = new Swiper (containerSelector + ' .mySwiper', {
    pagination: {
      el: containerSelector + ' .swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    autoHeight: true,
    observer: true,
    observeParents: true,
    speed: 500,
  });

  // Inicializar el swiper anidado (si existe)
  var nestedSwiper = new Swiper (containerSelector + ' .nestedSwiper', {
    navigation: {
      nextEl: containerSelector + ' .swipper-button-next',
      prevEl: containerSelector + ' .swipper-button-prev',
    },
    autoHeight: true,
    observer: true,
    observeParents: true,
    speed: 500,
  });

  // Actualiza el tamaño del swiper principal cuando cambie el slide interno
  nestedSwiper.on ('slideChange', function () {
    swiper.updateAutoHeight ();
    swiper.update ();
  });

  // Seleccionar todos los enlaces para cambiar de slide
  var links = document.querySelectorAll (containerSelector + ' .go-to-slide');
  var highlight = document.querySelector (containerSelector + ' .highlight');

  // Función para actualizar el enlace activo y la posición del highlight
  function updateActiveLink () {
    var currentIndex = swiper.activeIndex;
    links.forEach (function (link) {
      link.classList.remove ('active');
    });

    var currentLink = document.querySelector (
      containerSelector +
        ' .go-to-slide[data-slide="' +
        (currentIndex + 1) +
        '"]'
    );
    if (currentLink) {
      currentLink.classList.add ('active');
      moveHighlight (currentLink);
    }

    // Llamar a la función para manejar la visibilidad de .gp-img y .pricing
    handleVisibility (swiper, containerSelector);
  }

  // Función para mover el highlight debajo del enlace activo
  function moveHighlight (link) {
    var linkRect = link.getBoundingClientRect ();
    var containerRect = link.parentNode.getBoundingClientRect ();

    var leftPos = linkRect.left - containerRect.left;
    var width = linkRect.width;

    highlight.style.left = leftPos + 'px';
    highlight.style.width = width + 'px';
  }

  // Agregar eventos de clic a los enlaces para cambiar de slide
  links.forEach (function (link) {
    link.addEventListener ('click', function (e) {
      e.preventDefault ();
      var slideIndex = parseInt (this.dataset.slide, 10) - 1;
      swiper.slideTo (slideIndex);
    });
  });

  // Escuchar el evento de cambio de slide en el swiper principal
  swiper.on ('slideChange', function () {
    updateActiveLink (); // Actualizar el enlace activo

    // Espera 350ms antes de cambiar el ancho del contenedor
    setTimeout (function () {
      var container = document.querySelector (
        containerSelector + ' .swiper-container'
      );

      if (containerSelector === '#tools') {
        // Para la sección "tools" con 3 slides
        if (swiper.activeIndex === 2) {
          // Último slide
          container.style.maxWidth = '760px';
        } else {
          container.style.maxWidth = '1150px';
        }
      } else {
        // Para la sección "services" con 2 slides
        if (swiper.activeIndex === 1) {
          // Último slide
          container.style.maxWidth = '760px';
        } else {
          container.style.maxWidth = '1150px';
        }
      }

      // Actualizar el swiper después del cambio
      swiper.updateAutoHeight ();
      swiper.update ();
    }, 350); // 350ms = 0.35s
  });

  // Al iniciar, marcar el primer enlace como activo
  updateActiveLink ();
}

// Función para manejar la visibilidad de .gp-img y .pricing
function handleVisibility (swiper, containerSelector) {
  var totalSlides = swiper.slides.length;
  var activeIndex = swiper.activeIndex;

  // Manejo de .gp-img
  var gpImg = document.querySelector (containerSelector + ' .gp-img');
  if (gpImg) {
    // Verificar que gpImg existe
    var isLastSlide = activeIndex === totalSlides - 1;
    console.log (
      `Container: ${containerSelector}, gpImg isLastSlide: ${isLastSlide}`
    );

    if (isLastSlide) {
      // Si ya está visible, no hacemos nada
      if (!gpImg.classList.contains ('visible')) {
        // Remover la clase 'fade-out' si está presente
        gpImg.classList.remove ('fade-out');
        // Añadir la clase 'visible'
        gpImg.classList.add ('visible');
        console.log ('.gp-img visible');
      }
    } else {
      // Si actualmente está visible, iniciamos la animación de fade-out
      if (gpImg.classList.contains ('visible')) {
        // Añadir la clase 'fade-out' para iniciar la animación
        gpImg.classList.add ('fade-out');
        // Remover la clase 'visible' para ocultar la imagen
        gpImg.classList.remove ('visible');
        console.log ('.gp-img fade-out');

        // Escuchar el evento de finalización de la animación para cambiar z-index
        gpImg.addEventListener ('animationend', function handler () {
          // Establecer z-index a 1 después de la animación de fade-out
          gpImg.style.zIndex = '1';
          // Remover la clase 'fade-out' ya que la animación ha finalizado
          gpImg.classList.remove ('fade-out');
          // Remover el listener para evitar múltiples ejecuciones
          gpImg.removeEventListener ('animationend', handler);
        });
      }
    }
  }

  // Manejo de .pricing solo para la sección "services"
  if (containerSelector === '#services') {
    var pricing = document.querySelector (containerSelector + ' .pricing');
    if (pricing) {
      // Verificar que pricing existe
      var isFirstSlide = activeIndex === 0; // Primer slide es index 0
      console.log (
        `Container: ${containerSelector}, pricing isFirstSlide: ${isFirstSlide}`
      );

      if (isFirstSlide) {
        // Si ya está visible, no hacemos nada
        if (!pricing.classList.contains ('visible')) {
          // Remover la clase 'fade-out' si está presente
          pricing.classList.remove ('fade-out');
          // Añadir la clase 'visible'
          pricing.classList.add ('visible');
          console.log ('.pricing visible');
        }
      } else {
        // Si actualmente está visible, iniciamos la animación de fade-out
        if (pricing.classList.contains ('visible')) {
          // Añadir la clase 'fade-out' para iniciar la animación
          pricing.classList.add ('fade-out');
          // Remover la clase 'visible' para ocultar el elemento
          pricing.classList.remove ('visible');
          console.log ('.pricing fade-out');

          // Escuchar el evento de finalización de la animación para cambiar z-index
          pricing.addEventListener ('animationend', function handler () {
            // Establecer z-index a 1 después de la animación de fade-out
            pricing.style.zIndex = '1';
            // Remover la clase 'fade-out' ya que la animación ha finalizado
            pricing.classList.remove ('fade-out');
            // Remover el listener para evitar múltiples ejecuciones
            pricing.removeEventListener ('animationend', handler);
          });
        }
      }
    }
  }
}

// Inicializar Swipers para ambas secciones una vez que el DOM esté cargado
document.addEventListener ('DOMContentLoaded', function () {
  initializeSwipers ('#services');
  initializeSwipers ('#tools');
});

// Funciones para abrir y cerrar el menú de navegación
function openNav () {
  document.querySelector ('#menu').classList.add ('active');
}

function closeNav () {
  document.querySelector ('#menu').classList.remove ('active');
}
