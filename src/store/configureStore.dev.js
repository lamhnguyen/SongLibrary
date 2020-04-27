import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import errorHandler from "./errorHandler";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  const logger = createLogger();

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk, // lets us dispatch() functions
        logger, // log actions
        errorHandler,
        reduxImmutableStateInvariant()
      )
    )
  );
}
