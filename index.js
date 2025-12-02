import{a as S,S as q,i as a}from"./assets/vendor-CNqCr-V-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const E="https://pixabay.com/api/",M="53352964-615700aa740aed06d1987d27c",d=15;async function m(o,t=1){return(await S.get(E,{params:{key:M,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:d}})).data}const f=document.querySelector(".gallery"),h=document.getElementById("loader"),p=document.querySelector(".load-more"),B=new q(".gallery a",{captionsData:"alt",captionDelay:250});function y(o){const t=o.map(r=>`
      <li class="photo-card">
        <a href="${r.largeImageURL}">
          <div class="img-wrapper">
            <div class="loader img-loader"></div>
            <img
              class="gallery-image img-hidden"
              src="${r.webformatURL}"
              alt="${r.tags}"
              loading="lazy"
            />
          </div>
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${r.likes}</p>
          <p class="info-item"><b>Views</b> ${r.views}</p>
          <p class="info-item"><b>Comments</b> ${r.comments}</p>
          <p class="info-item"><b>Downloads</b> ${r.downloads}</p>
        </div>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",t),document.querySelectorAll(".photo-card").forEach(r=>{const n=r.querySelector("img"),e=r.querySelector(".img-loader");n.onload=()=>{e.remove(),n.classList.add("img-visible"),n.classList.remove("img-hidden")}}),B.refresh()}function $(){f.innerHTML=""}function g(){h.classList.remove("hidden")}function L(){h.classList.add("hidden")}function b(){p.classList.remove("hidden")}function v(){p.classList.add("hidden")}const w=document.querySelector(".form"),P=w.querySelector("input"),A=document.querySelector(".load-more");let c="",i=1,u=0;w.addEventListener("submit",O);A.addEventListener("click",H);async function O(o){if(o.preventDefault(),c=P.value.trim(),i=1,!c){a.error({message:"Enter search query"});return}v(),$(),g();try{const t=await m(c,i);if(u=Math.ceil(t.totalHits/d),t.hits.length===0){a.info({message:"No images found"});return}y(t.hits),a.success({message:`Found ${t.totalHits} images`}),i<u?b():R()}catch(t){a.error({message:"Error loading data"}),console.error(t)}finally{L()}}async function H(){v(),g(),i+=1;try{const o=await m(c,i);y(o.hits),requestAnimationFrame(()=>I()),i<Math.ceil(o.totalHits/d)?b():a.info({message:"We're sorry, but you've reached the end of search results."})}catch(o){a.error({message:"Load more failed"}),console.error(o)}finally{L()}}function I(){const o=document.querySelector(".photo-card");if(!o)return;const{height:t}=o.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function R(){a.info({message:"We're sorry, but you've reached the end of search results."})}
//# sourceMappingURL=index.js.map
