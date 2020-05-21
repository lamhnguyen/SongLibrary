import { apiCallBegin, apiCallError } from "./apiActions";
import { isEmpty, isJSON } from "../core/helper";
import * as errors from "../errorCodes";

export function asyncAction(
  apiName,
  apiFunc,
  successAction,
  throwIfError,
  ...args
) {
  return function (dispatch) {
    dispatch(apiCallBegin(apiName));
    return apiFunc(...args)
      .then((result) => {
        if (!Array.isArray(result) && isEmpty(result))
          dispatch(successAction(...args));
        else dispatch(successAction(result, ...args));
      })
      .catch((error) => {
        var message = error.message || error;
        const errObj = isJSON(message)
          ? { apiName, ...JSON.parse(message) }
          : { apiName, message, code: errors.API_ERROR };

        dispatch(
          apiCallError(apiName, throwIfError ? "" : JSON.stringify(errObj))
        );

        if (throwIfError) throw new Error(JSON.stringify(errObj));
      });
  };
}
