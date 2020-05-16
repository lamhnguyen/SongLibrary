import * as types from "../actions/actionTypes";
import * as errors from "../errorCodes";
import initialState from "../store/initialState";

function isApiCallUnauthorized(error) {
  if (!error) return false;
  return error.indexOf(errors.API_401_UNAUTHORIZED) !== -1;
}

export default function apiStatusReducer(
  state = initialState.apiStatus,
  action
) {
  if (types.IS_API_BEGIN(action.type)) {
    return { ...state, count: state.count + 1 };
  } else if (types.IS_API_SUCCESS(action.type)) {
    return { ...state, count: state.count - 1 };
  } else if (types.IS_API_ERROR(action.type)) {
    return {
      ...state,
      count: state.count - 1,
      isUnauthorized: isApiCallUnauthorized(action.errorMessage),
      errorMessage: action.errorMessage,
    };
  }
  return state;
}
