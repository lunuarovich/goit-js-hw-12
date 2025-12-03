import{a as E,S,i as a}from"./assets/vendor-CNqCr-V-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function d(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=d(e);fetch(e.href,o)}})();const q="https://pixabay.com/api/",M="53352964-615700aa740aed06d1987d27c",m=15;async function p(r,t=1){return(await E.get(q,{params:{key:M,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:m}})).data}const f=document.querySelector(".gallery"),i=document.getElementById("loader"),c=document.querySelector(".load-more"),B=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(r){const t=r.map(s=>`
      <li class="photo-card">
        <a href="${s.largeImageURL}">
          <div class="img-wrapper">
            <div class="loader img-loader"></div>
            <img
              class="gallery-image img-hidden"
              src="${s.webformatURL}"
              alt="${s.tags}"
              loading="lazy"
            />
          </div>
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${s.likes}</p>
          <p class="info-item"><b>Views</b> ${s.views}</p>
          <p class="info-item"><b>Comments</b> ${s.comments}</p>
          <p class="info-item"><b>Downloads</b> ${s.downloads}</p>
        </div>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",t),f.querySelectorAll(".photo-card").forEach(s=>{const e=s.querySelector("img"),o=s.querySelector(".img-loader");e.addEventListener("load",()=>{o&&o.remove(),e.classList.remove("img-hidden"),e.classList.add("img-visible")}),e.addEventListener("error",()=>{o&&o.remove(),e.classList.remove("img-hidden"),e.classList.add("img-visible")})}),B.refresh()}function $(){f.innerHTML=""}function y(){c&&c.classList.add("hidden"),i&&i.classList.remove("hidden")}function L(){i&&i.classList.add("hidden")}function v(){i&&i.classList.add("hidden"),c&&c.classList.remove("hidden")}function b(){c&&c.classList.add("hidden"),i&&i.classList.add("hidden")}const w=document.querySelector(".form"),P=w.querySelector("input"),A=document.querySelector(".load-more");let l="",n=1,h=0;w.addEventListener("submit",O);A.addEventListener("click",H);async function O(r){if(r.preventDefault(),l=P.value.trim(),n=1,!l){a.error({message:"Enter search query"});return}b(),$(),y();try{const t=await p(l,n);if(h=Math.ceil(t.totalHits/m),!t.hits||t.hits.length===0){a.info({message:"No images found"});return}g(t.hits),a.success({message:`Found ${t.totalHits} images`}),n<h?v():R()}catch(t){console.error(t),a.error({message:"Error loading data"})}finally{L()}}async function H(){b(),y(),n+=1;try{const r=await p(l,n);g(r.hits),requestAnimationFrame(()=>I()),n<Math.ceil(r.totalHits/m)?v():a.info({message:"We're sorry, but you've reached the end of search results."})}catch(r){console.error(r),a.error({message:"Load more failed"})}finally{L()}}function I(){const r=document.querySelector(".photo-card");if(!r)return;const{height:t}=r.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function R(){a.info({message:"We're sorry, but you've reached the end of search results."})}
//# sourceMappingURL=index.js.map
