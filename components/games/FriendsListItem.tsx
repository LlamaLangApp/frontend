import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import friendsStyles from "@styles/FriendsStyles";
import { grey, pink } from "../../Consts";
import { FontAwesome } from "@expo/vector-icons";
import { Friends } from "@games/common/waiting_room/MultiplayerOwnerWaitingRoom";

type UserItem = {
  id: number;
  username: string;
  avatar: string;
  level: number;
  invited: boolean;
  sentInvite: boolean;
  friends: Friends;
  onPressInCheckBox: (id: number) => void;
};

const FriendsListItem = ({
  id,
  username,
  avatar,
  level,
  invited,
  sentInvite,
  friends,
  onPressInCheckBox,
}: UserItem) => {
  return useMemo(() => {
    return (
      <View style={friendsStyles.usersListItem}>
        <View style={friendsStyles.userDisplay}>
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
          {invited ? (
            <View>
              <FontAwesome name={"check-square-o"} size={30} color={grey} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => onPressInCheckBox(id)}
              style={!sentInvite ? { marginRight: 4.2 } : {}}
            >
              <FontAwesome
                name={sentInvite ? "check-square-o" : "square-o"}
                size={30}
                color={pink}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }, [friends]);
};
export default FriendsListItem;
