import * as types from "./actionTypes";
import { apiCallBegin, apiCallError } from "./apiActions";
import * as songApi from "../api/songApi";

export function loadSongsSuccess(result) {
  return { type: types.LOAD_SONGS_SUCCESS, result };
}

export function loadSongSuccess(song) {
  return { type: types.LOAD_SONG_SUCCESS, song };
}

export function createSongSuccess(song) {
  return { type: types.CREATE_SONG_SUCCESS, song };
}

export function updateSongSuccess(song) {
  return { type: types.UPDATE_SONG_SUCCESS, song };
}

export function deleteSongSuccess(id) {
  return { type: types.DELETE_SONG_SUCCESS, id };
}

export function changeSongView(view) {
  return { type: types.CHANGE_SONG_VIEW, view };
}

export function changeSongPage(start) {
  return { type: types.CHANGE_SONG_PAGE, start };
}

export function changeSongPageSize(pageSize) {
  return { type: types.CHANGE_SONG_PAGE_SIZE, pageSize };
}

export function changeSongAuthor(author) {
  return { type: types.CHANGE_SONG_AUTHOR, author };
}

export function changeSongPoet(poet) {
  return { type: types.CHANGE_SONG_POET, poet };
}

export function changeSongArtist(artist) {
  return { type: types.CHANGE_SONG_ARTIST, artist };
}

export function changeSongSearch(search) {
  return { type: types.CHANGE_SONG_SEARCH, search };
}

export function changeSongSortOrder(sort, order) {
  return { type: types.CHANGE_SONG_SORT_ORDER, sort, order };
}

export function resetSongFilter() {
  return { type: types.RESET_SONG_FILTER };
}

// thunk action creator
export function loadSongs(filter) {
  return function (dispatch) {
    dispatch(apiCallBegin());
    return songApi
      .getSongs(filter)
      .then((result) => {
        dispatch(loadSongsSuccess(result));
      })
      .catch((error) => {
        const errMsg = "loadSongs failed - Error: " + error.message;
        dispatch(apiCallError(errMsg));
      });
  };
}

export function loadSong(slug) {
  return function (dispatch) {
    dispatch(apiCallBegin());
    return songApi
      .getSong(slug)
      .then((song) => {
        dispatch(loadSongSuccess(song));
      })
      .catch((error) => {
        const errMsg = "loadSong failed - Error: " + error.message;
        dispatch(apiCallError(errMsg));
      });
  };
}

export function deleteSong(id) {
  return function (dispatch) {
    dispatch(apiCallBegin());
    return songApi
      .deleteSong(id)
      .then(() => {
        dispatch(deleteSongSuccess(id));
      })
      .catch((error) => {
        const errMsg = "deleteSong failed - Error: " + error.message;
        dispatch(apiCallError(errMsg));
      });
  };
}
