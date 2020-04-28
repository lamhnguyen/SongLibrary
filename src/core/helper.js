import { attempt } from "lodash";
export const errorToString = (error) => {
  var errMsg = error.message || error;

  if (error.stack || error.stacktrace) {
    errMsg += " - stack: " + error.stack || error.stacktrace;
  }

  return errMsg;
};

export const throwErrorRandomly = () => {
  if (Math.random() > 0.5) throw new Error("Boom!");
};

export const toNumber = (value, defaultValue) => {
  return isNaN(parseInt(value)) ? defaultValue : parseInt(value);
};

function parseJson(str) {
  return attempt(JSON.parse.bind(null, str));
}
