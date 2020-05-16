import { getItems, saveItem, deleteItem } from "./apiHelper";

const baseUrl = process.env.API_URL + "/artists/";

export function getArtists() {
  return getItems(baseUrl);
}

export function saveArtist(artist) {
  return saveItem(baseUrl, artist);
}

export function deleteArtist(artistId) {
  return deleteItem(baseUrl, artistId);
}
