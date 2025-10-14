document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.feedback-cards', {
    slidesPerView: 1,
    spaceBetween: 24,
    slidesPerGroup: 1, // <-- изменим ниже через breakpoints
    speed: 600, // <-- более плавная прокрутка
    keyboard: { enabled: true, onlyInViewport: true },
    mousewheel: true,
    simulateTouch: true,
    breakpoints: {
      375: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
      768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 }
    }
  });

  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const dots = document.querySelectorAll('.dot');

  function slidesPerPage() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1440) return 2;
    return 3;
  }

  function updateControls() {
    const pageIndex = Math.floor(swiper.activeIndex / slidesPerPage());
    dots.forEach((dot, i) => dot.classList.toggle('active', i === Math.min(pageIndex, dots.length - 1)));

    leftArrow.disabled = swiper.isBeginning;
    rightArrow.disabled = swiper.isEnd;
    leftArrow.classList.toggle('disabled', swiper.isBeginning);
    rightArrow.classList.toggle('disabled', swiper.isEnd);
  }

  leftArrow.addEventListener('click', () => swiper.slidePrev());
  rightArrow.addEventListener('click', () => swiper.slideNext());

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const targetIndex = Math.floor(i * swiper.slides.length / dots.length);
      swiper.slideTo(targetIndex);
    });
  });

  swiper.on('slideChange', updateControls);
  window.addEventListener('resize', updateControls);

  updateControls();
});
