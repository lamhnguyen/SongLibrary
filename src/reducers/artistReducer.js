import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function artistReducer(state = initialState.artists, action) {
  switch (action.type) {
    case types.LOAD_ARTISTS_SUCCESS:
      return action.artists;
    case types.CREATE_ARTIST_SUCCESS:
    case types.CREATE_SONG_ARTIST_SUCCESS:
      return [...state, { ...action.artist }];
    case types.UPDATE_ARTIST_SUCCESS:
      return state.map((artist) =>
        artist.id === action.artist.id ? action.artist : artist
      );
    case types.DELETE_ARTIST_SUCCESS:
      return state.filter((artist) => artist.id !== action.artist.id);
    default:
      return state;
  }
}
