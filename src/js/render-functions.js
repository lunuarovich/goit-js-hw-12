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

  document.querySelectorAll(".photo-card").forEach(card => {
    const img = card.querySelector("img");
    const loader = card.querySelector(".img-loader");

    img.onload = () => {
      loader.remove();
      img.classList.add("img-visible");
      img.classList.remove("img-hidden");
    };
  });

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = "";
}

export function showLoader() {
  loaderEl.classList.remove("hidden");
}

export function hideLoader() {
  loaderEl.classList.add("hidden");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("hidden");
}