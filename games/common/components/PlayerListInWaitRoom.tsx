import { FlatList, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useAppStore } from "../../../state";
import { FontAwesome5 } from "@expo/vector-icons";
import { grey, pink } from "../../../Consts";
import textStyles from "@styles/TextStyles";

const PlayerInWaitRoom = ({
  username,
  hostName,
}: {
  username: string;
  hostName: string;
}) => {
  const user = useAppStore.getState().username;
  return useMemo(() => {
    return (
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
        <Text style={[textStyles.button, { color: grey }]}>{username}</Text>
        {username === hostName && (
          <FontAwesome5 name={"crown"} size={16} color={pink} />
        )}
        {user === username && (
          <Text style={textStyles.grey14Weight600}>(YOU)</Text>
        )}
      </View>
    );
  }, [username, hostName]);
};

const PlayersInWaitRoomList = ({
  players,
  hostName,
}: {
  players: string[];
  hostName: string;
}) => {
  return useMemo(() => {
    return (
      <FlatList
        style={{
          width: "70%",
          borderRadius: 10,
          height: "30%",
          marginBottom: "5%",
        }}
        data={players}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
        }}
        renderItem={({ item }) => (
          <PlayerInWaitRoom username={item} hostName={hostName} />
        )}
      />
    );
  }, [hostName, players]);
};

export default PlayersInWaitRoomList;
