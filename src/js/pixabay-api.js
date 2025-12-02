import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "53352964-615700aa740aed06d1987d27c";

/**
 * 
 * @param {string} query
 * @returns {Promise<Object>}
 */
export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
      },
    })
    .then(response => response.data);
}