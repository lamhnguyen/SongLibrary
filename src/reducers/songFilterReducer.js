import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function songReducer(state = initialState.songFilter, action) {
  switch (action.type) {
    case types.LOAD_SONGS_SUCCESS: {
      const meta = action.result.meta;
      return {
        ...state,
        start: meta.start,
        totalCount: meta.totalCount,
        pageSize: meta.pageSize,
      };
    }
    case types.CHANGE_SONG_VIEW:
      return { ...state, view: action.view };
    case types.CHANGE_SONG_AUTHOR:
      return {
        ...state,
        author: action.author,
        view: "",
        poet: null,
        artist: null,
      };
    case types.CHANGE_SONG_POET:
      return {
        ...state,
        poet: action.poet,
        view: "",
        author: null,
        artist: null,
      };
    case types.CHANGE_SONG_ARTIST:
      return {
        ...state,
        artist: action.artist,
        view: "",
        author: null,
        poet: null,
      };
    case types.CHANGE_SONG_SORT_ORDER:
      return { ...state, sort: action.sort, order: action.order };
    case types.CHANGE_SONG_PAGE:
      return { ...state, start: action.start };
    case types.CHANGE_SONG_PAGE_SIZE:
      return { ...state, pageSize: action.pageSize };
    case types.RESET_SONG_FILTER:
      return initialState.songFilter;
    default:
      return state;
  }
}
