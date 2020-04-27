import { combineReducers } from "redux";
import songs from "./songReducer";
import songFilter from "./songFilterReducer";
import apiStatus from "./apiStatusReducer";
import alert from "./alertReducer";

const rootReducer = combineReducers({
  songs,
  songFilter,
  apiStatus,
  alert,
});

export default rootReducer;
