import { WordSet, Translation } from "../games/GamesTypes";
import { serverURL } from "./CommonBackend";

type WordSetsResponse =
  | { type: "success"; wordSets: WordSet[] }
  | { type: "error"; message: string };

type TranslationsResponse =
  | { type: "success"; translations: Translation[] }
  | { type: "error"; message: string };

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
      `http://${serverURL}/wordset/${setId}/translations/${argument}`,
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
