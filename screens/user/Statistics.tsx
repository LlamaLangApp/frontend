import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useEffect, useState } from "react";
import CustomDropdown from "../../components/CustomDropdown";
import { Games } from "../../Consts";
import { FlatList } from "react-native-gesture-handler";
import { useAppStore } from "../../state";
import {
  CalendarData,
  CurrentStreakData,
  GamePointsData,
  getCalendar,
  getCurrentStreak,
  getGamePoints,
  getLongestStreak,
  LongestStreakData,
} from "../../backend/StatisticsBackend";

const games = {
  allGames: "All games",
  memory: "Memory",
  race: "Race",
  fallingWords: "Falling Words",
  findingWords: "Finding Words",
};

const gamesMapping: Record<string, Games> = {
  [games.allGames]: "all_games",
  [games.memory]: "memory",
  [games.race]: "race",
  [games.fallingWords]: "falling_words",
  [games.findingWords]: "finding_words",
};

const defaultValue = games.allGames;

function StatisticsScreen() {
  const token = useAppStore((store) => store.token);

  const [chosenGame, setChosenGame] = useState<string>(games.allGames);
  const [calendar, setCalendar] = useState<CalendarData | null>(null);
  const [longestStreak, setLongestStreak] = useState<LongestStreakData | null>(
    null
  );
  const [currentStreak, setCurrentStreak] = useState<CurrentStreakData | null>(
    null
  );
  const [gamePoints, setGamePoints] = useState<GamePointsData | null>(null);

  useEffect(() => {
    if (!token) {
      console.warn("No token for fetching statistics");
      return;
    }
    const game: Games = gamesMapping[chosenGame];
    Promise.all([
      getCalendar(token, game, 12, 2023),
      getCurrentStreak(token, game),
      getLongestStreak(token, game),
      getGamePoints(token, game),
    ]).then(
      ([
        calendarResponse,
        currentStreakResponse,
        longestStreakResponse,
        gamePointsResponse,
      ]) => {
        if (
          calendarResponse.type === "success" &&
          currentStreakResponse.type === "success" &&
          longestStreakResponse.type === "success" &&
          gamePointsResponse.type === "success"
        ) {
          setCalendar(calendarResponse.result);
          setLongestStreak(longestStreakResponse.result);
          setCurrentStreak(currentStreakResponse.result);
          setGamePoints(gamePointsResponse.result);
        }
      }
    );
  }, [chosenGame]);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View
        style={{
          alignItems: "center",
          marginHorizontal: "7%",
          gap: 10,
          marginTop: 20,
          marginBottom: "4%",
        }}
      >
        <CustomDropdown
          defaultSelectText={"Game"}
          selectData={Object.values(games)}
          onSelectFunc={(item) => {
            setChosenGame(item);
          }}
          defaultValue={defaultValue}
        />
      </View>
      {currentStreak && (
        <Text>Current streak: {currentStreak.current_streak}</Text>
      )}
      {longestStreak && (
        <Text>
          Longest streak: {longestStreak.longest_streak}
          {"   "}From: {longestStreak.start_date}
          {"   "}To: {longestStreak.end_date}
        </Text>
      )}
      {gamePoints && <Text>Total points: {gamePoints.total_points}</Text>}
      {calendar && (
        <Text>
          Calendar from: {calendar.month}.{calendar.year}
        </Text>
      )}
      {calendar && (
        <FlatList
          data={Object.keys(calendar.calendar)}
          renderItem={(item) => (
            <Text>
              {item.item}: {calendar.calendar[item.item]}
            </Text>
          )}
        />
      )}
    </View>
  );
}

export default StatisticsScreen;
