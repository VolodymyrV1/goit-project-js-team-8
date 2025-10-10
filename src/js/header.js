const menu = document.querySelector('.navbar-mobile');
const openBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.navbar-close-btn');

openBtn.addEventListener('click', () => {
  menu.classList.add('is-open');
});

closeBtn.addEventListener('click', () => {
  menu.classList.remove('is-open');
});


