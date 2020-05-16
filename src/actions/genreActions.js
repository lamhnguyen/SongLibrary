import * as api from "../api/api";
import * as types from "./actionTypes";
import { apiCallBegin, apiCallError } from "./apiActions";
import * as genreApi from "../api/genreApi";

export function loadGenresSuccess(genres) {
  return { type: types.LOAD_GENRES_SUCCESS, genres };
}

export function createGenreSuccess(genre) {
  return { type: types.CREATE_GENRE_SUCCESS, genre };
}

export function updateGenreSuccess(genre) {
  return { type: types.UPDATE_GENRE_SUCCESS, genre };
}

export function deleteGenreSuccess(id) {
  return { type: types.DELETE_GENRE_SUCCESS, id };
}

// thunk action creator
export function loadGenres() {
  return function (dispatch) {
    dispatch(apiCallBegin(api.LOAD_GENRES));
    return genreApi
      .getGenres()
      .then((genres) => {
        dispatch(loadGenresSuccess(genres));
      })
      .catch((error) => {
        const errMsg = "loadGenres failed - Error: " + error.message;
        dispatch(apiCallError(api.LOAD_GENRES, errMsg));
      });
  };
}

export function deleteGenre(id) {
  return function (dispatch) {
    dispatch(apiCallBegin(api.DELETE_GENRE));
    return genreApi
      .deleteGenre(id)
      .then(() => {
        dispatch(deleteGenreSuccess(id));
      })
      .catch((error) => {
        const errMsg = "deleteGenre failed - Error: " + error.message;
        dispatch(apiCallError(api.DELETE_GENRE, errMsg));
      });
  };
}

export function saveGenre(genre) {
  const saveApi = genre.id ? api.UPDATE_GENRE : api.CREATE_GENRE;
  return function (dispatch) {
    dispatch(apiCallBegin(saveApi));
    return genreApi
      .saveGenre(genre)
      .then((savedGenre) => {
        dispatch(
          genre.id
            ? updateGenreSuccess(savedGenre)
            : createGenreSuccess(savedGenre)
        );
      })
      .catch((error) => {
        const errMsg = "saveGenre failed - Error: " + error.message;
        dispatch(apiCallError(saveApi, errMsg));
      });
  };
}
