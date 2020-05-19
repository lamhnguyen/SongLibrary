import * as api from "../api/api";
import { endsWith } from "../core/helper";

// Alert
export const SHOW_INFO = "SHOW_INFO";
export const DISMISS_INFO = "DISMISS_INFO";
export const SHOW_ERROR = "SHOW_ERROR";
export const DISMISS_ERROR = "DISMISS_ERROR";

// Async
export const API_BEGIN = (api) => `${api}_BEGIN`;
export const API_ERROR = (api) => `${api}_ERROR`;
export const API_SUCCESS = (api) => `${api}_SUCCESS`;

export const IS_API_BEGIN = (actionType) => endsWith(actionType, "_BEGIN");
export const IS_API_ERROR = (actionType) => endsWith(actionType, "_ERROR");
export const IS_API_SUCCESS = (actionType) => endsWith(actionType, "_SUCCESS");

// Songs
export const LOAD_SONGS_SUCCESS = API_SUCCESS(api.LOAD_SONGS);
export const LOAD_SONG_SUCCESS = API_SUCCESS(api.LOAD_SONG);

export const CREATE_SONG_SUCCESS = API_SUCCESS(api.CREATE_SONG);
export const UPDATE_SONG_SUCCESS = API_SUCCESS(api.UPDATE_SONG);
export const DELETE_SONG_SUCCESS = API_SUCCESS(api.DELETE_SONG);

export const VIEW_SONG = "VIEW_SONG";
export const EDIT_SONG = "EDIT_SONG";
export const CREATE_SONG = "CREATE_SONG";

export const CREATE_SONG_AUTHOR_SUCCESS = API_SUCCESS(api.CREATE_SONG_AUTHOR);
export const CREATE_SONG_POET_SUCCESS = API_SUCCESS(api.CREATE_SONG_POET);
export const CREATE_SONG_ARTIST_SUCCESS = API_SUCCESS(api.CREATE_SONG_ARTIST);

// Song filter
export const CHANGE_SONG_VIEW = "CHANGE_SONG_VIEW";

export const CHANGE_SONG_AUTHOR = "CHANGE_SONG_AUTHOR";
export const CHANGE_SONG_POET = "CHANGE_SONG_POET";
export const CHANGE_SONG_ARTIST = "CHANGE_SONG_ARTIST";

export const CHANGE_SONG_SEARCH = "CHANGE_SONG_SEARCH";

export const CHANGE_SONG_SORT_ORDER = "CHANGE_SONG_SORT_ORDER";

export const CHANGE_SONG_PAGE = "CHANGE_SONG_PAGE";
export const CHANGE_SONG_PAGE_SIZE = "CHANGE_SONG_PAGE_SIZE";

export const RESET_SONG_FILTER = "RESET_SONG_FILTER";

// Author
export const LOAD_AUTHORS_SUCCESS = API_SUCCESS(api.LOAD_AUTHORS);
export const CREATE_AUTHOR_SUCCESS = API_SUCCESS(api.CREATE_AUTHOR);
export const UPDATE_AUTHOR_SUCCESS = API_SUCCESS(api.UPDATE_AUTHOR);
export const DELETE_AUTHOR_SUCCESS = API_SUCCESS(api.DELETE_AUTHOR);

// Poet
export const LOAD_POETS_SUCCESS = API_SUCCESS(api.LOAD_POETS);
export const CREATE_POET_SUCCESS = API_SUCCESS(api.CREATE_POET);
export const UPDATE_POET_SUCCESS = API_SUCCESS(api.UPDATE_POET);
export const DELETE_POET_SUCCESS = API_SUCCESS(api.DELETE_POET);

// Artist
export const LOAD_ARTISTS_SUCCESS = API_SUCCESS(api.LOAD_ARTISTS);
export const CREATE_ARTIST_SUCCESS = API_SUCCESS(api.CREATE_ARTIST);
export const UPDATE_ARTIST_SUCCESS = API_SUCCESS(api.UPDATE_ARTIST);
export const DELETE_ARTIST_SUCCESS = API_SUCCESS(api.DELETE_ARTIST);

// Genre
export const LOAD_GENRES_SUCCESS = API_SUCCESS(api.LOAD_GENRES);
export const CREATE_GENRE_SUCCESS = API_SUCCESS(api.CREATE_GENRE);
export const UPDATE_GENRE_SUCCESS = API_SUCCESS(api.UPDATE_GENRE);
export const DELETE_GENRE_SUCCESS = API_SUCCESS(api.DELETE_GENRE);

// Key
export const LOAD_KEYS_SUCCESS = API_SUCCESS(api.LOAD_KEYS);
