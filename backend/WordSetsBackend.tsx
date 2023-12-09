import { ApiResponse, makeApiRequest } from "./CommonBackend";

export type WordSet = {
  id: number;
  english: string;
  polish: string;
  category: string;
  difficulty: number;
  locked: boolean;
  accuracy: number;
  depends_on: {
    id: number;
    english: string;
    polish: string;
    category: string;
    difficulty: number;
  }[];
};

export type Translation = {
  id: number;
  english: string;
  polish: string;
  star: boolean;
};

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
