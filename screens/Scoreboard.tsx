import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../App";
import { View } from "react-native";
import mainStyles from "../styles/MainStyles";
import ButtonRow from "../components/ButtonRow";
import { useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import { games } from "../Consts";
import ScoreboardStyles from "../styles/ScoreboardStyles";
import { FlatList } from "react-native-gesture-handler";
import PlayerListItem from "../components/PlayerListItem";

type Props = NativeStackScreenProps<MainStackParamList, "Home">;

const ranges = {
  thisWeek: "This Week",
  alltime: "All Time",
};

const gameNames = games.map((game) => game.name);
const scoreTypes = ["Games Played"];

export default ({}: Props) => {
  const [, setRange] = useState(ranges.thisWeek);

  const [, setGameName] = useState<string | null>(null);
  // const selectedGame = games.find((game) => game.name == gameName);

  const [, setStoreType] = useState<string | null>(null);

  return (
    <View style={mainStyles.container}>
      <View style={ScoreboardStyles.optionsContainer}>
        <ButtonRow
          choices={[ranges.thisWeek, ranges.alltime]}
          onSelect={setRange}
        />
        <CustomDropdown
          defaultSelectText={"Type"}
          selectData={scoreTypes}
          onSelectFunc={setStoreType}
        />
        <CustomDropdown
          defaultSelectText={"Game"}
          selectData={gameNames}
          onSelectFunc={setGameName}
        />
      </View>
      <FlatList
        style={{ width: "80%" }}
        data={[
          { username: "Ala" },
          { username: "Madzia" },
          { username: "Martyna" },
          { username: "Michał" },
          { username: "Michał" },
          { username: "Michał" },
          { username: "Michał" },
          { username: "Michał" },
          { username: "Michał" },
          { username: "Michał" },
          { username: "Michał" },
        ]}
        renderItem={({ item, index }) => (
          <PlayerListItem username={item.username} place={index + 1} />
        )}
      />
    </View>
  );
};
