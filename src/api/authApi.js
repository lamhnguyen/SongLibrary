import { handleResponse, handleError } from "./apiHelper";

const baseUrl = process.env.API_URL + "/users/";

export function saveUser(user) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}
