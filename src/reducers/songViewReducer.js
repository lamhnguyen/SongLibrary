import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function songViewReducer(state = initialState.songs, action) {
  switch (action.type) {
    case types.LOAD_SONGS_SUCCESS:
      return action.result.songs;
    default:
      return state;
  }
}
