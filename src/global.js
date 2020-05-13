import { store } from "./index";
import { resetSongFilter } from "./actions/songActions";

export const resetApp = () => {
  console.log("resetApp");
  store.dispatch(resetSongFilter());
};

export const dispatch = (action, data) => {
  store.dispatch({
    action,
    data,
  });
};
