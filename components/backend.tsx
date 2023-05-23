import Constants from "expo-constants";

const { manifest } = Constants;
export const serverURL = manifest?.debuggerHost
  ?.split(`:`)
  ?.shift()
  ?.concat(`:8000`);

type LoginResponse =
  | { type: "success"; authToken: string }
  | { type: "error"; message: string };

export async function callLogin(
  username: string,
  password: string
): Promise<LoginResponse> {
  if (username === "") {
    return { type: "error", message: "Username cannot be empty" };
  }

  if (password === "") {
    return { type: "error", message: "Password cannot be empty" };
  }
  let response;
  try {
    response = await fetch(`http://${serverURL}/auth/token/login/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }

  const tokenResponse = await response.json();

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      return {
        type: "error",
        message: "Unable to login with provided credentials",
      };
    } else {
      return { type: "error", message: "Unable to login due to server error" };
    }
  }

  return { type: "success", authToken: tokenResponse.auth_token };
}
