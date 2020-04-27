import * as types from "./actionTypes";
import { logError } from "../api/logApi";

export function apiCallBegin() {
  return { type: types.API_CALL_BEGIN };
}

export function apiCallError(errorMessage) {
  // Handling errors in Redux action creators
  logError(errorMessage);

  return {
    type: types.API_CALL_ERROR,
    errorMessage,
  };
}
