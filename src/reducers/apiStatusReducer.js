import * as types from "../actions/actionTypes";
import * as errors from "../errorCodes";
import initialState from "../store/initialState";

function isApiCallSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

function isApiCallUnauthorized(error) {
  if (!error) return false;
  return error.indexOf(errors.API_401_UNAUTHORIZED) !== -1;
}

export default function apiStatusReducer(
  state = initialState.apiStatus,
  action
) {
  if (action.type == types.API_CALL_BEGIN) {
    return { ...state, count: state.count + 1 };
  } else if (isApiCallSuccess(action.type)) {
    return { ...state, count: state.count - 1 };
  } else if (action.type === types.API_CALL_ERROR) {
    return {
      ...state,
      count: state.count - 1,
      isUnauthorized: isApiCallUnauthorized(action.errorMessage),
      errorMessage: action.errorMessage,
    };
  }
  return state;
}
