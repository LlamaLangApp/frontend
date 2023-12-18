import { ApiResponse, ErrorResponse, makeApiRequest } from "./CommonBackend";
import { handleSetUserData } from "./UserBackend";
import Toast from "react-native-toast-message";
import { UserDataToSet } from "../state";
import { defaultUserData } from "../Consts";

function handleLoginError(response: Response): ErrorResponse {
  if (response.status >= 400 && response.status < 500) {
    return {
      type: "error",
      message: "Unable to login with provided credentials",
    };
  } else {
    return {
      type: "error",
      message: "Unable to perform the operation due to a server error",
    };
  }
}

export async function callLogin(
  username: string,
  password: string
): Promise<ApiResponse<{ auth_token: string }>> {
  if (username === "") {
    return { type: "error", message: "Username cannot be empty" };
  }
  if (password === "") {
    return { type: "error", message: "Password cannot be empty" };
  }

  return makeApiRequest<{ auth_token: string }>(
    "auth/token/login/",
    "POST",
    null,
    { username, password },
    handleLoginError
  );
}

function handleRegisterError(
  response: Response,
  result: { email: string; id: number; username: string }
): ErrorResponse {
  const errorDetails = Object.keys(result);
  if (response.status >= 400 && response.status < 500) {
    if (errorDetails.includes("username")) {
      return { type: "error", message: result["username"][0] };
    } else {
      return {
        type: "error",
        message: "Unable to create account with provided credentials",
      };
    }
  } else {
    return {
      type: "error",
      message: "Unable to perform the operation due to a server error",
    };
  }
}

export async function callRegister(
  username: string,
  password: string,
  email: string
): Promise<ApiResponse<{ email: string; id: number; username: string }>> {
  if (username === "") {
    return { type: "error", message: "Username cannot be empty" };
  }
  if (password === "") {
    return { type: "error", message: "Password cannot be empty" };
  }
  if (email === "") {
    return { type: "error", message: "Email cannot be empty" };
  }

  return makeApiRequest<{ email: string; id: number; username: string }>(
    "auth/users/",
    "POST",
    null,
    { username: username, password: password, email: email },
    handleRegisterError
  );
}

export const registerHandler = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  setUserData: (data: UserDataToSet) => void
) => {
  if (password === confirmPassword) {
    callRegister(username, password, email).then((response) => {
      if (response.type === "success") {
        loginHandler(username, password, setUserData);
      } else {
        Toast.show({
          type: "error",
          text1: response.message,
        });
      }
    });
  } else {
    Toast.show({
      type: "error",
      text1: "Provided passwords are not the same",
    });
  }
};

export const loginHandler = (
  enteredUsername: string,
  enteredPassword: string,
  setUserData: (data: UserDataToSet) => void
) => {
  callLogin(enteredUsername, enteredPassword).then((loginResponse) => {
    if (loginResponse.type === "success") {
      handleSetUserData(loginResponse.result.auth_token, setUserData);
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
  makeApiRequest<string>("auth/token/logout/", "POST", token, { token })
    .then(() => setUserData(defaultUserData))
    .catch(() => setUserData(defaultUserData));
};
