import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(
  state = initialState.apiStatus,
  action
) {
  if (action.type == types.API_CALL_BEGIN) {
    return { ...state, count: state.count + 1 };
  } else if (actionTypeEndsInSuccess(action.type)) {
    return { ...state, count: state.count - 1 };
  } else if (action.type === types.API_CALL_ERROR) {
    return {
      ...state,
      count: state.count - 1,
      errorMessage: action.errorMessage,
    };
  }
  return state;
}
