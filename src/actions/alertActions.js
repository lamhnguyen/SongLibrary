import * as types from "./actionTypes";

export function showInfo(infoMessage) {
  return { type: types.SHOW_INFO, infoMessage };
}

export function dismissInfo() {
  return {
    type: types.DISMISS_INFO,
  };
}

export function showError(errorMessage) {
  return { type: types.SHOW_ERROR, errorMessage };
}

export function dismissError() {
  return {
    type: types.DISMISS_ERROR,
  };
}
