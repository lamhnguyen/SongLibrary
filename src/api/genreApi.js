import { getItems, saveItem, deleteItem } from "./apiHelper";

const baseUrl = process.env.API_URL + "/genres/";

export function getGenres() {
  return getItems(baseUrl);
}

export function saveGenre(genre) {
  return saveItem(baseUrl, genre);
}

export function deleteGenre(genreId) {
  return deleteItem(baseUrl, genreId);
}
