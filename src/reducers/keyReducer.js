import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function keyReducer(state = initialState.keys, action) {
  switch (action.type) {
    case types.LOAD_KEYS_SUCCESS:
      return action.keys;
    default:
      return state;
  }
}
