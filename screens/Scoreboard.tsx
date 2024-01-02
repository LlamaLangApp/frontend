import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { getScoreboard, ScoreboardData } from "@backend/ScoreboardBackend";
import { useAppStore } from "../state";
import ButtonRow from "@components/ButtonRow";
import CustomDropdown from "@components/CustomDropdown";
import PlayerListItem from "@components/PlayerListItem";
import EmptyListText from "@components/EmptyListText";
import { pink } from "../Consts";
import mainStyles from "@styles/MainStyles";
import scoreboardStyles from "@styles/ScoreboardStyles";
import containerStyles from "@styles/ContainerStyles";

const ranges = {
  allTime: "All Time",
  thisWeek: "This Week",
};
const defaultValue = ranges.thisWeek;

const ScoreboardScreen = () => {
  const isFocused = useIsFocused();
  const token = useAppStore((store) => store.token);

  const [timePeriod, setTimePeriod] = useState<string>(ranges.allTime);
  const [scoreboardType, setScoreboardType] = useState<string>("Global");
  const [data, setData] = useState<ScoreboardData | null>(null);

  useEffect(() => {
    if (!isFocused) {
      setData(null);
      return;
    }
    let period: "all_time" | "this_week";
    if (timePeriod === ranges.allTime) {
      period = "all_time";
    } else {
      period = "this_week";
    }
    if (!token) {
      console.warn("No token for fetching scoreboard");
      return;
    }

    getScoreboard(token, period, scoreboardType.toLowerCase()).then(
      (response) => {
        if (response.type === "error") {
          console.error(response.message);
          return;
        }
        setData(response.result);
      }
    );
  }, [scoreboardType, timePeriod, isFocused]);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerStyles.buttonRow}>
        <ButtonRow
          choices={[
            { choice: "Global", icon: "globe-americas" },
            { choice: "Friends", icon: "user-friends" },
          ]}
          onSelect={setScoreboardType}
        />
      </View>
      <View style={scoreboardStyles.optionsContainer}>
        <CustomDropdown
          defaultSelectText={"Game"}
          selectData={[ranges.allTime, ranges.thisWeek]}
          onSelectFunc={(item) => setTimePeriod(item)}
          defaultValue={defaultValue}
        />
      </View>
      {data ? (
        <FlatList
          style={scoreboardStyles.playerPlaceList}
          data={data?.top_100}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={containerStyles.thinLine} />;
          }}
          ListEmptyComponent={() => {
            return <EmptyListText texts={[`There is nothing to show`]} />;
          }}
          renderItem={({ item }) => (
            <PlayerListItem
              username={item.username}
              place={item.place}
              score={item.points}
            />
          )}
        />
      ) : (
        <ActivityIndicator size={"large"} color={pink} />
      )}
      <View style={scoreboardStyles.userPlaceContainer}>
        <Text style={scoreboardStyles.userPlaceText}>Your place:</Text>
        <View style={containerStyles.darkerThinLine} />
        {data && (
          <PlayerListItem
            username={data.user.username}
            place={data.user.place}
            score={data.user.points}
          />
        )}
      </View>
    </View>
  );
};

export default ScoreboardScreen;
