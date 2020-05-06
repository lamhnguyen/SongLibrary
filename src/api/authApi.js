import { handleResponse, handleError } from "./apiHelper";

const baseUrl = process.env.API_URL + "/users/";

export async function login(user) {
  fetch(baseUrl + "/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}
