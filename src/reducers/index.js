import { combineReducers } from "redux";
import song from "./songReducer";
import songs from "./songViewReducer";
import songFilter from "./songFilterReducer";
import apiStatus from "./apiStatusReducer";
import alert from "./alertReducer";
import authors from "./authorReducer";
import poets from "./poetReducer";
import artists from "./artistReducer";
import genres from "./genreReducer";
import keys from "./keyReducer";

const rootReducer = combineReducers({
  song,
  songs,
  songFilter,
  apiStatus,
  alert,
  authors,
  poets,
  artists,
  genres,
  keys,
});

export default rootReducer;
