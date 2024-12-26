document.querySelectorAll ('.scroll-link').forEach (link => {
  link.addEventListener ('click', function (e) {
    e.preventDefault ();

    const targetId = this.getAttribute ('href').slice (1);
    const targetElement = document.getElementById (targetId);

    if (targetElement) {
      const offsetTop =
        targetElement.getBoundingClientRect ().top + window.pageYOffset - 110;

      window.scrollTo ({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

document.addEventListener ('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll ('.scroll-animate');
  let delay = 0;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05,
  };

  const observer = new IntersectionObserver ((entries, observer) => {
    entries.forEach (entry => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty ('--delay', `${delay}s`);
        entry.target.classList.add ('visible');
        delay += 0.025;
        observer.unobserve (entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach (el => {
    observer.observe (el);
  });
});
