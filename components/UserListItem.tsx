import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import friendsStyles from "../styles/FriendsStyles";
import { grey, lightGrey, pink } from "../Consts";
import { FontAwesome } from "@expo/vector-icons";

type UserItem = {
  id: number;
  username: string;
  avatar: string;
  level: number;
  onPress: (id: number) => void;
};

const UserListItem = ({ id, username, avatar, level, onPress }: UserItem) => {
  return useMemo(() => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => onPress(id)}
      >
        <View
          style={{
            flexDirection: "row",
            marginVertical: "1.5%",
            marginRight: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={friendsStyles.userImage}>
            <Image
              source={{ uri: avatar }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 20, color: grey }}>{username}</Text>
            <Text style={{ fontSize: 13, color: grey }}>Level: {level}</Text>
          </View>
        </View>
        <View style={friendsStyles.levelContainer}>
          <FontAwesome name={"chevron-down"} size={12} color={grey} />
        </View>
      </TouchableOpacity>
    );
  }, [username, avatar, level]);
};
export default UserListItem;
