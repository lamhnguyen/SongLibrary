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
    case types.VIEW_SONG:
      return action.song;
    case types.EDIT_SONG:
      return action.song;
    case types.CREATE_SONG_AUTHOR_SUCCESS:
      return { ...state, authorIds: [...state.authorIds, action.author.id] };
    case types.CREATE_SONG_POET_SUCCESS:
      return { ...state, poetIds: [...state.poetIds, action.poet.id] };
    case types.CREATE_SONG_ARTIST_SUCCESS:
      return { ...state, artistIds: [...state.artistIds, action.artist.id] };
    default:
      return state;
  }
}
