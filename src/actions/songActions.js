import * as api from "../api/api";
import * as types from "./actionTypes";
import { asyncAction } from "./actionHelper";
import * as songApi from "../api/songApi";
import * as authorApi from "../api/authorApi";
import * as poetApi from "../api/poetApi";
import * as artistApi from "../api/artistApi";

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

export function viewSong(song) {
  return { type: types.VIEW_SONG, song };
}

export function editSong(song) {
  return { type: types.EDIT_SONG, song };
}

export function createSongAuthorSucess(author) {
  return { type: types.CREATE_SONG_AUTHOR_SUCCESS, author };
}

export function createSongPoetSucess(poet) {
  return { type: types.CREATE_SONG_POET_SUCCESS, poet };
}

export function createSongArtistSucess(artist) {
  return { type: types.CREATE_SONG_ARTIST_SUCCESS, artist };
}

// thunk action creator
export function loadSongs(filter) {
  return asyncAction(
    api.LOAD_SONGS,
    songApi.getSongs,
    loadSongsSuccess,
    filter
  );
}

export function loadSong(slug) {
  return asyncAction(api.LOAD_SONG, songApi.getSong, loadSongSuccess, slug);
}

export function deleteSong(id) {
  return asyncAction(
    api.DELETE_SONG,
    songApi.deleteSong,
    deleteSongSuccess,
    id
  );
}

export function saveSong(song) {
  return asyncAction(
    song.id ? api.UPDATE_SONG : api.CREATE_SONG,
    songApi.saveSong,
    song.id ? updateSongSuccess : createSongSuccess,
    song
  );
}

export function createSongAuthor(author) {
  return asyncAction(
    api.CREATE_AUTHOR,
    authorApi.saveAuthor,
    createSongAuthorSucess,
    author
  );
}

export function createSongPoet(poet) {
  return asyncAction(
    api.CREATE_POET,
    poetApi.savePoet,
    createSongPoetSucess,
    poet
  );
}

export function createSongArtist(artist) {
  return asyncAction(
    api.CREATE_ARTIST,
    artistApi.saveArtist,
    createSongArtistSucess,
    artist
  );
}
