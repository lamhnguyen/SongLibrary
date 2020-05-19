import * as api from "../api/api";
import * as types from "./actionTypes";
import { asyncAction } from "./actionHelper";
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
export function loadArtists(throwIfError = false) {
  return asyncAction(
    api.LOAD_ARTISTS,
    artistApi.getArtists,
    loadArtistsSuccess,
    throwIfError
  );
}

export function deleteArtist(id, throwIfError = false) {
  return asyncAction(
    api.DELETE_ARTIST,
    artistApi.deleteArtist,
    deleteArtistSuccess,
    throwIfError,
    id
  );
}

export function saveArtist(artist, throwIfError = false) {
  return asyncAction(
    artist.id ? api.UPDATE_ARTIST : api.CREATE_ARTIST,
    artistApi.saveArtist,
    artist.id ? updateArtistSuccess : createArtistSuccess,
    throwIfError,
    artist
  );
}
