import { store } from "./index";
import { resetSongFilter } from "./actions/songActions";

export const resetApp = () => {
  store.dispatch(resetSongFilter());
};
