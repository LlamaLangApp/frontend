import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { grey, pink } from "../../../Consts";
import Llama from "../../../components/llama/Llama";
import PlayersInWaitRoomList from "../components/PlayerListInWaitRoom";
import FinePrints from "../components/FinePrints";
import mainStyles from "../../../styles/MainStyles";
import containerGamesStyles from "../../../styles/games/ContainerGamesStyles";
import textStyles from "../../../styles/TextStyles";

type MultiPlayerWaitingRoomProps = {
  gameName: string;
  hostName: string;
  leaveGame: () => void;
  usersInWaitRoom: string[];
};

function MultiPlayerJoinedWaitingRoomScreen({
  gameName,
  hostName,
  usersInWaitRoom,
  leaveGame,
}: MultiPlayerWaitingRoomProps) {
  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey27Weight800}>
            {gameName.toUpperCase()}
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>
            <Text style={{ color: pink, fontWeight: "700" }}>{hostName}</Text>
            <Text> is the host of this room,</Text>
          </Text>
          <Text style={textStyles.grey18}>
            determining who will be joining you
          </Text>
          <Text style={textStyles.grey18}>and when the game will begin</Text>
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
            hostName={hostName}
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
