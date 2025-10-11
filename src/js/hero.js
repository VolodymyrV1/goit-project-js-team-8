const heroSwiper = new Swiper('#hero-swiper', {
  slidesPerView: 1,
  loop: false,
  speed: 600,
  on: {
    slideChange: updateHeroNavButtons,
  },
});

const heroPrev = document.getElementById('hero-prev');
const heroNext = document.getElementById('hero-next');

heroPrev.addEventListener('click', () => heroSwiper.slidePrev());
heroNext.addEventListener('click', () => heroSwiper.slideNext());

function updateHeroNavButtons() {
  heroPrev.disabled = heroSwiper.isBeginning;
  heroNext.disabled = heroSwiper.isEnd;
}

updateHeroNavButtons();

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero_slide');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
  }

  showSlide(currentIndex);

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      showSlide(currentIndex);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      showSlide(currentIndex);
    }
  });
});
