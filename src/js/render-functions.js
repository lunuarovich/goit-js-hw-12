import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector(".gallery");
const loaderEl = document.getElementById("loader");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(img => `
      <li class="photo-card">
        <a href="${img.largeImageURL}">
          <div class="img-wrapper">
            <div class="loader img-loader"></div>
            <img
              class="gallery-image img-hidden"
              src="${img.webformatURL}"
              alt="${img.tags}"
              loading="lazy"
            />
          </div>
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${img.likes}</p>
          <p class="info-item"><b>Views</b> ${img.views}</p>
          <p class="info-item"><b>Comments</b> ${img.comments}</p>
          <p class="info-item"><b>Downloads</b> ${img.downloads}</p>
        </div>
      </li>
    `)
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);

  const newCards = galleryEl.querySelectorAll(".photo-card");
  newCards.forEach(card => {
    const img = card.querySelector("img");
    const loader = card.querySelector(".img-loader");

    img.addEventListener("load", () => {
      if (loader) loader.remove();
      img.classList.remove("img-hidden");
      img.classList.add("img-visible");
    });

    img.addEventListener("error", () => {
      if (loader) loader.remove();
      img.classList.remove("img-hidden");
      img.classList.add("img-visible");
    });
  });

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = "";
}

export function showLoader() {
  if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
  if (loaderEl) loaderEl.classList.remove("hidden");
}

export function hideLoader() {
  if (loaderEl) loaderEl.classList.add("hidden");
}

export function showLoadMoreButton() {
  if (loaderEl) loaderEl.classList.add("hidden");
  if (loadMoreBtn) loadMoreBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
  if (loaderEl) loaderEl.classList.add("hidden");
}