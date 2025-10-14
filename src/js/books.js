import axios from 'axios'; // імпортуємо axios для запитів до API

let allBooks = [];
let visibleBooksCount = 0;
const increment = 4;
const loadMoreBtn = document.getElementById('load-more');

// елементи на сторінці
const categoryListEl = document.getElementById('category-list'); // ul для категорій
const booksListEl = document.getElementById('books-list'); // ul для книг
const catagoryCountEl = document.getElementById('category-count'); // елемент для відображення кількості книг
const loader = document.querySelector('.loader-back');

// функція завантаження категорій
async function loadCategories() {
  if (!categoryListEl) return;

  try {
    const response = await axios.get(
      'https://books-backend.p.goit.global/books/category-list'
    );

    let categories = response.data;

    // сортуємо категорії за алфавітом
    categories.sort((a, b) => a.list_name.localeCompare(b.list_name));

    // додаємо пункт "All categories" на початок списку
    const allCategories = [
      { list_name: 'All categories' },
      ...categories.filter(cat => cat.list_name && cat.list_name.trim() !== ''),
    ];

    // створюємо розмітку категорій
    const markup = allCategories
      .map(({ list_name }) => `<li class="category-item">${list_name}</li>`)
      .join('');

    // очищуємо список перед вставкою (щоб не дублювалось)
    categoryListEl.innerHTML = markup;

    // робимо першу категорію активною
    const firstCategory = categoryListEl.querySelector('.category-item');
    if (firstCategory) firstCategory.classList.add('active');

    // Вибір категорії
    categoryListEl.addEventListener('click', e => {
      const li = e.target.closest('.category-item');
      if (!li) return;

      // прибираємо активний стан у всіх
      categoryListEl
        .querySelectorAll('.category-item')
        .forEach(item => item.classList.remove('active'));

      // додаємо активний стан до натиснутої
      li.classList.add('active');

      const category = li.textContent;

      // завантажуємо книги вибраної категорії
      loadBooksByCategory(category);

      // Автоматично закриваємо список на мобільному після вибору
      if (window.innerWidth < 768) {
        categoryListEl.classList.remove('show');
      }
    });

    // Кнопка розгортання категорій (мобільна версія)
    const dropdownBtn = document.querySelector('.dropdown-btn');

    if (dropdownBtn && categoryListEl) {
      dropdownBtn.addEventListener('click', () => {
        categoryListEl.classList.toggle('show');
      });

      // При зміні ширини вікна — скидаємо стан (щоб не зависло при ресайзі)
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          categoryListEl.classList.remove('show');
        }
      });
    }

    // Завантажуємо всі книги за замовчуванням
    loadBooksByCategory('All categories');
  } catch (error) {
    console.error('Помилка при завантаженні категорій:', error);
  }
}

// функція завантаження книг по категорії
async function loadBooksByCategory(category) {
  if (!booksListEl) return;

  try {
    showLoader();
    let url;
    if (category === 'All categories') {
      url = 'https://books-backend.p.goit.global/books/top-books';
    } else {
      url = `https://books-backend.p.goit.global/books/category?category=${encodeURIComponent(
        category
      )}`;
    }

    const response = await axios.get(url);
    let books = response.data;

    if (category === 'All categories') {
      books = books.flatMap(item => item.books);
    } else {
      books = books.flat();
    }

    books = books.filter(
      (book, index, self) =>
        index === self.findIndex(b => b.title === book.title)
    );

    allBooks = books;

    // Визначаємо початкову кількість книг залежно від ширини
    const screenWidth = window.innerWidth;
    const initialCount = screenWidth < 1440 ? 10 : 24;

    // Якщо зараз вже показано більше, залишаємо
    visibleBooksCount = Math.min(initialCount, allBooks.length);

    renderBooks();
    toggleLoadMoreButton();

  } catch (error) {
    console.error('Помилка при завантаженні книг:', error);
  } finally {
    hideLoader();
  }
}

function renderBooks() {
  booksListEl.innerHTML = '';
  const booksToShow = allBooks.slice(0, visibleBooksCount);

  const markup = booksToShow
    .map(book => {
      const title = book.title ? book.title.toLowerCase() : 'без назви';
      const author = book.author ? book.author.toLowerCase() : 'невідомий автор';
      const price = book.price || 'немає ціни';
      const bookId = book._id;
      const imageUrl = book.book_image || 'https://via.placeholder.com/227x322?text=No+Image';

      return `
        <li class="books-item-wraper">
          <div class="book-item-container">
            <div class="books-img-wraper">
              <img src="${imageUrl}" alt="${title}" class="books-img"/>
            </div>
            <div class="books-info-wraper">
              <div class="books-text-wraper">
                <h4>${title}</h4>
                <p>${author}</p>
              </div>
              <div class="books-price-wraper">
                <p>$${price}</p>
              </div>
            </div>
            <div class="button-wraper">
              <button type="button" class="books-button btn" id="${bookId}">Learn More</button>
            </div>
          </div>
        </li>
      `;
    })
    .join('');

  booksListEl.insertAdjacentHTML('beforeend', markup);

  if (catagoryCountEl) {
    catagoryCountEl.textContent = `Showing ${booksToShow.length} з ${allBooks.length}`;
  }
}

function toggleLoadMoreButton() {
  if (!loadMoreBtn) return;
  if (visibleBooksCount >= allBooks.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// кнопка Show More
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleBooksCount = Math.min(visibleBooksCount + increment, allBooks.length);
    renderBooks();
    toggleLoadMoreButton();
  });
}

window.addEventListener('resize', () => {
  if (!allBooks.length) return;

  const screenWidth = window.innerWidth;
  const newInitial = screenWidth < 1440 ? 10 : 24;

  if (visibleBooksCount < newInitial) {
    visibleBooksCount = Math.min(newInitial, allBooks.length);
    renderBooks();
    toggleLoadMoreButton();
  }
});


// чекаємо завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
});


function showLoader() {
  if(loader) loader.style.display = 'flex';
}

function hideLoader() {
  if(loader) loader.style.display = 'none';
}