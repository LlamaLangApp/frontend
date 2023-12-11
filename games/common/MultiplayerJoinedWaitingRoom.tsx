import { FlatList, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useContext } from "react";
import { grey, pink } from "../../Consts";
import { FontAwesome5 } from "@expo/vector-icons";
import { RaceWebSocketContext } from "../race/RaceWebSocket";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import Llama from "../../components/games/Llama";

type MultiPlayerWaitingRoomProps = {
  gameName: string;
};

function MultiPlayerJoinedWaitingRoomScreen(
  props: MultiPlayerWaitingRoomProps
) {
  const { ws, usersInWaitRoom } = useContext(RaceWebSocketContext);
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
                {item === hostName && (
                  <FontAwesome5 name={"crown"} size={16} color={pink} />
                )}
              </View>
            )}
          />
        </View>
        <Text style={textGamesStyles.finePrint}>
          Do not want to wait for {hostName} to start the game?
        </Text>
        <Text style={textGamesStyles.finePrint}>
          You can leave this waiting room
        </Text>
        <TouchableOpacity style={{ marginVertical: "2%" }}>
          <Text style={{ color: "#543685", fontSize: 14 }}>Close room</Text>
        </TouchableOpacity>
      </View>
      <Llama />
    </View>
  );
}

export default MultiPlayerJoinedWaitingRoomScreen;
