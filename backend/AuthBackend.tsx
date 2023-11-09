import { serverURL } from "./CommonBackend";
import { getUserData } from "./UserBackend";
import Toast from "react-native-toast-message";
import { UserDataToSet } from "../state";

type LoginResponse =
  | { type: "success"; authToken: string }
  | { type: "error"; message: string };

type RegisterResponse =
  | { type: "success"; email: string; id: number; username: string }
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

export async function callRegister(
  username: string,
  password: string,
  email: string
): Promise<RegisterResponse> {
  if (username === "") {
    return { type: "error", message: "Username cannot be empty" };
  }

  if (password === "") {
    return { type: "error", message: "Password cannot be empty" };
  }

  if (email === "") {
    return { type: "error", message: "Email cannot be empty" };
  }

  let response;
  try {
    response = await fetch(`http://${serverURL}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }
  const registerResponse = await response.json();
  if (!response.ok) {
    const errDetails = Object.keys(registerResponse);
    if (response.status >= 400 && response.status < 500) {
      if (errDetails.includes("username")) {
        return { type: "error", message: registerResponse["username"][0] };
      } else {
        return {
          type: "error",
          message: "Unable to create account with provided credentials",
        };
      }
    } else {
      return { type: "error", message: "Unable to login due to server error" };
    }
  }
  return {
    type: "success",
    email: registerResponse.email,
    id: registerResponse.id,
    username: registerResponse.username,
  };
}

export const loginHandler = (
  enteredUsername: string,
  enteredPassword: string,
  setUserData: (data: UserDataToSet) => void
) => {
  callLogin(enteredUsername, enteredPassword).then((loginResponse) => {
    if (loginResponse.type === "success") {
      getUserData(loginResponse.authToken).then((response) => {
        if (response.type === "success") {
          setUserData({
            id: response.result.id,
            token: loginResponse.authToken,
            username: response.result.username,
            score: response.result.score,
            level: response.result.level,
            avatar: response.result.avatar,
          });
        }
      });
    } else {
      Toast.show({
        type: "error",
        text1: loginResponse.message,
      });
    }
  });
};

export const logoutHandler = (
  token: string | null,
  setUserData: (data: UserDataToSet) => void
) => {
  fetch(`http://${serverURL}/auth/token/logout/`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-type": "application/json",
      Authorization: "Token " + token,
    },
  })
    .then(() =>
      setUserData({
        token: null,
        username: null,
        avatar: null,
        level: 0,
        score: 0,
      })
    )
    .catch((error) => console.error(error));
};
