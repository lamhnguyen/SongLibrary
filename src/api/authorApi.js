import { getItems, saveItem, deleteItem } from "./apiHelper";

const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  return getItems(baseUrl);
}

export function saveAuthor(author) {
  return saveItem(baseUrl, author);
}

export function deleteAuthor(authorId) {
  return deleteItem(baseUrl, authorId);
}
