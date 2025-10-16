const scrollBtn = document.getElementById('scrollToTop');

// Показ кнопки при скролі
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

// Скрол до верху при кліку
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Ховати кнопку, якщо відкрите модальне
function toggleScrollBtn(show) {
  if (show) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
}

// Припустимо, у тебе модалки з класом .modal і відкритий стан .open
const modals = document.querySelectorAll('.modal');

modals.forEach(modal => {
  const observer = new MutationObserver(() => {
    const isOpen = modal.classList.contains('open');
    toggleScrollBtn(!isOpen && window.scrollY > 300);
  });
  observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
});
