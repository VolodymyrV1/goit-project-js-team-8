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

    categories.sort((a, b) => a.list_name.localeCompare(b.list_name));

    const allCategories = [{ list_name: 'All categories' }, ...categories];

    const markup = allCategories
      .map(({ list_name }) => `<li class="category-item">${list_name}</li>`)
      .join('');

    categoryListEl.insertAdjacentHTML('beforeend', markup);

    const firstCategory = categoryListEl.querySelector('.category-item');
    if (firstCategory) firstCategory.classList.add('active');

    categoryListEl.addEventListener('click', e => {
      const li = e.target.closest('.category-item');
      if (!li) return;

      categoryListEl
        .querySelectorAll('.category-item')
        .forEach(item => item.classList.remove('active'));
      li.classList.add('active');

      const category = li.textContent;

      loadBooksByCategory(category);
    });

    loadBooksByCategory('All categories');
  } catch (error) {
    console.error('Error loading categories:', error);
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
    const screenWidth = window.innerWidth; // отримуємо ширину вікна
    const visibleCount = screenWidth < 1440 ? 10 : 24; // якщо <1440 — 10 книг, інакше — 24

    // 🔹 обрізаємо масив до потрібної кількості
    const visibleBooks = books.slice(0, visibleCount);

    booksListEl.innerHTML = '';

    const markup = visibleBooks
      .map(book => {
        const title = book.title ? book.title.toLowerCase() : 'без назви'; // текст назви малими літерами
        const author = book.author
          ? book.author.toLowerCase()
          : 'невідомий автор'; // автор малими літерами
        const price = book.price || 'немає ціни';
        const imageUrl =
          book.book_image ||
          'https://via.placeholder.com/227x322?text=No+Image';

        return `
          <li class="books-item-wraper">
            <div class="book-item-сontainer">
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

    // 🔹 оновлюємо лічильник
    if (catagoryCountEl) {
      catagoryCountEl.textContent = `Showing ${visibleBooks.length} of ${books.length}`;
    }
  } catch (error) {
    console.error('Error loading books:', error);
  }
}

// чекаємо завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
});
