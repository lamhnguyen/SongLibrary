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
