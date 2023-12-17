import { ApiResponse, makeApiRequest } from "./CommonBackend";

export type ScoreboardData = {
  user: { place: number; username: string; points: number };
  top_100: { place: number; username: string; points: number }[];
};

export async function getScoreboard(
  token: string | null,
  period: "all_time" | "this_week",
  scoreboard_type: string
): Promise<ApiResponse<ScoreboardData>> {
  return makeApiRequest<ScoreboardData>("scoreboard/", "POST", token, {
    period: period,
    scoreboard_type: scoreboard_type,
  });
}
