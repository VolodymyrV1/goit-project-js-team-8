// const menu = document.querySelector('.navbar-mobile');
// const openBtn = document.querySelector('.menu-btn');
// const closeBtn = document.querySelector('.navbar-close-btn');

// openBtn.addEventListener('click', () => {
//   menu.classList.add('is-open');
// });

// closeBtn.addEventListener('click', () => {
//   menu.classList.remove('is-open');
// });


const menu = document.querySelector('.navbar-mobile');
const openBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.navbar-close-btn');
const navLinks = document.querySelectorAll('.navbar-nav-link'); // усі посилання меню

// Відкрити меню
openBtn.addEventListener('click', () => {
  menu.classList.add('is-open');
  document.body.classList.add('menu-open'); // блокує скрол сторінки
});

// Закрити меню по хрестику
closeBtn.addEventListener('click', () => {
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
});

// Закрити меню при кліку на будь-яке посилання
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});
