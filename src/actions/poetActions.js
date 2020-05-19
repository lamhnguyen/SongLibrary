import * as api from "../api/api";
import * as types from "./actionTypes";
import { asyncAction } from "./actionHelper";
import * as poetApi from "../api/poetApi";

export function loadPoetsSuccess(poets) {
  return { type: types.LOAD_POETS_SUCCESS, poets };
}

export function createPoetSuccess(poet) {
  return { type: types.CREATE_POET_SUCCESS, poet };
}

export function updatePoetSuccess(poet) {
  return { type: types.UPDATE_POET_SUCCESS, poet };
}

export function deletePoetSuccess(id) {
  return { type: types.DELETE_POET_SUCCESS, id };
}

// thunk action creator
export function loadPoets(throwIfError = false) {
  return asyncAction(
    api.LOAD_POETS,
    poetApi.getPoets,
    loadPoetsSuccess,
    throwIfError
  );
}

export function deletePoet(id, throwIfError = false) {
  return asyncAction(
    api.DELETE_POET,
    poetApi.deletePoet,
    deletePoetSuccess,
    throwIfError,
    id
  );
}

export function savePoet(poet, throwIfError = false) {
  return asyncAction(
    poet.id ? api.UPDATE_POET : api.CREATE_POET,
    poetApi.savePoet,
    poet.id ? updatePoetSuccess : createPoetSuccess,
    throwIfError,
    poet
  );
}
