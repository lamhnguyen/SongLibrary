import * as types from "./actionTypes";
import { logError } from "../api/logApi";

export function apiCallBegin(api) {
  return { type: types.API_BEGIN(api) };
}

export function apiCallError(api, errorMessage) {
  // Handling errors in Redux action creators
  logError(errorMessage);

  return {
    type: types.API_ERROR(api),
    errorMessage,
  };
}
