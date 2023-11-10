import { serverURL } from "./CommonBackend";

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

export async function saveFallingWordsGame(
  token: string,
  score: number,
  accuracy: number,
  duration: number,
  wordset: number
): Promise<SaveMemoryGameReponse> {
  let response;
  try {
    response = await fetch(`http://${serverURL}/falling-words/`, {
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
