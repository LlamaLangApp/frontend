import { serverURL } from "./CommonBackend";

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
