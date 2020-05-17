import * as api from "../api/api";
import * as types from "./actionTypes";
import { asyncAction } from "./actionHelper";
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
  return asyncAction(api.LOAD_GENRES, genreApi.getGenres, loadGenresSuccess);
}

export function deleteGenre(id) {
  return asyncAction(
    api.DELETE_GENRE,
    genreApi.deleteGenre,
    deleteGenreSuccess,
    id
  );
}

export function saveGenre(genre) {
  return asyncAction(
    genre.id ? api.UPDATE_GENRE : api.CREATE_GENRE,
    genreApi.saveGenre,
    genre.id ? updateGenreSuccess : createGenreSuccess,
    genre
  );
}
