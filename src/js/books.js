import axios from 'axios'; // імпортуємо axios для запитів до API

// елементи на сторінці
const categoryListEl = document.getElementById('category-list'); // ul для категорій
const booksListEl = document.getElementById('books-list'); // ul для книг
const catagoryCountEl = document.getElementById('category-count'); // елемент для відображення кількості книг

// функція завантаження категорій
export async function loadCategories() {
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

    // нормалізація структури
    if (category === 'All categories') {
      books = books.flatMap(item => item.books);
    } else {
      books = books.flat();
    }

    // унікальні книги по title
    books = books.filter(
      (book, index, self) =>
        index === self.findIndex(b => b.title === book.title)
    );

    // 🔹 визначаємо кількість книг для показу залежно від ширини екрану
    const screenWidth = window.innerWidth;
    const visibleCount = screenWidth < 1440 ? 10 : 24;

    const visibleBooks = books.slice(0, visibleCount);
    booksListEl.innerHTML = '';

    // формуємо розмітку книг
    const markup = visibleBooks
      .map(book => {
        const title = book.title ? book.title.toLowerCase() : 'без назви'; // 🟢 текст малими літерами
        const author = book.author
          ? book.author.toLowerCase()
          : 'невідомий автор';
        const price = book.price || 'немає ціни';
        const imageUrl =
          book.book_image ||
          'https://via.placeholder.com/227x322?text=No+Image';

        return `
          <li class="books-item-wraper">
            <div class="book-item-container">
              <div class="books-img-wraper">
                <img src="${imageUrl}" alt="${title}" class="books-image"/>
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
                <button type="button" class="books-button btn">Learn More</button>
              </div>
            </div>
          </li>
        `;
      })
      .join('');

    booksListEl.insertAdjacentHTML('beforeend', markup);

    // оновлюємо лічильник
    if (catagoryCountEl) {
      catagoryCountEl.textContent = `Показано ${visibleBooks.length} з ${books.length}`;
    }
  } catch (error) {
    console.error('Помилка при завантаженні книг:', error);
  }
}

// чекаємо завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
});
