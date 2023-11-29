import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import { grey } from "../../Consts";
import React, { useContext, useState } from "react";
import friendsStyles from "../../styles/FriendsStyles";
import { FriendsContext } from "./Friends";
import { FontAwesome } from "@expo/vector-icons";
import FriendsButtonRow from "../../components/friends/FriendsButtonRow";
import InviteListItem from "../../components/friends/InviteListItem";

type Props = NativeStackScreenProps<FriendsStackParamList, "Invitations">;

function InvitationsScreen({ navigation }: Props) {
  const { allUsers, fetchAllFriendsData } = useContext(FriendsContext);
  const [invitationType, setInvitationType] = useState("Received");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchAllFriendsData().then(() => setIsRefreshing(false));
  };

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
              choices={["Received", "Sent"]}
              onSelect={setInvitationType}
            />
          </View>
          <Text style={{ fontSize: 20, marginLeft: 5, color: grey }}>
            Your invitations:
          </Text>
          <FlatList
            style={friendsStyles.usersList}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            data={Object.values(allUsers).filter((user) =>
              invitationType === "Sent" ? user.sentInvite : user.receivedInvite
            )}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
            }}
            renderItem={(item) => {
              return (
                <InviteListItem
                  id={item.item.id}
                  invitationType={invitationType}
                  username={item.item.username}
                  avatar={item.item.avatar}
                  level={item.item.level}
                  onPress1={() => undefined}
                  onPress2={() => undefined}
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
