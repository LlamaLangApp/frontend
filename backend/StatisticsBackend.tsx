import { ApiResponse, makeApiRequest } from "./CommonBackend";

export async function getStatistics(
  token: string,
  game: "memory",
  period: "all_time" | "this_week",
  aggregate: "sum" | "avg" | "min" | "count",
  statistic: string
): Promise<ApiResponse<{ username: string; stat: number }[]>> {
  return makeApiRequest<{ username: string; stat: number }[]>(
    "statistics/",
    "POST",
    token,
    { game, period, aggregate, statistic }
  );
}
