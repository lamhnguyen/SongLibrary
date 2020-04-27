import { logError } from "../api/logApi";
import { errorToString } from "../core/helper";

// eslint-disable-next-line no-unused-vars
const errorHandler = (store) => (next) => (action) => {
  // we got a thunk, prep it to be handled by redux-thunk middleware
  if (typeof action === "function") {
    // wrap it in a function to try/catch the downstream invocation
    const wrapAction = (fn) => (dispatch, getState, extraArgument) => {
      try {
        fn(dispatch, getState, extraArgument);
      } catch (error) {
        logError(errorToString(error));
        throw error;
      }
    };
    // send wrapped function to the next middleware, this should be upstrem from redux-thunk middleware
    return next(wrapAction(action));
  }

  try {
    return next(action);
  } catch (error) {
    logError(errorToString(error));
    throw error;
  }
};

export default errorHandler;
