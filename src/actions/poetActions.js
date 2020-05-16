import * as api from "../api/api";
import * as types from "./actionTypes";
import { apiCallBegin, apiCallError } from "./apiActions";
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
export function loadPoets() {
  return function (dispatch) {
    dispatch(apiCallBegin(api.LOAD_POETS));
    return poetApi
      .getPoets()
      .then((poets) => {
        dispatch(loadPoetsSuccess(poets));
      })
      .catch((error) => {
        const errMsg = "loadPoets failed - Error: " + error.message;
        dispatch(apiCallError(api.LOAD_POETS, errMsg));
      });
  };
}

export function deletePoet(id) {
  return function (dispatch) {
    dispatch(apiCallBegin(api.DELETE_POET));
    return poetApi
      .deletePoet(id)
      .then(() => {
        dispatch(deletePoetSuccess(id));
      })
      .catch((error) => {
        const errMsg = "deletePoet failed - Error: " + error.message;
        dispatch(apiCallError(api.DELETE_POET, errMsg));
      });
  };
}

export function savePoet(poet) {
  const saveApi = poet.id ? api.UPDATE_POET : api.CREATE_POET;
  return function (dispatch) {
    dispatch(apiCallBegin(saveApi));
    return poetApi
      .savePoet(poet)
      .then((savedPoet) => {
        dispatch(
          poet.id ? updatePoetSuccess(savedPoet) : createPoetSuccess(savedPoet)
        );
      })
      .catch((error) => {
        const errMsg = "savePoet failed - Error: " + error.message;
        dispatch(apiCallError(saveApi, errMsg));
      });
  };
}
