import * as api from "../api/api";
import * as types from "./actionTypes";
import { asyncAction } from "./actionHelper";
import * as keyApi from "../api/keyApi";

export function loadKeysSuccess(keys) {
  return { type: types.LOAD_KEYS_SUCCESS, keys };
}

// thunk action creator
export function loadKeys() {
  return asyncAction(api.LOAD_KEYS, keyApi.getKeys, loadKeysSuccess);
}
