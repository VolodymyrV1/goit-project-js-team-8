document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feedback-cards .card');
  const dots = document.querySelectorAll('.dot');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');

  let currentIndex = 0;

  function getCardsPerPage() {
    const width = window.innerWidth;
    if (width <= 400) {
      return 1; // мобильный телефон
    } else if (width <= 768) {
      return 2; // планшет
    } else {
      return 3; // десктоп
    }
  }

  function getTotalPages(cardsPerPage) {
    const width = window.innerWidth;
    if (width > 768) {
      return 4; // Фиксируем 4 страницы для десктопа
    } else {
      // В остальных случаях вычисляем точно
      return Math.ceil(cards.length / cardsPerPage);
    }
  }

  function updateView() {
    const cardsPerPage = getCardsPerPage();
    const totalPages = getTotalPages(cardsPerPage);

    if (currentIndex >= totalPages) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalPages - 1;

    // Вычисляем, какие карточки показывать в слайде
    // Для страниц больше, чем натуральных (например страница 3 или 4 при 3 карточках) можно показать пустые или повторяющиеся карточки (если хотите)
    // Для простоты сейчас циклим по карточкам со смещением

    cards.forEach((card, i) => {
      // Индекс в общем цикле карточек с смещением currentIndex * cardsPerPage
      const start = currentIndex * cardsPerPage;
      // Вычислим относительный позиция карточки для отображения:
      const visibleIndices = [];
      for(let j = 0; j < cardsPerPage; j++) {
        visibleIndices.push((start + j) % cards.length);
      }
      const isVisible = visibleIndices.includes(i);
      card.style.display = isVisible ? 'flex' : 'none';
    });

    // Обновляем точки, активной делаем currentIndex, но если точек меньше, чем totalPages — модифицируем видимость точек
    dots.forEach((dot, i) => {
      dot.style.display = i < totalPages ? 'inline-block' : 'none';
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  leftArrow.addEventListener('click', () => {
    const cardsPerPage = getCardsPerPage();
    const totalPages = getTotalPages(cardsPerPage);
    currentIndex = (currentIndex - 1 + totalPages) % totalPages;
    updateView();
  });

  rightArrow.addEventListener('click', () => {
    const cardsPerPage = getCardsPerPage();
    const totalPages = getTotalPages(cardsPerPage);
    currentIndex = (currentIndex + 1) % totalPages;
    updateView();
  });

  window.addEventListener('resize', updateView);

  updateView();
});
