import * as api from "../api/api";
import * as types from "./actionTypes";
import { apiCallBegin, apiCallError } from "./apiActions";
import * as artistApi from "../api/artistApi";

export function loadArtistsSuccess(artists) {
  return { type: types.LOAD_ARTISTS_SUCCESS, artists };
}

export function createArtistSuccess(artist) {
  return { type: types.CREATE_ARTIST_SUCCESS, artist };
}

export function updateArtistSuccess(artist) {
  return { type: types.UPDATE_ARTIST_SUCCESS, artist };
}

export function deleteArtistSuccess(id) {
  return { type: types.DELETE_ARTIST_SUCCESS, id };
}

// thunk action creator
export function loadArtists() {
  return function (dispatch) {
    dispatch(apiCallBegin(api.LOAD_ARTISTS));
    return artistApi
      .getArtists()
      .then((artists) => {
        dispatch(loadArtistsSuccess(artists));
      })
      .catch((error) => {
        const errMsg = "loadArtists failed - Error: " + error.message;
        dispatch(apiCallError(api.LOAD_ARTISTS, errMsg));
      });
  };
}

export function deleteArtist(id) {
  return function (dispatch) {
    dispatch(apiCallBegin(api.DELETE_ARTIST));
    return artistApi
      .deleteArtist(id)
      .then(() => {
        dispatch(deleteArtistSuccess(id));
      })
      .catch((error) => {
        const errMsg = "deleteArtist failed - Error: " + error.message;
        dispatch(apiCallError(api.DELETE_ARTIST, errMsg));
      });
  };
}

export function saveArtist(artist) {
  const saveApi = artist.id ? api.UPDATE_ARTIST : api.CREATE_ARTIST;
  return function (dispatch) {
    dispatch(apiCallBegin(saveApi));
    return artistApi
      .saveArtist(artist)
      .then((savedArtist) => {
        dispatch(
          artist.id
            ? updateArtistSuccess(savedArtist)
            : createArtistSuccess(savedArtist)
        );
      })
      .catch((error) => {
        const errMsg = "saveArtist failed - Error: " + error.message;
        dispatch(apiCallError(saveApi, errMsg));
      });
  };
}
