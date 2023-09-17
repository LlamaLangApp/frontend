import Constants from "expo-constants";
import { WordSet, Translation } from "./games/GamesTypes";

const { manifest } = Constants;
export const serverURL = manifest?.debuggerHost
  ?.split(`:`)
  ?.shift()
  ?.concat(`:8000`);

type LoginResponse =
  | { type: "success"; authToken: string }
  | { type: "error"; message: string };

type RegisterResponse =
  | { type: "success"; email: string; id: number; username: string }
  | { type: "error"; message: string };

type WordSetsResponse =
  | { type: "success"; wordSets: WordSet[] }
  | { type: "error"; message: string };

type TranslationsResponse =
  | { type: "success"; translations: Translation[] }
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

export async function callWordSets(
  token: string | null
): Promise<WordSetsResponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/wordset/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }

  const tokenResponse: WordSet[] = await response.json();

  if (!response.ok) {
    return { type: "error", message: "Unable to get word sets" };
  }

  return { type: "success", wordSets: tokenResponse };
}

export async function callTranslations(
  token: string | null,
  setId: number | undefined,
  limit: number | null
): Promise<TranslationsResponse> {
  const argument = limit === null ? "" : `?limit=${limit}`;
  let response;
  try {
    response = await fetch(
      `http://${serverURL}/wordset/${setId}/translations${argument}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Token " + token,
        },
      }
    );
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }

  const tokenResponse: Translation[] = await response.json();

  if (!response.ok) {
    return { type: "error", message: "Unable to get translations" };
  }

  return { type: "success", translations: tokenResponse };
}

type SaveMemoryGameReponse =
  | { type: "success" }
  | { type: "error"; message: string };

export async function saveMemoryGame(
  token: string,
  score: number,
  accuracy: number,
  duration: number,
  wordset: number
): Promise<SaveMemoryGameReponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/memory-game/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({
        score,
        accuracy,
        duration,
        timestamp: Date.now(),
        wordset,
      }),
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }

  if (!response.ok) {
    return { type: "error", message: "Unable to save memory game" };
  }

  return { type: "success" };
}

type GetStatisticsReponse =
  | { type: "success"; result: { username: string; stat: number }[] }
  | { type: "error"; message: string };

export async function getStatistics(
  token: string,
  game: "memory",
  period: "all_time" | "this_week",
  aggregate: "sum" | "avg" | "min" | "count",
  statistic: string
): Promise<GetStatisticsReponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/statistics/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({
        game,
        period,
        aggregate,
        statistic,
      }),
    });
  } catch (_) {
    return { type: "error", message: "Unknown network error" };
  }

  if (!response.ok) {
    return { type: "error", message: "Unable to get statistics" };
  }

  return { type: "success", result: await response.json() };
}
