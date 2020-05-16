import { getItems, deleteItem, saveItem, getItemBySlug } from "./apiHelper";
import { slugify } from "../core/helper";

const baseUrl = process.env.API_URL + "/songs/";

export function getSongs(filter) {
  const queryParams =
    `?start=${filter.start}&pageSize=${filter.pageSize}&sort=${filter.sort}&order=${filter.order}` +
    (filter.view ? `&view=${filter.view}` : "") +
    (filter.author ? `&author=${filter.author.slug}` : "") +
    (filter.poet ? `&poet=${filter.poet.slug}` : "") +
    (filter.artist ? `&artist=${filter.artist.slug}` : "") +
    (filter.search ? `&search=${slugify(filter.search)}` : "");

  const url = baseUrl + queryParams;
  return getItems(url);
}

export function getSong(slug) {
  return getItemBySlug(baseUrl, slug);
}

export function saveSong(song) {
  return saveItem(baseUrl, song);
}

export function deleteSong(songId) {
  return deleteItem(baseUrl, songId);
}
