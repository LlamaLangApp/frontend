import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useAppStore } from "../../state";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import { grey } from "../../Consts";
import React, { useContext, useEffect, useMemo, useState } from "react";
import friendsStyles from "../../styles/FriendsStyles";
import UserListItem from "../../components/UserListItem";
import { FriendsContext, User } from "./Friends";
import { FontAwesome } from "@expo/vector-icons";
import FriendsButtonRow from "../../components/FriendsButtonRow";

type Props = NativeStackScreenProps<FriendsStackParamList, "Invitations">;

function InvitationsScreen({ navigation }: Props) {
  const { token, id, username } = useAppStore((store) => ({
    token: store.token,
    id: store.id,
    username: store.username,
  }));
  const { allUsers } = useContext(FriendsContext);
  const [invitationType, setInvitationType] = useState("Sent");

  console.log(Object.values(allUsers).filter((user) => user.receivedInvite));
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fffcff",
        alignItems: "center",
      }}
    >
      <View style={friendsStyles.mainContainer}>
        <View style={friendsStyles.searchContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: "2%",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "20%",
              }}
              onPress={() => navigation.navigate("List")}
            >
              <FontAwesome name={"chevron-left"} size={12} color={grey} />
              <Text style={{ fontSize: 15, marginLeft: 5, color: grey }}>
                Friends
              </Text>
            </TouchableOpacity>
            <FriendsButtonRow
              choices={["Sent", "Received"]}
              onSelect={setInvitationType}
            />
          </View>
          <Text style={{ fontSize: 20, marginLeft: 5, color: grey }}>
            Your invitations:
          </Text>
          <FlatList
            style={friendsStyles.usersList}
            showsVerticalScrollIndicator={false}
            data={Object.values(allUsers).filter((user) =>
              invitationType === "Sent" ? user.sentInvite : user.receivedInvite
            )}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
            }}
            renderItem={(item) => {
              return (
                <UserListItem
                  id={item.item.id}
                  username={item.item.username}
                  avatar={item.item.avatar}
                  level={item.item.level}
                  onPress={() => undefined}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default InvitationsScreen;
