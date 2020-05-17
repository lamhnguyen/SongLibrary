import * as api from "../api/api";
import * as types from "./actionTypes";
import { asyncAction } from "./actionHelper";
import * as authorApi from "../api/authorApi";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthorSuccess(id) {
  return { type: types.DELETE_AUTHOR_SUCCESS, id };
}

// thunk action creator
export function loadAuthors() {
  return asyncAction(
    api.LOAD_AUTHORS,
    authorApi.getAuthors,
    loadAuthorsSuccess
  );
}

export function deleteAuthor(id) {
  return asyncAction(
    api.DELETE_AUTHOR,
    authorApi.deleteAuthor,
    deleteAuthorSuccess,
    id
  );
}

export function saveAuthor(author) {
  return asyncAction(
    author.id ? api.UPDATE_AUTHOR : api.CREATE_AUTHOR,
    authorApi.saveAuthor,
    author.id ? updateAuthorSuccess : createAuthorSuccess,
    author
  );
}
