import axios from 'axios'; // імпортуємо axios для запитів до API

let allBooks = []; // зберігаємо всі книги поточної категорії
let visibleBooksCount = 0; // кількість книг, які зараз відображаються
const increment = 4; // кількість карток, які додаються при натисканні "Show More"
const loadMoreBtn = document.getElementById('load-more'); // кнопка "Show More"

// елементи на сторінці
const categoryListEl = document.getElementById('category-list'); // ul для категорій
const booksListEl = document.getElementById('books-list'); // ul для книг
const catagoryCountEl = document.getElementById('category-count'); // лічильник книг
const loader = document.querySelector('.loader-back'); // прелоадер

// ---------------- ФУНКЦІЯ ЗАВАНТАЖЕННЯ КАТЕГОРІЙ ----------------
async function loadCategories() {
  if (!categoryListEl) return;

  try {
    const response = await axios.get(
      'https://books-backend.p.goit.global/books/category-list'
    );

    let categories = response.data;

    // сортуємо категорії за алфавітом
    categories.sort((a, b) => a.list_name.localeCompare(b.list_name));

    // додаємо пункт "All categories" на початок
    const allCategories = [
      { list_name: 'All categories' },
      ...categories.filter(cat => cat.list_name && cat.list_name.trim() !== ''),
    ];

    // генеруємо HTML для категорій
    const markup = allCategories
      .map(({ list_name }) => `<li class="category-item">${list_name}</li>`)
      .join('');

    categoryListEl.innerHTML = markup;

    // робимо першу категорію активною
    const firstCategory = categoryListEl.querySelector('.category-item');
    if (firstCategory) firstCategory.classList.add('active');

    // обробник кліку по категорії
    categoryListEl.addEventListener('click', e => {
      const li = e.target.closest('.category-item');
      if (!li) return;

      // знімаємо активність з усіх
      categoryListEl
        .querySelectorAll('.category-item')
        .forEach(item => item.classList.remove('active'));

      // додаємо активність обраній
      li.classList.add('active');

      const category = li.textContent;

      // завантажуємо книги нової категорії
      loadBooksByCategory(category);

      // закриваємо список на мобільній версії
      if (window.innerWidth < 1440) {
        categoryListEl.classList.remove('show');
      }
    });

    // кнопка "Categories" для мобільного
    const dropdownBtn = document.querySelector('.dropdown-btn');

    if (dropdownBtn && categoryListEl) {
      dropdownBtn.addEventListener('click', () => {
        categoryListEl.classList.toggle('show');
      });

      // при ресайзі — прибираємо відкриття
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          categoryListEl.classList.remove('show');
        }
      });
    }

    // завантажуємо книги для "All categories" за замовчуванням
    loadBooksByCategory('All categories');
  } catch (error) {
    console.error('Помилка при завантаженні категорій:', error);
  }
}

// ---------------- ФУНКЦІЯ ЗАВАНТАЖЕННЯ КНИГ ----------------
async function loadBooksByCategory(category) {
  if (!booksListEl) return;

  try {
    showLoader();
    let url;

    // формуємо URL залежно від категорії
    if (category === 'All categories') {
      url = 'https://books-backend.p.goit.global/books/top-books';
    } else {
      url = `https://books-backend.p.goit.global/books/category?category=${encodeURIComponent(
        category
      )}`;
    }

    const response = await axios.get(url);
    let books = response.data;

    // якщо "All categories" — плоский список
    if (category === 'All categories') {
      books = books.flatMap(item => item.books);
    } else {
      books = books.flat();
    }

    // видаляємо дублікати
    books = books.filter(
      (book, index, self) =>
        index === self.findIndex(b => b.title === book.title)
    );

    allBooks = books;

    // визначаємо початкову кількість карток
    const screenWidth = window.innerWidth;
    const initialCount = screenWidth < 1440 ? 10 : 24;

    // скидаємо поточну кількість видимих карток
    visibleBooksCount = Math.min(initialCount, allBooks.length);

    // 👉 очищаємо список перед першим рендером (НОВА КАТЕГОРІЯ)
    booksListEl.innerHTML = '';

    // викликаємо рендер тільки видимих карток
    renderBooks(false); // false — щоб не перезаливати, а додавати
    toggleLoadMoreButton();
  } catch (error) {
    console.error('Помилка при завантаженні книг:', error);
  } finally {
    hideLoader();
  }
}

// ---------------- ФУНКЦІЯ РЕНДЕРУ КНИГ ----------------
function renderBooks(append = false) {
  // ⚡ append = false => очищуємо список (нове завантаження категорії)
  // ⚡ append = true => додаємо до наявних (при Show More)

  const booksToShow = allBooks.slice(
    append ? booksListEl.children.length : 0, // якщо додаємо — починаємо з останнього індексу
    visibleBooksCount
  );

  const markup = booksToShow
    .map(book => {
      const title = book.title ? book.title.toLowerCase() : 'без назви';
      const author = book.author
        ? book.author.toLowerCase()
        : 'невідомий автор';
      const price = book.price || 'немає ціни';
      const bookId = book._id;
      const imageUrl =
        book.book_image || 'https://via.placeholder.com/227x322?text=No+Image';

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

  // 🟢 якщо append === true — додаємо в кінець, інакше — перезаписуємо список
  if (append) {
    booksListEl.insertAdjacentHTML('beforeend', markup);
  } else {
    booksListEl.innerHTML = markup;
  }

  // оновлюємо лічильник
  if (catagoryCountEl) {
    catagoryCountEl.textContent = `Показано ${booksListEl.children.length} з ${allBooks.length}`;
  }
}

// ---------------- КНОПКА "SHOW MORE" ----------------
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    // додаємо нові картки, не очищаючи попередні
    visibleBooksCount = Math.min(
      visibleBooksCount + increment,
      allBooks.length
    );

    renderBooks(true); // 👉 true — додаємо, а не перерендерюємо все
    toggleLoadMoreButton();

    loadMoreBtn.blur(); // знімаємо фокус
  });
}

// ---------------- ПОКАЗ/ПРИХОВАННЯ КНОПКИ ----------------
function toggleLoadMoreButton() {
  if (!loadMoreBtn) return;
  if (visibleBooksCount >= allBooks.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }

  // оновлюємо текст лічильника
  if (catagoryCountEl) {
    catagoryCountEl.textContent = `Показано ${visibleBooksCount} з ${allBooks.length}`;
  }
}

// ---------------- ОБРОБКА РЕСАЙЗУ ----------------
window.addEventListener('resize', () => {
  if (!allBooks.length) return;

  const screenWidth = window.innerWidth;
  const newInitial = screenWidth < 1440 ? 10 : 24;

  if (visibleBooksCount < newInitial) {
    visibleBooksCount = Math.min(newInitial, allBooks.length);
    renderBooks(false); // при ресайзі — оновлюємо список
    toggleLoadMoreButton();
  }
});

// ---------------- ПРИ ЗАВАНТАЖЕННІ DOM ----------------
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
});

// ---------------- ЛОАДЕР ----------------
function showLoader() {
  if (loader) loader.style.display = 'flex';
}
function hideLoader() {
  if (loader) loader.style.display = 'none';
}
