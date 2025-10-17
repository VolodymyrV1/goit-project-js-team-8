const scrollBtn = document.getElementById('scrollToTop');

// Показ кнопки при скролі
window.addEventListener('scroll', () => {
  if (window.scrollY > 300 && document.body.style.overflow !== 'hidden') {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

// Скрол до верху при кліку
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Спостереження за зміною overflow у body
const observer = new MutationObserver(() => {
  if (document.body.style.overflow === 'hidden') {
    scrollBtn.classList.remove('show');
  } else if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  }
});

observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
