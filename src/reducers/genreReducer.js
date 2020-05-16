import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function genreReducer(state = initialState.genres, action) {
  switch (action.type) {
    case types.LOAD_GENRES_SUCCESS:
      return action.genres;
    case types.CREATE_GENRE_SUCCESS:
      return [...state, { ...action.genre }];
    case types.UPDATE_GENRE_SUCCESS:
      return state.map((genre) =>
        genre.id === action.genre.id ? action.genre : genre
      );
    case types.DELETE_GENRE_SUCCESS:
      return state.filter((genre) => genre.id !== action.genre.id);
    default:
      return state;
  }
}
