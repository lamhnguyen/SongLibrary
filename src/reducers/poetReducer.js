import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function poetReducer(state = initialState.poets, action) {
  switch (action.type) {
    case types.LOAD_POETS_SUCCESS:
      return action.poets;
    case types.CREATE_POET_SUCCESS:
    case types.CREATE_SONG_POET_SUCCESS:
      return [...state, { ...action.poet }];
    case types.UPDATE_POET_SUCCESS:
      return state.map((poet) =>
        poet.id === action.poet.id ? action.poet : poet
      );
    case types.DELETE_POET_SUCCESS:
      return state.filter((poet) => poet.id !== action.id);
    default:
      return state;
  }
}
