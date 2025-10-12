const heroSwiper = new Swiper('#hero-swiper', {
  slidesPerView: 1,
  loop: false,
  speed: 600,
  allowTouchMove: false,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
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

  heroPrev.classList.toggle('disabled', heroPrev.disabled);
  heroNext.classList.toggle('disabled', heroNext.disabled);
}

updateHeroNavButtons();
console.log('Swiper initialized:', heroSwiper);
