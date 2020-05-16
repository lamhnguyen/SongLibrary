import * as api from "../api/api";
import * as types from "./actionTypes";
import { apiCallBegin, apiCallError } from "./apiActions";
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
  return function (dispatch) {
    dispatch(apiCallBegin(api.LOAD_AUTHORS));
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        const errMsg = "loadAuthors failed - Error: " + error.message;
        dispatch(apiCallError(api.LOAD_AUTHORS, errMsg));
      });
  };
}

export function deleteAuthor(id) {
  return function (dispatch) {
    dispatch(apiCallBegin(api.DELETE_AUTHOR));
    return authorApi
      .deleteAuthor(id)
      .then(() => {
        dispatch(deleteAuthorSuccess(id));
      })
      .catch((error) => {
        const errMsg = "deleteAuthor failed - Error: " + error.message;
        dispatch(apiCallError(api.DELETE_AUTHOR, errMsg));
      });
  };
}

export function saveAuthor(author) {
  const saveApi = author.id ? api.UPDATE_AUTHOR : api.CREATE_AUTHOR;
  return function (dispatch) {
    dispatch(apiCallBegin(saveApi));
    return authorApi
      .saveAuthor(author)
      .then((savedAuthor) => {
        dispatch(
          author.id
            ? updateAuthorSuccess(savedAuthor)
            : createAuthorSuccess(savedAuthor)
        );
      })
      .catch((error) => {
        const errMsg = "saveAuthor failed - Error: " + error.message;
        dispatch(apiCallError(saveApi, errMsg));
      });
  };
}
