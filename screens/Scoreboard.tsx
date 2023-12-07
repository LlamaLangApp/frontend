import { ActivityIndicator, Text, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import ButtonRow from "../components/ButtonRow";
import React, { useEffect, useMemo, useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import { games, pink } from "../Consts";
import ScoreboardStyles from "../styles/ScoreboardStyles";
import { FlatList } from "react-native-gesture-handler";
import PlayerListItem, { PlaceItem } from "../components/PlayerListItem";
import { getStatistics } from "../backend/StatisticsBackend";
import { useAppStore } from "../state";
import { useIsFocused } from "@react-navigation/native";
import friendsStyles from "../styles/FriendsStyles";

const ranges = {
  thisWeek: "This Week",
  allTime: "All Time",
};

const gameNames = games.map((game) => game.name);
const defaultValue = "Memory";

function handleResults(
  results: { username: string; stat: number }[],
  sort: "asc" | "desc",
  display: (stat: number) => string
): PlaceItem[] {
  if (sort === "asc") {
    results.sort((a, b) => a.stat - b.stat);
  } else if (sort === "desc") {
    results.sort((a, b) => b.stat - a.stat);
  }

  const final = [];

  let currentPlace = 0;
  let currentStat = null;
  for (const { username, stat } of results) {
    if (stat !== currentStat) {
      currentPlace += 1;
      currentStat = stat;
    }

    final.push({ username, stat: display(stat), place: currentPlace });
  }

  return final;
}

export default () => {
  const isFocused = useIsFocused();
  const token = useAppStore((store) => store.token);

  const [range, setRange] = useState(ranges.thisWeek);

  const [gameName, setGameName] = useState<string | null>(defaultValue);
  const selectedGame = games.find((game) => game.name == gameName);

  const [scoreType, setScoreType] = useState<string | null>(null);
  const selectedType = selectedGame?.statistics?.find(
    (stat) => stat.name === scoreType
  );
  const [selected, setSelected] = useState(false);
  const typeDropdown = useMemo(() => {
    if (!selectedGame) {
      return null;
    }

    const options = selectedGame.statistics.map((stat) => stat.name);

    if (options.length == 0) {
      return null;
    }

    return (
      <CustomDropdown
        defaultSelectText={"Type"}
        selectData={options}
        onSelectFunc={(item) => {
          setScoreType(item);
          setSelected(true);
        }}
      />
    );
  }, [selectedGame, setScoreType]);

  const readyToFetch = selectedGame && selectedType;
  const [data, setData] = useState<null | PlaceItem[]>(null);

  useEffect(() => {
    if (!readyToFetch || !isFocused) {
      setData(null);
      return;
    }
    let period: null | "all_time" | "this_week" = null;
    if (range === ranges.allTime) {
      period = "all_time";
    } else if (range == ranges.thisWeek) {
      period = "this_week";
    } else {
      return;
    }
    if (!token) {
      console.warn("No token for fetching scoreboard");
      return;
    }
    if (selectedGame.backend_name !== "memory") {
      console.warn("Only memory supported for now");
      return;
    }

    getStatistics(
      token,
      selectedGame.backend_name,
      period,
      selectedType.aggregate,
      selectedType.statistic
    ).then((response) => {
      if (response.type === "error") {
        console.error(response.message);
        return;
      }
      setData(
        handleResults(
          response.result,
          selectedType.order,
          selectedType.display ?? String
        )
      );
    });
  }, [range, selectedGame, selectedType, isFocused]);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={{ marginTop: 30, width: "100%" }}>
        <ButtonRow
          choices={[
            { choice: ranges.thisWeek, icon: "user-friends" },
            { choice: ranges.allTime, icon: "user-friends" },
          ]}
          onSelect={setRange}
        />
      </View>
      <View style={ScoreboardStyles.optionsContainer}>
        <CustomDropdown
          defaultSelectText={"Game"}
          selectData={gameNames}
          onSelectFunc={(game) => {
            if (game !== gameName) {
              setGameName(game);
              setScoreType(null);
            }
          }}
          defaultValue={defaultValue}
        />
        {typeDropdown}
      </View>
      {data || !readyToFetch ? (
        <FlatList
          style={{ width: "86%", borderRadius: 10, marginBottom: "3%" }}
          data={data}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
          }}
          ListEmptyComponent={() => {
            return (
              <View style={friendsStyles.emptyListContainer}>
                <Text style={{ color: "#bababa" }}>
                  {selected
                    ? "There is nothing to show"
                    : "Chose statistics to display"}
                </Text>
              </View>
            );
          }}
          renderItem={({ item }) => (
            <PlayerListItem
              username={item.username}
              place={item.place}
              stat={item.stat}
            />
          )}
        />
      ) : (
        <ActivityIndicator size={"large"} color={pink} />
      )}
    </View>
  );
};
