import * as errors from "../errorCodes";
import { isJSON } from "../core/helper";

export async function handleResponse(response) {
  if (response.ok) return response.json();

  let code = "";
  const message = (await response.text()) || "Unknown error";

  // 4xx: client error, 5xx: server error
  switch (response.status) {
    case 401:
      code = errors.API_401_UNAUTHORIZED;
      break;
    case 403:
      code = errors.API_403_FORBIDDEN;
      break;
    case 404:
      code = errors.API_404_NOT_FOUND;
      break;
    case 500:
      code = errors.API_500_SERVER_ERROR;
      break;
    default:
      code = `API_${response.status}_UNKNOWN_ERROR`;
      break;
  }

  throw new Error(
    JSON.stringify({
      code,
      message,
    })
  );
}

export function handleError(error) {
  throw error;
}

export function getItems(baseUrl) {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getItem(baseUrl, id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function getItemBySlug(baseUrl, slug) {
  return fetch(baseUrl + slug)
    .then(handleResponse)
    .catch(handleError);
}

export function saveItem(baseUrl, item) {
  return fetch(baseUrl + (item.id || ""), {
    method: item.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteItem(baseUrl, id) {
  return fetch(baseUrl + id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

export function getErrorMessage(error) {
  var message = error.message || error;
  return isJSON(message)
    ? JSON.parse(message).message || "Unknown error"
    : message;
}
