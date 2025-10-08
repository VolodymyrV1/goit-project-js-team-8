import './css/comon.css';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import getImagesByQuery, { per_page } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";


const form = document.querySelector(".form");
const moreBtn = document.querySelector(".moreBtn")

let searchResult;

let page;


form.addEventListener("submit", handlerSubmit);
moreBtn.addEventListener("click", onLoadMore);

async function handlerSubmit(event) {
    event.preventDefault();
    page = 1;

    clearGallery();
    searchResult = event.target.elements['search-text'].value.trim();

    if (searchResult === "") {
        showToast("Sorry, you didn’t enter any value!");
        form.reset();
        return;
    }

    showLoader();
    

    try {
        const data = await getImagesByQuery(searchResult, page);
        
        if (data.hits.length === 0) {
                showToast("Sorry, there are no images matching your search query. Please try again!");
                hideLoadMoreButton();
                return;
            }       
        createGallery(data.hits);         

        if (checkLastPage(data, page, per_page)) {
            endOfResults();
        } else {
            showLoadMoreButton();
            }         

    } catch (error) {
        showToast(`EROR, ${error}`);
        console.log(error);
        hideLoadMoreButton();
         
    } finally {
        hideLoader(); 
        form.reset();
    }        
    
}

async function onLoadMore() {
    page += 1;
    moreBtn.disabled = true;
    showLoader();

        try {
            const data = await getImagesByQuery(searchResult, page);
            
            createGallery(data.hits);
            scrollGallery();
            if (checkLastPage(data, page, per_page)) {
                endOfResults();
            }

        } catch (error) {
            showToast(`EROR, ${error}`);
            console.log(error);               
        } finally {           
            moreBtn.disabled = false;
            hideLoader();
        }   
}



function showToast(message, backgroundColor = '#EF4040', showIcon = true) {
    const options = {
        message,
        position: 'topRight',
        backgroundColor,
        messageColor: '#ffffff',
    };

    if (!showIcon) {
        options.icon = false;
    }

    iziToast.error(options);
}




function checkLastPage(data, page, per_page) {
    const totalPage = Math.ceil(data.totalHits / per_page);
    return page >= totalPage;    
}


function endOfResults() {
    hideLoadMoreButton();
    showToast("We're sorry, but you've reached the end of search results.", "#3A86FF", false);
}

function scrollGallery() {
    const card = document.querySelector(".gallery .photo-card");
    if (!card) {
        return;
    }

    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth"
    });
}
    
