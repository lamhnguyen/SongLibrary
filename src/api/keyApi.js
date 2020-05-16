import { getItems } from "./apiHelper";

const baseUrl = process.env.API_URL + "/keys/";

export function getKeys() {
  return getItems(baseUrl);
}
