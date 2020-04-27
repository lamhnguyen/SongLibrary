const LOG_LEVEL_ERROR = 1;
const LOG_LEVEL_INFO = 2;

const baseUrl = process.env.API_URL + "/logs/";

function log(logLevel, data) {
  fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      logLevel,
      data,
    }),
  }).catch((error) => console.error("Logging failed: " + error));
}

export function logInfo(data) {
  log(LOG_LEVEL_INFO, data);
}

export function logError(data) {
  log(LOG_LEVEL_ERROR, data);
}
