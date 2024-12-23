// Ajustar tamaño dinámico del contenedor según el contenido del slide
function adjustSwiperContainer (swiperInstance) {
  const container = swiperInstance.el.closest ('.swiper-container');
  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
  if (container && activeSlide) {
    container.style.height = `${activeSlide.scrollHeight}px`;
    container.style.width = `${activeSlide.scrollWidth}px`;
  }
}

// Inicialización del Swiper principal
var swiper = new Swiper ('.mySwiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  speed: 500,
  on: {
    slideChange: function () {
      adjustSwiperContainer (this);
    },
    init: function () {
      adjustSwiperContainer (this);
    },
  },
});

// Inicialización del Swiper anidado
var nestedSwiper = new Swiper ('.nestedSwiper', {
  navigation: {
    nextEl: '.swipper-button-next',
    prevEl: '.swipper-button-prev',
  },
  speed: 500,
  on: {
    slideChange: function () {
      adjustSwiperContainer (this);
    },
    init: function () {
      adjustSwiperContainer (this);
    },
  },
});

// Ajustar tamaño al cargar la página
document.addEventListener ('DOMContentLoaded', () => {
  adjustSwiperContainer (swiper);
  adjustSwiperContainer (nestedSwiper);
});
