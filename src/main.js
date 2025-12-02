import { getImagesByQuery, PER_PAGE } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector("input");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
let totalPages = 0;

form.addEventListener("submit", onSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onSubmit(e) {
  e.preventDefault();
  query = input.value.trim();
  page = 1;

  if (!query) {
    iziToast.error({ message: "Enter search query" });
    return;
  }

  hideLoadMoreButton();
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalPages = Math.ceil(data.totalHits / PER_PAGE);

    if (data.hits.length === 0) {
      iziToast.info({ message: "No images found" });
      return;
    }

    createGallery(data.hits);
    iziToast.success({ message: `Found ${data.totalHits} images` });

    if (page < totalPages) showLoadMoreButton();
    else showEndMessage();
  } catch (error) {
    iziToast.error({ message: "Error loading data" });
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  hideLoadMoreButton();
  showLoader();

  page += 1;

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    requestAnimationFrame(() => smoothScroll());

    if (page < Math.ceil(data.totalHits / PER_PAGE)) {
      showLoadMoreButton();
    } else {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ message: "Load more failed" });
    console.error(error);
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector(".photo-card");
  if (!card) return;
  const { height } = card.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: "smooth",
  });
}

function showEndMessage() {
  iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
}
