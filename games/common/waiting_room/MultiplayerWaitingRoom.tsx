import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import Llama from "@components/llama/Llama";
import PlayersInWaitRoomList from "../components/PlayerListInWaitRoom";
import FinePrints from "../components/FinePrints";
import { grey, pink } from "../../../Consts";
import mainStyles from "@styles/MainStyles";
import containerGamesStyles from "@styles/games/ContainerGamesStyles";
import textStyles from "@styles/TextStyles";

type MultiPlayerWaitingRoomProps = {
  gameName: string;
  leaveGame: () => void;
  usersInWaitRoom: string[];
};

function MultiPlayerWaitingRoomScreen(props: MultiPlayerWaitingRoomProps) {
  const { gameName, usersInWaitRoom, leaveGame } = props;

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey27Weight800}>
            {gameName.toUpperCase()}
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>Waiting for more players</Text>
        </View>
        <ActivityIndicator
          size={"large"}
          color={pink}
          style={{ margin: "2%" }}
        />
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
          <PlayersInWaitRoomList players={usersInWaitRoom} hostName={""} />
        </View>
        <FinePrints
          prints={[
            "When wait room will be full the game will start",
            "Do not want to wait?",
            "You can leave this waiting room",
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

export default MultiPlayerWaitingRoomScreen;
