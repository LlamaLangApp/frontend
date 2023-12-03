import { ApiResponse, makeApiRequest } from "./CommonBackend";

export async function saveSinglePlayerGame(
  token: string,
  game: "memory-game" | "falling-words",
  score: number,
  accuracy: number,
  duration: number,
  wordset: number
): Promise<ApiResponse<string>> {
  return makeApiRequest<string>(`${game}/`, "POST", token, {
    score,
    accuracy,
    duration,
    timestamp: Date.now(),
    wordset,
  });
}
