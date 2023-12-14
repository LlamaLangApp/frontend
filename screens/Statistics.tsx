import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import mainStyles from "../styles/MainStyles";
import React, { useEffect, useState } from "react";
import { buttonDarkPink, Games, grey, lightGrey, pink } from "../Consts";
import { useAppStore } from "../state";
import {
  CalendarData,
  CurrentStreakData,
  GamePointsData,
  getCalendar,
  getCurrentStreak,
  getGamePoints,
  getLongestStreak,
  getTotalDays,
  LongestStreakData,
  TotalDaysData,
} from "../backend/StatisticsBackend";
import { CalendarList } from "react-native-calendars/src";
import { MarkedDates } from "react-native-calendars/src/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import StatsInfo from "../components/statistics/StatsInfo";
import moment from "moment";

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

export default () => {
  const token = useAppStore((store) => store.token);

  const [chosenGame, setChosenGame] = useState<string | null>(games.allGames);
  const [calendar, setCalendar] = useState<CalendarData | null>(null);
  const [calendarAllGames, setCalendarAllGames] = useState<CalendarData | null>(
    null
  );
  // const [longestStreak, setLongestStreak] = useState<LongestStreakData | null>(
  //   null
  // );
  const [currentStreak, setCurrentStreak] = useState<CurrentStreakData | null>(
    null
  );
  const [gamePoints, setGamePoints] = useState<{
    [game: string]: GamePointsData | null;
  }>({});
  const [totalDays, setTotalDays] = useState<TotalDaysData | null>(null);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [markedDates, setMarketDates] = useState<MarkedDates>({});

  useEffect(() => {
    Promise.all(
      Object.values(gamesMapping).map(async (game) => ({
        [game]: await getGamePoints(token, game),
      }))
    ).then((responses) => {
      responses.map((response) => {
        Object.keys(response).map((game) => {
          const responseGame = response[game];
          if (responseGame.type === "success") {
            setGamePoints((prev) => ({
              ...prev,
              [game]: responseGame.result,
            }));
          } else {
            setGamePoints({});
          }
        });
      });
    });
  }, []);

  useEffect(() => {
    if (!token) {
      console.warn("No token for fetching statistics");
      return;
    }
    const allGames: Games = gamesMapping[games.allGames];
    Promise.all([
      getCalendar(token, allGames, month, year),
      getCurrentStreak(token, allGames),
      getLongestStreak(token, allGames),
      getTotalDays(token),
    ]).then(
      ([
        calendarAllGamesResponse,
        currentStreakResponse,
        longestStreakResponse,
        totalDaysResponse,
      ]) => {
        if (
          calendarAllGamesResponse.type === "success" &&
          currentStreakResponse.type === "success" &&
          longestStreakResponse.type === "success" &&
          totalDaysResponse.type === "success"
        ) {
          setCalendarAllGames(calendarAllGamesResponse.result);
          setLongestStreak(longestStreakResponse.result);
          setCurrentStreak(currentStreakResponse.result);
          setTotalDays(totalDaysResponse.result);
        } else {
          setCalendarAllGames(null);
          setLongestStreak(null);
          setCurrentStreak(null);
          setTotalDays(null);
        }
      }
    );
  }, [month, year]);

  useEffect(() => {
    if (!token) {
      console.warn("No token for fetching statistics");
      return;
    }
    if (!chosenGame) {
      return;
    }
    const game: Games = gamesMapping[chosenGame];
    getCalendar(token, game, month, year).then((calendarResponse) => {
      if (calendarResponse.type === "success") {
        setCalendar(calendarResponse.result);
      } else {
        setCalendar(null);
      }
    });
  }, [chosenGame, month, year]);

  const isStartingDay = (day: number) => {
    const prevDay = calendarAllGames?.calendar[`${day - 1}`];
    return prevDay == undefined || prevDay === 0;
  };

  const isEndingDay = (day: number) => {
    const nextDay = calendarAllGames?.calendar[`${day + 1}`];
    return nextDay == undefined || nextDay === 0;
  };

  const isCurrentStreakDay = (day: number) => {
    const now = new Date();
    return (
      currentStreak &&
      calendarAllGames?.month === now.getMonth() + 1 &&
      now.getDate() - currentStreak.current_streak + 1 <= day
    );
  };

  const getDayString = (
    year: number | undefined,
    mont: number | undefined,
    day: number
  ) => {
    return day / 10 < 1
      ? `${year}-${month}-0${day}`
      : `${year}-${month}-${day}`;
  };

  useEffect(() => {
    for (const dayString in calendarAllGames?.calendar) {
      const valueAllGames = calendarAllGames?.calendar[dayString];
      const valueGame = calendar?.calendar[dayString];
      const day = Number(dayString);
      if (valueAllGames != 0) {
        const props: MarkingProps = {
          startingDay: isStartingDay(day),
          endingDay: isEndingDay(day),
          color: isCurrentStreakDay(day) ? "#efcdd8" : lightGrey,
          textColor: grey,
          marked: chosenGame != games.allGames && valueGame != 0,
          dotColor: grey,
        };

        const date = getDayString(
          calendarAllGames?.year,
          calendarAllGames?.month,
          day
        );
        setMarketDates((prev) => ({
          ...prev,
          [date]: props,
        }));
      }
    }
  }, [calendarAllGames, calendar, currentStreak]);

  useEffect(() => {
    const now = new Date();
    for (let day = now.getDate() + 1; day <= 31; day++) {
      const date = getDayString(now.getFullYear(), now.getMonth(), day);
      setMarketDates((prev) => ({
        ...prev,
        [date]: {
          textColor: "#cccccc",
        },
      }));
    }
  }, []);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.placeholder2} />
        <View style={styles.points}>
          <View style={styles.placeholder1} />
          <View
            style={{
              width: "85%",
              flex: 0.3,
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.textStyle}>
              <FontAwesome5 name={"gamepad"} color={grey} size={18} />
              <Text> Total points</Text>
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1.5, width: "90%" }}
          >
            {Object.values(games).map((game, id) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setChosenGame(game);
                  }}
                  key={id}
                  style={styles.gameChoice}
                >
                  <Text style={{ color: grey }}>{game}</Text>
                  <View>
                    <Text style={{ color: buttonDarkPink }}>
                      {gamePoints[gamesMapping[game]]?.total_points}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/*<Text>Select game to see which days you played it </Text>*/}
        </View>
        <View style={styles.calendar}>
          <CalendarList
            disabledByDefault={true}
            disableAllTouchEventsForDisabledDays={true}
            theme={{
              calendarBackground: "#fffcff",
              textDisabledColor: "#2d4150",
            }}
            onVisibleMonthsChange={(months) => {
              setMonth(months[0].month);
              setYear(months[0].year);
            }}
            horizontal={true}
            pagingEnabled={false}
            calendarWidth={350}
            renderHeader={(date) => {
              const dateStr = date.toISOString();
              const endIndex = dateStr.indexOf("T");
              const title = moment(dateStr.slice(0, endIndex)).format(
                "MMMM YYYY"
              );
              return (
                <Text style={[styles.textStyle, styles.customHeader]}>
                  {title}
                </Text>
              );
            }}
            futureScrollRange={0}
            markingType={"period"}
            markedDates={markedDates}
          />
        </View>
        <View style={styles.statsInfo}>
          <StatsInfo
            iconName={"calendar-check"}
            statsText={" Current streak"}
            statsNumber={currentStreak?.current_streak}
            backgroundColor={pink}
            textColor={"white"}
          />
          <StatsInfo
            iconName={"calendar-week"}
            statsText={" Total days learned"}
            statsNumber={totalDays?.total_days}
            backgroundColor={lightGrey}
            textColor={grey}
          />
        </View>
        <View style={styles.placeholder2} />
        <View style={styles.placeholder2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    height: "95%",
  },
  calendar: { flex: 1.8 },
  statsInfo: {
    flex: 0.5,
    width: "100%",
    alignItems: "center",
  },
  points: {
    flex: 0.7,
    alignItems: "center",
    width: "100%",
  },
  placeholder1: { flex: 0.1 },
  placeholder2: { flex: 0.2 },
  textStyle: {
    color: grey,
    fontWeight: "bold",
    fontSize: 20,
  },
  gameChoice: {
    backgroundColor: lightGrey,
    margin: 10,
    height: 50,
    width: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  customHeader: {
    flex: 1,
  },
});
