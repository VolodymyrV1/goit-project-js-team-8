import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.events-swiper', {
  modules: [Navigation, Pagination],

  wrapperClass: 'events-list',
  slideClass: 'events-item',

  slidesPerView: 1,
  spaceBetween: 24,

  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 24 },
    1440: { slidesPerView: 3, spaceBetween: 24 },
  },

  pagination: {
    el: '.events-pagination',
    clickable: true,
    bulletElement: 'li',
    bulletClass: 'events-dot',
    bulletActiveClass: 'events-dot--active',
    renderBullet: (index, className) =>
      `<li class="${className}" aria-label="Go to slide ${
        index + 1
      }" tabindex="0"></li>`,
  },

  navigation: {
    prevEl: '.events-swipe-btn-prev',
    nextEl: '.events-swipe-btn-next',
  },

  watchOverflow: true,
});

const prevBtn = document.querySelector('.events-swipe-btn-prev');
const nextBtn = document.querySelector('.events-swipe-btn-next');

function syncDisabled() {
  const atStart = swiper.isBeginning;
  const atEnd = swiper.isEnd;

  prevBtn.toggleAttribute('disabled', atStart);
  nextBtn.toggleAttribute('disabled', atEnd);

  prevBtn.setAttribute('aria-disabled', String(atStart));
  nextBtn.setAttribute('aria-disabled', String(atEnd));
}

swiper.on('afterInit', syncDisabled);
swiper.on('slideChange', syncDisabled);
swiper.on('update', syncDisabled);
syncDisabled();



// function syncDisabled() {
//   const atStart = swiper.isBeginning;
//   const atEnd = swiper.isEnd;


//   prevBtn.toggleAttribute('disabled', atStart);
//   nextBtn.toggleAttribute('disabled', atEnd);

//   prevBtn.setAttribute('aria-disabled', String(atStart));
//   nextBtn.setAttribute('aria-disabled', String(atEnd));
// }

// swiper.on('init', syncDisabled);           
// swiper.on('slideChange', syncDisabled);    
// swiper.on('update', syncDisabled);       
// swiper.on('reachEnd', syncDisabled);      
// swiper.on('reachBeginning', syncDisabled); 

// swiper.init(); 