import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function alertReducer(state = initialState.alert, action) {
  const { infoMessage, errorMessage } = action;

  if (action.type == types.SHOW_INFO || infoMessage) {
    return {
      ...state,
      infoMessage,
    };
  } else if (action.type === types.DISMISS_INFO) {
    return {
      ...state,
      infoMessage: null,
    };
  } else if (action.type == types.SHOW_ERROR || errorMessage) {
    return {
      ...state,
      errorMessage,
    };
  } else if (action.type === types.DISMISS_ERROR) {
    return {
      ...state,
      errorMessage: null,
    };
  }
  return state;
}
