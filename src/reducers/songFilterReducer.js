import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function songReducer(state = initialState.songFilter, action) {
  switch (action.type) {
    case types.CHANGE_SONG_PAGE:
      return { ...state, start: action.start };
    case types.CHANGE_SONG_PAGE_SIZE:
      return { ...state, pageSize: action.pageSize };
    default:
      return state;
  }
}
