import * as api from "../api/api";
import * as types from "./actionTypes";
import { apiCallBegin, apiCallError } from "./apiActions";
import * as keyApi from "../api/keyApi";

export function loadKeysSuccess(keys) {
  return { type: types.LOAD_KEYS_SUCCESS, keys };
}

// thunk action creator
export function loadKeys() {
  return function (dispatch) {
    dispatch(apiCallBegin(api.LOAD_KEYS));
    return keyApi
      .getKeys()
      .then((keys) => {
        dispatch(loadKeysSuccess(keys));
      })
      .catch((error) => {
        const errMsg = "loadKeys failed - Error: " + error.message;
        dispatch(apiCallError(api.LOAD_KEYS, errMsg));
      });
  };
}
