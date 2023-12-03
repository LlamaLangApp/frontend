import Constants from "expo-constants";

const { expoConfig } = Constants;

let serverURL = expoConfig?.hostUri?.split(`:`)?.shift()?.concat(`:8000`);

function setServerURL(newURL: string) {
  serverURL = newURL;
}

export type ErrorResponse = { type: "error"; message: string };
type ApiResponse<T> = { type: "success"; result: T } | ErrorResponse;

async function makeApiRequest<T>(
  endpoint: string,
  method: string,
  token: string | null,
  body?: object,
  additionalHeaders?: object,
  customErrorHandling?: (response: Response, result: T) => ErrorResponse
): Promise<ApiResponse<T>> {
  let response;

  const requestOptions: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      ...(token && { Authorization: "Token " + token }),
      ...(additionalHeaders && additionalHeaders),
    },
    ...(body && { body: body instanceof Blob ? body : JSON.stringify(body) }),
  };

  try {
    response = await fetch(`http://${serverURL}/${endpoint}`, requestOptions);
    if (response.ok && method === "DELETE") {
      return { type: "success", result: "OK!" as T };
    }

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
