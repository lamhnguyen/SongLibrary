import * as api from "../api/api";
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
  return { type: types.CREATE_SONG_SUCCESS, song }; // types.SUCCESS(api.CREATE_SONG)
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
    dispatch(apiCallBegin(api.LOAD_SONGS));
    return songApi
      .getSongs(filter)
      .then((result) => {
        dispatch(loadSongsSuccess(result));
      })
      .catch((error) => {
        const errMsg = "loadSongs failed - Error: " + error.message;
        dispatch(apiCallError(api.LOAD_SONGS, errMsg));
      });
  };
}

export function loadSong(slug) {
  return function (dispatch) {
    dispatch(apiCallBegin(api.LOAD_SONG));
    return songApi
      .getSong(slug)
      .then((song) => {
        dispatch(loadSongSuccess(song));
      })
      .catch((error) => {
        const errMsg = "loadSong failed - Error: " + error.message;
        dispatch(apiCallError(api.LOAD_SONG, errMsg));
      });
  };
}

export function deleteSong(id) {
  return function (dispatch) {
    dispatch(apiCallBegin(api.DELETE_SONG));
    return songApi
      .deleteSong(id)
      .then(() => {
        dispatch(deleteSongSuccess(id));
      })
      .catch((error) => {
        const errMsg = "deleteSong failed - Error: " + error.message;
        dispatch(apiCallError(api.DELETE_SONG, errMsg));
      });
  };
}

export function saveSong(song) {
  const saveApi = song.id ? api.UPDATE_SONG : api.CREATE_SONG;
  return function (dispatch) {
    dispatch(apiCallBegin(saveApi));
    return songApi
      .saveSong(song)
      .then((savedSong) => {
        dispatch(
          song.id ? updateSongSuccess(savedSong) : createSongSuccess(savedSong)
        );
      })
      .catch((error) => {
        const errMsg = "saveSong failed - Error: " + error.message;
        dispatch(apiCallError(saveApi, errMsg));
      });
  };
}
