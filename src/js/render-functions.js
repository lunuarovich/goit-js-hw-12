import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector(".gallery");
const loaderEl = document.getElementById("loader");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const markup = images
    .map(
      img => `
    <li class="photo-card">
      <a class="gallery-link" href="${img.largeImageURL}">
        
        <div class="img-wrapper">
          <div class="loader img-loader"></div>

          <img 
            class="gallery-image img-hidden"
            src="${img.webformatURL}" 
            alt="${escapeHtml(img.tags)}"
            loading="lazy"
          />
        </div>

      </a>

      <div class="info">
        <p class="info-item"><b>Likes</b><span>${img.likes}</span></p>
        <p class="info-item"><b>Views</b><span>${img.views}</span></p>
        <p class="info-item"><b>Comments</b><span>${img.comments}</span></p>
        <p class="info-item"><b>Downloads</b><span>${img.downloads}</span></p>
      </div>
    </li>`
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);

  const cards = document.querySelectorAll(".photo-card");

  cards.forEach(card => {
    const img = card.querySelector("img");
    const loader = card.querySelector(".img-loader");

    img.onload = () => {
      loader.remove();
      img.classList.remove("img-hidden");
      img.classList.add("img-visible");
    };
  });

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = "";
}

export function showLoader() {
  loaderEl.classList.add("visible");
}

export function hideLoader() {
  loaderEl.classList.remove("visible");
}

function escapeHtml(text = "") {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}