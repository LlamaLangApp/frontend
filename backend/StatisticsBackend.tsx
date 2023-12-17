import { ApiResponse, makeApiRequest } from "./CommonBackend";
import { GamesStatistics } from "../Consts";

export type CalendarData = {
  calendar: Record<string, number>;
  month: number;
  year: number;
};

export type LongestStreakData = {
  longest_streak: number;
  start_date: string;
  end_date: string;
};

export type CurrentStreakData = {
  current_streak: number;
};

export type GamePointsData = {
  total_points: number;
};

export type TotalDaysData = {
  total_days: number;
};

export async function getCalendar(
  token: string | null,
  game: GamesStatistics,
  month: number,
  year: number
): Promise<ApiResponse<CalendarData>> {
  return makeApiRequest<CalendarData>("statistics/calendar/", "POST", token, {
    game: game,
    month: month,
    year: year,
  });
}

export async function getLongestStreak(
  token: string | null,
  game: GamesStatistics
): Promise<ApiResponse<LongestStreakData>> {
  return makeApiRequest<LongestStreakData>(
    `statistics/longest-streak/`,
    "POST",
    token,
    { game: game }
  );
}

export async function getCurrentStreak(
  token: string | null,
  game: GamesStatistics
): Promise<ApiResponse<CurrentStreakData>> {
  return makeApiRequest<CurrentStreakData>(
    `statistics/current-streak/`,
    "POST",
    token,
    { game: game }
  );
}

export async function getGamePoints(
  token: string | null,
  game: GamesStatistics
): Promise<ApiResponse<GamePointsData>> {
  return makeApiRequest<GamePointsData>(
    `statistics/game-points/`,
    "POST",
    token,
    { game: game }
  );
}

export async function getTotalDays(
  token: string | null
): Promise<ApiResponse<TotalDaysData>> {
  return makeApiRequest<TotalDaysData>(`statistics/total-days/`, "GET", token);
}
