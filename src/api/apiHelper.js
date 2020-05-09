import * as errors from "../errorCodes";

export async function handleResponse(response) {
  if (response.ok) return response.json();

  const message = (await response.text()) || "Unhandled status";
  let code = "";
  switch (response.status) {
    case 400:
      code = errors.API_400_BAD_REQUEST;
      break;
    case 401:
      code = errors.API_401_UNAUTHORIZED;
      break;
    case 403:
      code = errors.API_403_FORBIDDEN;
      break;
    default:
      code = `API_${response.status}_UNKNOWN`;
      break;
  }

  throw new Error(`${message} - Code: ${code}`);
}

export function handleError(error) {
  throw new Error(`${error} - Code: ${errors.API_ERROR}`);
}
