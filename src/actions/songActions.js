import * as types from "./actionTypes";
import { apiCallBegin, apiCallError } from "./apiActions";
import * as songApi from "../api/songApi";

export function loadSongsSuccess(songs) {
  return { type: types.LOAD_SONGS_SUCCESS, songs };
}

export function createSongSuccess(song) {
  return { type: types.CREATE_SONG_SUCCESS, song };
}

export function updateSongSuccess(song) {
  return { type: types.UPDATE_SONG_SUCCESS, song };
}

export function deleteSongSuccess(song) {
  return { type: types.DELETE_SONG_SUCCESS, song };
}

// thunk action creator
export function loadSongs() {
  return function (dispatch) {
    dispatch(apiCallBegin());
    return songApi
      .getSongs()
      .then((songs) => {
        console.log(songs);
        dispatch(loadSongsSuccess(songs));
      })
      .catch((error) => {
        const errMsg = "loadSongs failed - Error: " + error.message;
        dispatch(apiCallError(errMsg));
      });
  };
}

export function changeSongPage(start) {
  return { type: types.CHANGE_SONG_PAGE, start };
}

export function changeSongPageSize(pageSize) {
  return { type: types.CHANGE_SONG_PAGE_SIZE, pageSize };
}
