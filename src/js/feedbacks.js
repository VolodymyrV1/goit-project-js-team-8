document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feedback-cards .card');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const dotsContainer = document.querySelector('.dots');
  const fixedDots = 4;
  let currentIndex = 0;

  function getCardsPerPage() {
    const width = window.innerWidth;
    if (width <= 400) return 1;
    if (width <= 768) return 2;
    return 3;
  }

  function getTotalPages() {
    return Math.ceil(cards.length / getCardsPerPage());
  }

  function updateSlider() {
    const cardsPerPage = getCardsPerPage();
    const totalPages = getTotalPages();

    cards.forEach((card, i) => {
      const start = currentIndex * cardsPerPage;
      const end = start + cardsPerPage;
      card.style.display = i >= start && i < end ? 'flex' : 'none';
    });

    dotsContainer.innerHTML = '';
    for (let i = 0; i < fixedDots; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.classList.toggle('active', i === Math.min(currentIndex, fixedDots - 1));
      dot.addEventListener('click', () => {
        currentIndex = Math.floor(i * totalPages / fixedDots);
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }

    leftArrow.disabled = currentIndex === 0;
    rightArrow.disabled = currentIndex >= totalPages - 1;
  }

  leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateSlider();
  });

  rightArrow.addEventListener('click', () => {
    if (currentIndex < getTotalPages() - 1) currentIndex++;
    updateSlider();
  });

  window.addEventListener('resize', () => {
    const totalPages = getTotalPages();
    if (currentIndex >= totalPages) currentIndex = totalPages - 1;
    updateSlider();
  });

  updateSlider();
});
