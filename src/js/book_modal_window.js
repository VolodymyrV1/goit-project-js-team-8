import axios from 'axios';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const httpBookId = async id => {
  const response = await axios.get(
    `https://books-backend.p.goit.global/books/${id}`
  );
  return response;
};

const loadMoreBtn = document.querySelector('#load-more');
const countBlock = document.querySelector('.count-block');
const bookCrdAuthor = document.querySelector('.book-crd-author');
const bookCrdTitle = document.querySelector('.book-crd-title');
const image = document.querySelector('.image');
const closeIcon = document.querySelector('.close-btn');
const modalBack = document.querySelector('.modal_back');
const bookCrdTxt = document.querySelector('.book-crd-txt');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const divCount = document.querySelector('.txt-count');
const bookCrdPrice = document.querySelector('.book-crd-price');
const accordionElms = document.querySelector('.accordion-container');
const acDetails = document.querySelector('.txt-details');
const addBtn = document.querySelector('.add-btn');
const buyBtn = document.querySelector('.buy-btn');
let count = 1;
let price = 0;
const accordion = new Accordion(accordionElms, {
  collapse: true,
  showMultiple: true,
  duration: 400,
  //   elementClass: 'li-ac',
  triggerClass: 'ac-title',
  //   panelClass: 'content-ac',
  //   activeClass: 'ac-active',
  onOpen: currElement => {
    currElement.querySelector('.icon-ac-bloc').classList.add('rotate');
  },
  onClose: currElement => {
    currElement.querySelector('.icon-ac-bloc').classList.remove('rotate');
  },
});

const renderBookModal = async id => {
  try {
    const response = await httpBookId(id);
    const book = response.data;
    price += book.price;
    image.setAttribute('src', `${book.book_image}`);
    image.setAttribute('alt', `${book.title}`);
    bookCrdTitle.textContent = book.title;
    bookCrdAuthor.textContent = book.author;
    bookCrdPrice.textContent = `$${book.price}`;
    divCount.textContent = `${String(count)}`;

    acDetails.textContent = book.description;
    accordion.update();
  } catch (error) {
    document.querySelector('.error').classList.add('is-open');
    document.querySelector('.modal').style.overflow = 'hidden';
    iziToast.error({
      title: 'Error',
      message: 'Not found 404',
      position: 'topCenter',
    });
  }
};

countBlock.addEventListener('click', e => {
  if (e.target === minus) {
    count--;
    console.log('-');
  } else if (e.target === plus) {
    count++;
    console.log('+');
  }
  count === 0 ? (minus.disabled = true) : (minus.disabled = false);
  divCount.textContent = `${String(count)}`;
  bookCrdPrice.textContent = `$${String(count * Number(price))}`;
});

closeIcon.addEventListener('click', e => {
  closeModalBook();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModalBook();
  }
});

const openModalBook = id => {
  modalBack.classList.add('is-open');
  renderBookModal(id);
};

const closeModalBook = () => {
  modalBack.classList.remove('is-open');
  resetFunc();
};

const resetFunc = () => {
  if (image.hasAttribute('src') && image.hasAttribute('alt')) {
    image.removeAttribute('src');
    image.removeAttribute('alt');
    bookCrdTitle.textContent = '';
    bookCrdAuthor.textContent = '';
    bookCrdPrice.textContent = `$0`;
  }
  price = 0;
  count = 1;
  divCount.textContent = '';
  accordion.destroy();
  document.querySelector('.error').classList.remove('is-open');
  document.querySelector('.modal').style.overflow = 'auto';
};

addBtn.addEventListener('click', e => {
  iziToast.info({
    title: `${count} ${count === 1 ? 'book' : 'books'} "${
      bookCrdTitle.textContent
    }" by author ${bookCrdAuthor.textContent} Added`,
  });
});

buyBtn.addEventListener('click', e => {
  iziToast.success({
    title: 'Instant pay',
  });
  setTimeout(() => {
    closeModalBook();
  }, 1000);
});

loadMoreBtn.addEventListener('click', e => {
  openModalBook('65fc3c9ca957e5c1ae05b6b0');
});
