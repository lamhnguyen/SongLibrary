import { combineReducers } from "redux";
import song from "./songReducer";
import songs from "./songViewReducer";
import songFilter from "./songFilterReducer";
import apiStatus from "./apiStatusReducer";
import alert from "./alertReducer";

const rootReducer = combineReducers({
  song,
  songs,
  songFilter,
  apiStatus,
  alert,
});

export default rootReducer;
