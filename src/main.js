import { getImagesByQuery } from "./js/pixabay-api.js";
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
    totalPages = Math.ceil(data.totalHits / 15);

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
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    smoothScroll();

    if (page >= totalPages) {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch {
    iziToast.error({ message: "Load more failed" });
  } finally {
    hideLoader();
  }
}

function showEndMessage() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
  });
}

function smoothScroll() {
  const cardHeight = document
    .querySelector(".photo-card")
    .getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}