// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {

  /* ===============================
   * Mobile Navigation Toggle
   * =============================== */
  const nav = document.querySelector('nav ul');
  const toggleBtn = document.createElement('button');
  toggleBtn.innerText = 'Menu';
  toggleBtn.classList.add('nav-toggle');

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggleBtn.classList.toggle('active');
  });

  document.querySelector('header').insertBefore(toggleBtn, nav);

  /* ===============================
   * Smooth Scrolling for Anchor Links
   * =============================== */
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50, // Adjust this offset as per your header height
          behavior: 'smooth'
        });
      }
    });
  });

  /* ===============================
   * Lazy Loading of Images
   * =============================== */
  const lazyImages = document.querySelectorAll('img[data-src]');

  const lazyLoad = (image) => {
    const src = image.getAttribute('data-src');
    if (src) {
      image.src = src;
      image.removeAttribute('data-src');
    }
  };

  const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        lazyLoad(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  lazyImages.forEach(image => lazyObserver.observe(image));

  /* ===============================
   * Back to Top Button
   * =============================== */
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerText = '↑';
  backToTopBtn.classList.add('back-to-top');
  backToTopBtn.style.display = 'none';  // Initially hidden

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {  // Show button after scrolling down 300px
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  /* ===============================
   * Form Validation (Basic)
   * =============================== */
  const contactForm = document.querySelector('form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const name = contactForm.querySelector('input[name="name"]');
      const email = contactForm.querySelector('input[name="email"]');
      const message = contactForm.querySelector('textarea[name="message"]');

      if (!name.value || !email.value || !message.value) {
        e.preventDefault();
        alert('Please fill out all fields.');
      } else if (!validateEmail(email.value)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
      }
    });
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  /* ===============================
   * Dark Mode Toggle (Optional Feature)
   * =============================== */
  const darkModeToggle = document.createElement('button');
  darkModeToggle.innerText = 'Dark Mode';
  darkModeToggle.classList.add('dark-mode-toggle');
  
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      darkModeToggle.innerText = 'Light Mode';
    } else {
      darkModeToggle.innerText = 'Dark Mode';
    }
  });

  document.querySelector('header').appendChild(darkModeToggle);

  /* ===============================
   * Fade-in Effect for Content (Optional)
   * =============================== */
  const fadeInElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  fadeInElements.forEach(element => fadeObserver.observe(element));

});

/* ===============================
 * Helper Functions
 * =============================== */

/* Throttle function to improve performance of scroll/resize events */
function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  };
}
