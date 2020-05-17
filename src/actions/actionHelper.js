import { apiCallBegin, apiCallError } from "./apiActions";
import { isEmpty } from "../core/helper";

export function asyncAction(apiName, apiFunc, successAction, ...args) {
  return function (dispatch) {
    dispatch(apiCallBegin(apiName));
    return apiFunc(...args)
      .then((result) => {
        if (isEmpty(result)) dispatch(successAction(...args));
        else dispatch(successAction(result, ...args));
      })
      .catch((error) => {
        const errMsg = `${apiName} failed - Error: ${error.message}`;
        dispatch(apiCallError(apiName, errMsg));
      });
  };
}
