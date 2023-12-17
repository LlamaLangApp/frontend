import { ActivityIndicator, Text, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import ButtonRow from "../components/ButtonRow";
import React, { useEffect, useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import { grey, pink } from "../Consts";
import ScoreboardStyles from "../styles/ScoreboardStyles";
import { FlatList } from "react-native-gesture-handler";
import PlayerListItem from "../components/PlayerListItem";
import { getScoreboard, ScoreboardData } from "../backend/ScoreboardBackend";
import { useAppStore } from "../state";
import { useIsFocused } from "@react-navigation/native";
import friendsStyles from "../styles/FriendsStyles";

const ranges = {
  allTime: "All Time",
  thisWeek: "This Week",
};

const defaultValue = ranges.thisWeek;

export default () => {
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
      <View style={{ marginTop: 30, width: "100%" }}>
        <ButtonRow
          choices={[
            { choice: "Global", icon: "globe-americas" },
            { choice: "Friends", icon: "user-friends" },
          ]}
          onSelect={setScoreboardType}
        />
      </View>
      <View style={ScoreboardStyles.optionsContainer}>
        <CustomDropdown
          defaultSelectText={"Game"}
          selectData={[ranges.allTime, ranges.thisWeek]}
          onSelectFunc={(item) => {
            setTimePeriod(item);
          }}
          defaultValue={defaultValue}
        />
      </View>
      {data ? (
        <FlatList
          style={{ width: "86%", borderRadius: 10, marginBottom: "3%" }}
          data={data?.top_100}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
          }}
          ListEmptyComponent={() => {
            return (
              <View style={friendsStyles.emptyListContainer}>
                <Text style={{ color: "#bababa" }}>
                  There is nothing to show
                </Text>
              </View>
            );
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
      <View style={{ width: "86%", height: "12%", marginBottom: "5%" }}>
        <Text style={{ color: grey, marginBottom: "0.9%" }}>Your place:</Text>
        <View style={{ height: 1, backgroundColor: grey }} />
        {data ? (
          <PlayerListItem
            username={data.user.username}
            place={data.user.place}
            score={data.user.points}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};
