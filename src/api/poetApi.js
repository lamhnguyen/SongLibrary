import { getItems, saveItem, deleteItem } from "./apiHelper";

const baseUrl = process.env.API_URL + "/poets/";

export function getPoets() {
  return getItems(baseUrl);
}

export function savePoet(poet) {
  return saveItem(baseUrl, poet);
}

export function deletePoet(poetId) {
  return deleteItem(baseUrl, poetId);
}
