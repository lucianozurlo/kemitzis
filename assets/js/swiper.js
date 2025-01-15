// Función genérica para manejar visibilidad con animaciones
function toggleVisibility (element, condition) {
  if (condition) {
    if (!element.classList.contains ('visible')) {
      element.classList.remove ('fade-out');
      element.classList.add ('visible');
    }
  } else {
    if (element.classList.contains ('visible')) {
      element.classList.add ('fade-out');
      element.classList.remove ('visible');
      element.addEventListener ('animationend', function handler () {
        element.style.zIndex = '1';
        element.classList.remove ('fade-out');
        element.removeEventListener ('animationend', handler);
      });
    }
  }
}

// Función para manejar visibilidad de .gp-img y .pricing
function handleVisibility (swiper, containerSelector) {
  const totalSlides = swiper.slides.length;
  const activeIndex = swiper.activeIndex;

  const gpImg = document.querySelector (containerSelector + ' .gp-img');
  const pricing = document.querySelector (containerSelector + ' .pricing');

  if (gpImg) toggleVisibility (gpImg, activeIndex === totalSlides - 1);
  if (pricing && containerSelector === '#services')
    toggleVisibility (pricing, activeIndex === 0);
}

// Función para establecer altura igual en todos los slides (solo en responsive)
function setEqualHeight (swiper) {
  if (window.innerWidth <= 999) {
    let maxHeight = 0;
    swiper.slides.forEach (slide => {
      slide.style.height = 'auto'; // Reiniciar altura para recalcular
      const slideHeight = slide.offsetHeight;
      if (slideHeight > maxHeight) maxHeight = slideHeight;
    });

    swiper.slides.forEach (slide => {
      slide.style.height = `${maxHeight}px`; // Aplicar la altura máxima
    });
  } else {
    swiper.slides.forEach (slide => {
      slide.style.height = ''; // Restaurar comportamiento original en desktop
    });
  }
}

// Función para inicializar Swiper en una sección específica
function initializeSwipers (containerSelector) {
  const swiper = new Swiper (containerSelector + ' .mySwiper', {
    pagination: {
      el: containerSelector + ' .swiper-pagination',
      clickable: true,
      renderBullet: (index, className) =>
        `<span class="${className}">${index + 1}</span>`,
    },
    autoHeight: window.innerWidth > 999, // Solo activar autoHeight en desktop
    observer: true,
    observeParents: true,
    speed: 500,
  });

  const nestedSwiper = new Swiper (containerSelector + ' .nestedSwiper', {
    navigation: {
      nextEl: containerSelector + ' .swipper-button-next',
      prevEl: containerSelector + ' .swipper-button-prev',
    },
    autoHeight: true,
    observer: true,
    observeParents: true,
    speed: 500,
  });

  nestedSwiper.on ('slideChange', () => {
    swiper.updateAutoHeight ();
    swiper.update ();
  });

  const links = document.querySelectorAll (containerSelector + ' .go-to-slide');
  const highlight = document.querySelector (containerSelector + ' .highlight');

  function updateActiveLink () {
    const currentIndex = swiper.activeIndex;
    links.forEach (link => link.classList.remove ('active'));

    const currentLink = document.querySelector (
      `${containerSelector} .go-to-slide[data-slide="${currentIndex + 1}"]`
    );

    if (currentLink) {
      currentLink.classList.add ('active');
      moveHighlight (currentLink);
    }

    handleVisibility (swiper, containerSelector);
  }

  function moveHighlight (link) {
    const linkRect = link.getBoundingClientRect ();
    const containerRect = link.parentNode.getBoundingClientRect ();

    const leftPos = linkRect.left - containerRect.left;
    const width = linkRect.width;

    highlight.style.left = `${leftPos}px`;
    highlight.style.width = `${width}px`;
  }

  links.forEach (link => {
    link.addEventListener ('click', e => {
      e.preventDefault ();
      const slideIndex = parseInt (link.dataset.slide, 10) - 1;
      swiper.slideTo (slideIndex);
    });
  });

  swiper.on ('slideChange', () => {
    updateActiveLink ();

    setTimeout (() => {
      const container = document.querySelector (
        containerSelector + ' .swiper-container'
      );

      if (containerSelector === '#tools') {
        container.style.maxWidth = swiper.activeIndex === 2
          ? '760px'
          : '1150px';
      } else {
        container.style.maxWidth = swiper.activeIndex === 1
          ? '760px'
          : '1150px';
      }

      swiper.updateAutoHeight ();
      swiper.update ();
    }, 350);
  });

  // Ajustar altura igual al iniciar en responsive
  setEqualHeight (swiper);

  // Ajustar altura igual al redimensionar
  window.addEventListener ('resize', () => {
    setEqualHeight (swiper);
  });

  updateActiveLink ();
}

// Inicializar Swipers cuando el DOM esté cargado
document.addEventListener ('DOMContentLoaded', () => {
  initializeSwipers ('#services');
  initializeSwipers ('#tools');
});

// Swiper para Mobile
const swiperMobile = new Swiper ('.mySwiperMob', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 20,
});

// Swiper para Clients
const swiperClients = new Swiper ('.mySwiperClients', {
  slidesPerView: 3,
  freeMode: true,
});
