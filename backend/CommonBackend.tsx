import Constants from "expo-constants";

const { expoConfig } = Constants;

let serverURL = expoConfig?.hostUri?.split(`:`)?.shift()?.concat(`:8000`);

function setServerURL(newURL: string) {
  serverURL = newURL;
}

export type ErrorResponse = { type: "error"; message: string };
type ApiResponse<T> =
  | { type: "success"; result: T }
  | { type: "error"; message: string };

async function makeApiRequest<T>(
  endpoint: string,
  method: string,
  token: string | null,
  body?: object,
  customErrorHandling?: (
    response: Response,
    result: T
  ) => { type: "error"; message: string }
): Promise<ApiResponse<T>> {
  let response;

  const requestOptions: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      ...(token && { Authorization: "Token " + token }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    response = await fetch(`http://${serverURL}/${endpoint}`, requestOptions);

    const result: T = await response.json();

    if (!response.ok) {
      if (customErrorHandling) {
        return customErrorHandling(response, result);
      }
      return { type: "error", message: `Request failed: ${response.status}` };
    }
    return { type: "success", result: result };
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
}

export { serverURL, setServerURL, makeApiRequest, ApiResponse };
