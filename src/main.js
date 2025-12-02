import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const rawQuery = input.value;
  const query = rawQuery.trim();

  if (!query) {
    iziToast.error({
      title: "Error",
      message: "Search field cannot be empty. Please enter a search term.",
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (!data || !Array.isArray(data.hits)) {
        iziToast.error({
          title: "Error",
          message: "Unexpected response from server.",
        });
        return;
      }

      if (data.hits.length === 0) {
        iziToast.info({
          title: "No results",
          message:
            "Sorry, there are no images matching your search query. Please try again!",
        });
        return;
      }

      createGallery(data.hits);

      iziToast.success({
        title: "Success",
        message: `Found ${data.totalHits} images.`,
        timeout: 2000,
      });
    })
    .catch(error => {
      console.error("Error fetching images:", error);
      iziToast.error({
        title: "Request failed",
        message: "Something went wrong while fetching images. Please try again.",
      });
    })
    .finally(() => {
      hideLoader();
    });
}