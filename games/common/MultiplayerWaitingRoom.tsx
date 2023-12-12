import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useContext } from "react";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import { RaceWebSocketContext } from "../race/RaceWebSocket";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import { grey, pink } from "../../Consts";
import Llama from "../../components/games/Llama";
import { useAppStore } from "../../state";
import Toast from "react-native-toast-message";

type MultiPlayerWaitingRoomProps = {
  gameName: string;
};
function MultiPlayerWaitingRoomScreen(props: MultiPlayerWaitingRoomProps) {
  const { gameName } = props;
  const username = useAppStore.getState().username;
  const { usersInWaitRoom, leaveGame } = useContext(RaceWebSocketContext);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.information}>
            Waiting for more players
          </Text>
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
          <FlatList
            style={{
              width: "70%",
              borderRadius: 10,
              height: "30%",
              marginBottom: "5%",
            }}
            data={usersInWaitRoom}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingVertical: 5,
                  margin: 2,
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <Text style={[textGamesStyles.button, { color: grey }]}>
                  {item}
                </Text>
                {item === username && (
                  <Text
                    style={{ fontWeight: "600", fontSize: 13, color: grey }}
                  >
                    (YOU)
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <Text style={textGamesStyles.finePrint}>
          When wait room will be full the game will start
        </Text>
        <Text style={textGamesStyles.finePrint}>Do not want to wait?</Text>
        <Text style={textGamesStyles.finePrint}>
          You can leave this waiting room
        </Text>
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
