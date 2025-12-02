import{a as d,S as m,i}from"./assets/vendor-MgecxatS.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&e(n)}).observe(document,{childList:!0,subtree:!0});function a(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function e(r){if(r.ep)return;r.ep=!0;const t=a(r);fetch(r.href,t)}})();const p="https://pixabay.com/api/",f="53352964-615700aa740aed06d1987d27c";function g(s){return d.get(p,{params:{key:f,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(o=>o.data)}const l=document.querySelector(".gallery"),c=document.getElementById("loader"),y=new m(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){if(!Array.isArray(s)||s.length===0)return;const o=s.map(e=>`
    <li class="photo-card">
      <a class="gallery-link" href="${e.largeImageURL}">
        
        <div class="img-wrapper">
          <div class="loader img-loader"></div>

          <img 
            class="gallery-image img-hidden"
            src="${e.webformatURL}" 
            alt="${S(e.tags)}"
            loading="lazy"
          />
        </div>

      </a>

      <div class="info">
        <p class="info-item"><b>Likes</b><span>${e.likes}</span></p>
        <p class="info-item"><b>Views</b><span>${e.views}</span></p>
        <p class="info-item"><b>Comments</b><span>${e.comments}</span></p>
        <p class="info-item"><b>Downloads</b><span>${e.downloads}</span></p>
      </div>
    </li>`).join("");l.insertAdjacentHTML("beforeend",o),document.querySelectorAll(".photo-card").forEach(e=>{const r=e.querySelector("img"),t=e.querySelector(".img-loader");r.onload=()=>{t.remove(),r.classList.remove("img-hidden"),r.classList.add("img-visible")}}),y.refresh()}function b(){l.innerHTML=""}function v(){c.classList.add("visible")}function L(){c.classList.remove("visible")}function S(s=""){return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const u=document.querySelector(".form"),w=u.querySelector('input[name="search-text"]');u.addEventListener("submit",A);function A(s){s.preventDefault();const a=w.value.trim();if(!a){i.error({title:"Error",message:"Search field cannot be empty. Please enter a search term."});return}b(),v(),g(a).then(e=>{if(!e||!Array.isArray(e.hits)){i.error({title:"Error",message:"Unexpected response from server."});return}if(e.hits.length===0){i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}h(e.hits),i.success({title:"Success",message:`Found ${e.totalHits} images.`,timeout:2e3})}).catch(e=>{console.error("Error fetching images:",e),i.error({title:"Request failed",message:"Something went wrong while fetching images. Please try again."})}).finally(()=>{L()})}
//# sourceMappingURL=index.js.map
