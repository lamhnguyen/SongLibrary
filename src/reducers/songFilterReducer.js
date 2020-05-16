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
      return {
        ...state,
        view: action.view,
        author: null,
        poet: null,
        artist: null,
        search: "",
        start: 0,
      };
    case types.CHANGE_SONG_AUTHOR:
      return {
        ...state,
        view: "",
        author: action.author,
        poet: null,
        artist: null,
        search: "",
        start: 0,
      };
    case types.CHANGE_SONG_POET:
      return {
        ...state,
        view: "",
        author: null,
        poet: action.poet,
        artist: null,
        search: "",
        start: 0,
      };
    case types.CHANGE_SONG_ARTIST:
      return {
        ...initialState.songFilter,
        view: "",
        author: null,
        poet: null,
        artist: action.artist,
        search: "",
        start: 0,
      };
    case types.CHANGE_SONG_SEARCH:
      return {
        ...initialState.songFilter,
        view: "",
        author: null,
        poet: null,
        artist: null,
        search: action.search,
        start: 0,
      };
    case types.CHANGE_SONG_SORT_ORDER:
      return {
        ...state,
        sort: action.sort,
        order: action.order,
        start: 0,
      };
    case types.CHANGE_SONG_PAGE:
      return { ...state, start: action.start };
    case types.CHANGE_SONG_PAGE_SIZE:
      return { ...state, pageSize: action.pageSize, start: 0 };
    case types.RESET_SONG_FILTER:
      return initialState.songFilter;
    default:
      return state;
  }
}
