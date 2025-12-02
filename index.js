import{a as w,S,i as n}from"./assets/vendor-CNqCr-V-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const E="https://pixabay.com/api/",q="53352964-615700aa740aed06d1987d27c",M=15;async function u(s,t=1){return(await w.get(E,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:M}})).data}const m=document.querySelector(".gallery"),f=document.getElementById("loader"),p=document.querySelector(".load-more"),B=new S(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){const t=s.map(o=>`
      <li class="photo-card">
        <a href="${o.largeImageURL}">
          <div class="img-wrapper">
            <div class="loader img-loader"></div>
            <img
              class="gallery-image img-hidden"
              src="${o.webformatURL}"
              alt="${o.tags}"
              loading="lazy"
            />
          </div>
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${o.likes}</p>
          <p class="info-item"><b>Views</b> ${o.views}</p>
          <p class="info-item"><b>Comments</b> ${o.comments}</p>
          <p class="info-item"><b>Downloads</b> ${o.downloads}</p>
        </div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",t),document.querySelectorAll(".photo-card").forEach(o=>{const a=o.querySelector("img"),e=o.querySelector(".img-loader");a.onload=()=>{e.remove(),a.classList.add("img-visible"),a.classList.remove("img-hidden")}}),B.refresh()}function $(){m.innerHTML=""}function g(){f.classList.remove("hidden")}function y(){f.classList.add("hidden")}function P(){p.classList.remove("hidden")}function L(){p.classList.add("hidden")}const b=document.querySelector(".form"),A=b.querySelector("input"),O=document.querySelector(".load-more");let c="",i=1,d=0;b.addEventListener("submit",H);O.addEventListener("click",I);async function H(s){if(s.preventDefault(),c=A.value.trim(),i=1,!c){n.error({message:"Enter search query"});return}L(),$(),g();try{const t=await u(c,i);if(d=Math.ceil(t.totalHits/15),t.hits.length===0){n.info({message:"No images found"});return}h(t.hits),n.success({message:`Found ${t.totalHits} images`}),i<d?P():v()}catch{n.error({message:"Error loading data"})}finally{y()}}async function I(){i+=1,g();try{const s=await u(c,i);h(s.hits),R(),i>=d&&(L(),v())}catch{n.error({message:"Load more failed"})}finally{y()}}function v(){n.info({message:"We're sorry, but you've reached the end of search results."})}function R(){const s=document.querySelector(".photo-card").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
