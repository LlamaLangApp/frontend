import { WordSet, Translation } from "../games/GamesTypes";
import { ApiResponse, makeApiRequest } from "./CommonBackend";

export async function callWordSets(
  token: string | null
): Promise<ApiResponse<WordSet[]>> {
  return makeApiRequest<WordSet[]>("wordset/", "GET", token);
}

export async function callTranslations(
  token: string | null,
  setId: number | undefined,
  limit: number | null
): Promise<ApiResponse<Translation[]>> {
  const argument = limit === null ? "" : `?limit=${limit}`;

  return makeApiRequest<Translation[]>(
    `wordset/${setId}/translations/${argument}`,
    "GET",
    token
  );
}
