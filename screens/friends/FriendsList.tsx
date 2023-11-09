import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import { FriendData, getFriendsData } from "../../backend/FriendsBackend";
import { useAppStore } from "../../state";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import { useContext, useEffect, useState } from "react";
import { FriendsContext } from "./Friends";

type Props = NativeStackScreenProps<FriendsStackParamList, "List">;

function FriendsListScreen({ navigation }: Props) {
  const { token } = useAppStore((store) => ({
    token: store.token,
  }));
  const { friends, setFriends } = useContext(FriendsContext);

  return (
    <View style={mainStyles.container}>
      <TouchableOpacity>
        <Text>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "80%",
          marginTop: 40,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
        onPress={() => navigation.navigate("Search")}
      >
        <Text>Search Users</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FriendsListScreen;
