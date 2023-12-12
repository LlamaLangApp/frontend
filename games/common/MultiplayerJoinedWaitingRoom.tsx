import { FlatList, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useContext } from "react";
import { grey, pink } from "../../Consts";
import { FontAwesome5 } from "@expo/vector-icons";
import { RaceWebSocketContext } from "../race/RaceWebSocket";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Llama from "../../components/games/Llama";
import Toast from "react-native-toast-message";
import PlayersInWaitRoomList from "./components/PlayerListInWaitRoom";
import FinePrints from "./components/FinePrints";

type MultiPlayerWaitingRoomProps = {
  gameName: string;
};

function MultiPlayerJoinedWaitingRoomScreen(
  props: MultiPlayerWaitingRoomProps
) {
  const { usersInWaitRoom, leaveGame } = useContext(RaceWebSocketContext);
  const hostName = "Steve";

  const { gameName } = props;

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.information}>
            <Text style={{ color: pink, fontWeight: "700" }}>{hostName}</Text>
            <Text> is the host of this room,</Text>
          </Text>
          <Text style={textGamesStyles.information}>
            determining who will be joining you
          </Text>
          <Text style={textGamesStyles.information}>
            and when the game will begin
          </Text>
        </View>
        <View
          style={{
            height: "30%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 15, color: grey }}>
              Already in the room:
            </Text>
          </View>
          <PlayersInWaitRoomList
            players={usersInWaitRoom}
            hostName={"alpaka"}
          />
        </View>
        <FinePrints
          prints={[
            `Do not want to wait for ${hostName} to start the game?`,
            `You can leave this waiting room`,
          ]}
        />
        <TouchableOpacity style={{ marginVertical: "2%" }} onPress={leaveGame}>
          <Text style={{ color: "#543685", fontSize: 14 }}>Close room</Text>
        </TouchableOpacity>
      </View>
      <Llama />
      <Toast position="top" topOffset={30} />
    </View>
  );
}

export default MultiPlayerJoinedWaitingRoomScreen;
