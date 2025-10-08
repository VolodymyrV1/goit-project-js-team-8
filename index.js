import{a as w,S as B,i as O}from"./assets/vendor-BSTwZ_tR.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const $="52413922-df6c611514e1fbd211f3ba691",m=15;async function p(e,t=1){const{data:s}=await w("https://pixabay.com/api/",{params:{key:$,q:e,page:t,per_page:m,image_type:"photo",orientation:"horizontal",safesearch:!0}});return s}let P=new B(".gallery a",{captionsData:"alt",captionDelay:250});function h(e){const t=document.querySelector(".gallery"),s=e.map(({webformatURL:a,largeImageURL:o,tags:r,likes:i,views:b,comments:S,downloads:q})=>`
            <li class="photo-card">
                <a href="${o}">
                    <img src="${a}" alt="${r}"  class="img-card"/>
                </a>
                <div class="photo-info">
                    <div class="info-item">
                        <span class="label">Likes</span>
                        <span class="value">${i}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Views</span>
                        <span class="value">${b}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Comments</span>
                        <span class="value">${S}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Downloads</span>
                        <span class="value">${q}</span>
                    </div>
                </div>          
            </li>
            `).join("");t.insertAdjacentHTML("beforeend",s),P.refresh()}function R(){document.querySelector(".gallery").innerHTML=""}function y(){document.querySelector(".loader").classList.remove("hidden")}function g(){document.querySelector(".loader").classList.add("hidden")}function E(){document.querySelector(".moreBtn").classList.remove("hidden")}function d(){document.querySelector(".moreBtn").classList.add("hidden")}const u=document.querySelector(".form"),f=document.querySelector(".moreBtn");let l,n;u.addEventListener("submit",M);f.addEventListener("click",x);async function M(e){if(e.preventDefault(),n=1,R(),l=e.target.elements["search-text"].value.trim(),l===""){c("Sorry, you didn’t enter any value!"),u.reset();return}y();try{const t=await p(l,n);if(t.hits.length===0){c("Sorry, there are no images matching your search query. Please try again!"),d();return}h(t.hits),v(t,n,m)?L():E()}catch(t){c(`EROR, ${t}`),console.log(t),d()}finally{g(),u.reset()}}async function x(){n+=1,f.disabled=!0,y();try{const e=await p(l,n);h(e.hits),A(),v(e,n,m)&&L()}catch(e){c(`EROR, ${e}`),console.log(e)}finally{f.disabled=!1,g()}}function c(e,t="#EF4040",s=!0){const a={message:e,position:"topRight",backgroundColor:t,messageColor:"#ffffff"};s||(a.icon=!1),O.error(a)}function v(e,t,s){const a=Math.ceil(e.totalHits/s);return t>=a}function L(){d(),c("We're sorry, but you've reached the end of search results.","#3A86FF",!1)}function A(){const e=document.querySelector(".gallery .photo-card");if(!e)return;const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
