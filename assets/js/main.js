// JavaScript functionality for the blog website

document.addEventListener('DOMContentLoaded', function() {
  // Toggle mobile navigation
  const nav = document.querySelector('nav ul');
  const toggleBtn = document.createElement('button');
  toggleBtn.innerText = 'Menu';
  toggleBtn.classList.add('nav-toggle');

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  document.querySelector('header').insertBefore(toggleBtn, nav);
});
