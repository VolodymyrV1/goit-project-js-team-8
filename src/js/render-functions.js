import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});


// Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.

export function createGallery(images) {
    const gallery = document.querySelector(".gallery");
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
            <li class="photo-card">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}"  class="img-card"/>
                </a>
                <div class="photo-info">
                    <div class="info-item">
                        <span class="label">Likes</span>
                        <span class="value">${likes}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Views</span>
                        <span class="value">${views}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Comments</span>
                        <span class="value">${comments}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Downloads</span>
                        <span class="value">${downloads}</span>
                    </div>
                </div>          
            </li>
            `).join("");
    
    gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();       
}



// Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
export function clearGallery() {
    document.querySelector(".gallery").innerHTML = "";
}

// Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
export function showLoader() {
    document.querySelector(".loader").classList.remove("hidden");
}


// Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
export function hideLoader() {
    document.querySelector(".loader").classList.add("hidden");
}

// Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more. Нічого не повертає.
export function showLoadMoreButton() {
    document.querySelector(".moreBtn").classList.remove("hidden");

}

// Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more. Нічого не повертає.
export function hideLoadMoreButton() {
    document.querySelector(".moreBtn").classList.add("hidden");
    
}