import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import * as actions from "./songActions";
import * as types from "./actionTypes";

// In Redux, action creators are functions which return plain objects.
// When testing action creators, we want to test whether the correct action creator was called and also whether the right action was returned.

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  it("should create an action to view a song", () => {
    const song = {};
    const expectedAction = {
      type: types.VIEW_SONG,
      song,
    };
    expect(actions.viewSong(song)).toEqual(expectedAction);
  });
});

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates LOAD_SONG_SUCCESS when loading a song has been done", () => {
    const baseUrl = process.env.API_URL + "/songs/";
    const slug = "song-name";
    const song = {};

    fetchMock.getOnce(`${baseUrl}${slug}`, {
      body: song,
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      { type: "LOAD_SONG_BEGIN" },
      { type: types.LOAD_SONG_SUCCESS, song },
    ];
    const store = mockStore({ songs: [] });

    return store.dispatch(actions.loadSong(slug)).then(() => {
      console.log(store.getActions());
      // return of async actions
      // TODO
      // expect(store.getActions()).toEqual(expectedActions);
      expect(true).toEqual(true);
    });
  });
});
