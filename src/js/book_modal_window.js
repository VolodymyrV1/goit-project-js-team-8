import axios from 'axios';

const httpBookId = async id => {
  const response = await axios.get(
    `https://books-backend.p.goit.global/books/${id}`
  );
  return response;
};

const closeIcon = document.querySelector('.close-btn');
const modalBack = document.querySelector('#book_modal_window');
// const modal = document.querySelector('.container.modal');
const bookImg = document.querySelector('.book-img');
const bookCrdTxt = document.querySelector('.book-crd-txt');

const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const divCount = document.querySelector('.div-count');

const bookCounter = () => {
  let count = 1;
  divCount.textContent = String(count);
  minus.addEventListener('click', e => {
    count--;
    if (count <= 0) {
      count = 0;
    }
    divCount.textContent = String(count);
  });
  plus.addEventListener('click', e => {
    count++;
    divCount.textContent = String(count);
  });
};

const renderBookModal = async id => {
  try {
    const response = await httpBookId(id);
    const book = response.data;
    bookImg.insertAdjacentHTML(
      'beforeend',
      ` <img  src="${book.book_image}" alt="${book.title}" />`
    );
    bookCrdTxt.insertAdjacentHTML(
      'beforeend',
      `<h2 class="book-crd-title">${book.title}</h2>
        <p class="book-crd-txt">${book.author}</p>
        <p class="book-crd-price">$${book.price}</p>`
    );
    console.log(book.price);
    bookCounter();
  } catch (error) {}
};

https: closeIcon.addEventListener('click', e => {
  modalBack.classList.add('hidden');
  renderBookModal('68680e31ac8a51f74dd6a25d');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalBack.classList.add('hidden');
  }
});
