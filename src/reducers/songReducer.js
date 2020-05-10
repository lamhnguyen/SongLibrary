import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function songReducer(state = initialState.song, action) {
  switch (action.type) {
    case types.LOAD_SONG_SUCCESS:
      return action.song;
    case types.CREATE_SONG_SUCCESS:
      return action.song;
    case types.UPDATE_SONG_SUCCESS:
      return action.song;
    case types.DELETE_SONG_SUCCESS:
      return null;
    default:
      return state;
  }
}
