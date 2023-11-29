import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import friendsStyles from "../../styles/FriendsStyles";
import { buttonDarkPink, grey } from "../../Consts";
import { FontAwesome } from "@expo/vector-icons";

type InviteItem = {
  id: number;
  invitationType: string;
  username: string;
  avatar: string;
  level: number;
  onPress1: (id: number) => void;
  onPress2: (id: number) => void;
};

const InviteListItem = ({
  id,
  invitationType,
  username,
  avatar,
  level,
  onPress1,
  onPress2,
}: InviteItem) => {
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
        {invitationType === "Received" ? (
          <View style={friendsStyles.iconsContainer}>
            <TouchableOpacity
              style={friendsStyles.acceptButton}
              onPress={() => onPress1(id)}
            >
              <View style={{ margin: 7 }}>
                <FontAwesome name={"check"} size={18} color={"#6aa162"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={friendsStyles.rejectButton}
              onPress={() => onPress2(id)}
            >
              <View style={{ margin: 7, marginHorizontal: 9 }}>
                <FontAwesome name={"close"} size={18} color={buttonDarkPink} />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={friendsStyles.rejectButton}
            onPress={() => onPress2(id)}
          >
            <View style={{ margin: 7, marginHorizontal: 9 }}>
              <FontAwesome name={"close"} size={18} color={buttonDarkPink} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [username, avatar, level]);
};
export default InviteListItem;
