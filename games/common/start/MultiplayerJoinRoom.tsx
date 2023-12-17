import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useAppStore } from "../../../state";
import { grey, pink } from "../../../Consts";
import { getSpecificWordSet } from "../../../backend/WordSetsBackend";
import { PinkButton } from "../../../components/buttons/BasicButton";
import Llama from "../../../components/llama/Llama";
import FinePrints from "../components/FinePrints";
import mainStyles from "../../../styles/MainStyles";
import textGamesStyles from "../../../styles/games/TextGamesStyles";
import containerGamesStyles from "../../../styles/games/ContainerGamesStyles";

type JoinScreenProps = {
  gameName: string;
  hostName: string;
  wordSetId: number;
  wordSetName: string;
  setWordSetName: (selectedItem: string) => void;
  onPressHandler: () => void;
};

const MultiplayerJoinRoomScreen = ({
  gameName,
  hostName,
  wordSetId,
  wordSetName,
  setWordSetName,
  onPressHandler,
}: JoinScreenProps) => {
  const token = useAppStore.getState().token;

  useEffect(() => {
    console.log(wordSetId);
    getSpecificWordSet(token, wordSetId).then((response) => {
      if (response.type === "success") {
        setWordSetName(response.result.english);
        console.log(wordSetName);
      }
    });
  }, []);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View
          style={[
            containerGamesStyles.textWithMargin,
            { marginBottom: "6%", gap: 10 },
          ]}
        >
          <Text style={[textGamesStyles.information, { textAlign: "center" }]}>
            <Text style={{ color: pink, fontWeight: "700" }}>{hostName}</Text>
            <Text> has invited you to play together!</Text>
          </Text>
          <Text style={textGamesStyles.information}>
            Here is the chosen set:
          </Text>
        </View>
        <View style={[containerGamesStyles.dropDown]}>
          <View style={containerGamesStyles.fakeDropDown}>
            <Text
              style={{
                color: grey,
                textAlign: "left",
                fontSize: 17,
                fontWeight: "600",
              }}
            >
              {wordSetName}
            </Text>
            <FontAwesome name={"lock"} size={19} color={grey} />
          </View>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <FinePrints
            prints={[
              `You will join ${hostName}'s waiting room`,
              `The game will begin when ${hostName} decides`,
            ]}
          />
        </View>
        <PinkButton buttonText={"Join game"} onPress={onPressHandler} />
      </View>
      <Llama />
    </View>
  );
};
export default MultiplayerJoinRoomScreen;
