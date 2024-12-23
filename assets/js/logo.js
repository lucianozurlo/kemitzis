// // Función para cambiar el logo al pasar la sección bg-grad
// function cambiarLogoAlPasarSobreBgGrad () {
//   const logo = document.querySelector ('.header-logo');
//   const bgGradTrigger = document.getElementById ('bg-grad-trigger');

//   if (!logo) {
//     console.warn ('Elemento con clase "header-logo" no encontrado.');
//     return;
//   }

//   if (!bgGradTrigger) {
//     console.warn ('Elemento con id "bg-grad-trigger" no encontrado.');
//     return;
//   }

//   const opciones = {
//     root: null, // Observa con respecto al viewport
//     rootMargin: '-25px 0px 0px 0px', // Ajuste para alinear con la posición del logo
//     threshold: 0,
//   };

//   const callback = (entries, observer) => {
//     entries.forEach (entry => {
//       if (entry.isIntersecting) {
//         // Iniciar la animación de fade-out
//         logo.classList.add ('fade-out');
//         logo.classList.remove ('fade-in');

//         // Esperar a que termine la transición antes de cambiar el src
//         logo.addEventListener ('transitionend', function handler () {
//           logo.src = 'assets/img/logo-w.gif';
//           logo.classList.remove ('fade-out');
//           logo.classList.add ('fade-in');
//           logo.removeEventListener ('transitionend', handler);
//         });
//       } else {
//         // Iniciar la animación de fade-out
//         logo.classList.add ('fade-out');
//         logo.classList.remove ('fade-in');

//         // Esperar a que termine la transición antes de cambiar el src
//         logo.addEventListener ('transitionend', function handler () {
//           logo.src = 'assets/img/logo.gif';
//           logo.classList.remove ('fade-out');
//           logo.classList.add ('fade-in');
//           logo.removeEventListener ('transitionend', handler);
//         });
//       }
//     });
//   };

//   const observer = new IntersectionObserver (callback, opciones);
//   observer.observe (bgGradTrigger);
// }

// // Ejecutar la función después de que el DOM esté cargado
// document.addEventListener ('DOMContentLoaded', cambiarLogoAlPasarSobreBgGrad);

// assets/js/swiper.js

// assets/js/swiper.js

document.addEventListener ('DOMContentLoaded', function () {
  const logo = document.getElementById ('logo');
  const bgGradSections = document.querySelectorAll ('.bg-grad');
  const header = document.querySelector ('header');
  const headerHeight = header.offsetHeight;

  if (!logo || bgGradSections.length === 0) {
    // Si no hay logo o no hay secciones con 'bg-grad', no hacemos nada
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: `-${headerHeight}px 0px 0px 0px`, // Ajustar para considerar la altura del header
    threshold: 0.1, // Dispara cuando cualquier parte de la sección entra en el viewport ajustado
  };

  const observerCallback = (entries, observer) => {
    entries.forEach (entry => {
      if (entry.isIntersecting) {
        // La sección 'bg-grad' está intersectando el punto de referencia (logo)
        cambiarLogo (true);
      } else {
        // La sección 'bg-grad' ya no está intersectando el punto de referencia
        cambiarLogo (false);
      }
    });
  };

  const observer = new IntersectionObserver (observerCallback, observerOptions);

  bgGradSections.forEach (section => {
    observer.observe (section);
  });

  function cambiarLogo (cambiar) {
    if (cambiar) {
      // Añadir clase 'hidden' para iniciar la transición de opacidad
      logo.classList.add ('hidden');
      // Cambiar la imagen después de la transición
      setTimeout (() => {
        logo.src = 'assets/img/logo-w.gif';
        logo.classList.remove ('hidden');
      }, 500); // Debe coincidir con la duración de la transición en CSS
    } else {
      // Añadir clase 'hidden' para iniciar la transición de opacidad
      logo.classList.add ('hidden');
      // Revertir la imagen después de la transición
      setTimeout (() => {
        logo.src = 'assets/img/logo.gif';
        logo.classList.remove ('hidden');
      }, 500);
    }
  }

  // Establecer estado inicial del logo
  bgGradSections.forEach (section => {
    const rect = section.getBoundingClientRect ();
    if (rect.top < headerHeight && rect.bottom > 0) {
      // La sección está actualmente debajo del logo
      cambiarLogo (true);
    } else {
      cambiarLogo (false);
    }
  });
});
