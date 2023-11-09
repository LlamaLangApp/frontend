import React, { useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import friendsStyles from "../styles/FriendsStyles";
import { grey, lightGrey } from "../Consts";

type UserItem = {
  username: string;
  avatar: string;
  level: number;
};

const UserListItem = ({ username, avatar, level }: UserItem) => {
  const userElement = useMemo(() => {
    return (
      <View style={friendsStyles.usersListItem}>
        <View style={friendsStyles.avatarUsernameContainer}>
          <View style={friendsStyles.userImage}>
            <Image
              source={{ uri: avatar }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={{ fontSize: 23, color: lightGrey }}>{username}</Text>
        </View>
        <View style={friendsStyles.levelContainer}>
          <Text style={{ color: grey, fontSize: 40 }}>{level}</Text>
          <Text style={{ color: grey, fontSize: 10, marginTop: -10 }}>
            Level
          </Text>
        </View>
      </View>
    );
  }, [username, avatar, level]);
  return <TouchableOpacity>{userElement}</TouchableOpacity>;
};
export default UserListItem;
