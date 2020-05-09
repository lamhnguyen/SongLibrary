import { handleResponse, handleError } from "./apiHelper";

const baseUrl = process.env.API_URL + "/songs/";

export function getSongs(filter) {
  const queryParams =
    `?start=${filter.start}&pageSize=${filter.pageSize}&sort=${filter.sort}&order=${filter.order}` +
    (filter.view ? `&view=${filter.view}` : "") +
    (filter.author ? `&author=${filter.author.slug}` : "") +
    (filter.poet ? `&poet=${filter.poet.slug}` : "") +
    (filter.artist ? `&artist=${filter.artist.slug}` : "");

  const url = baseUrl + queryParams;
  console.log(url);

  return fetch(url).then(handleResponse).catch(handleError);
}

export function saveSong(song) {
  return fetch(baseUrl + (song.id || ""), {
    method: song.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(song),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSong(songId) {
  return fetch(baseUrl + songId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
