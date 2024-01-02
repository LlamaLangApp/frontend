import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { FriendsStackParamList } from "@navigation/FriendsStack";
import { FriendsContext } from "./Friends";
import FriendsButtonRow from "@components/friends/FriendsButtonRow";
import InviteListItem from "@components/friends/InviteListItem";
import EmptyListText from "@components/EmptyListText";
import { grey } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import friendsStyles from "@styles/FriendsStyles";

type Props = NativeStackScreenProps<FriendsStackParamList, "Invitations">;

function InvitationsScreen({ navigation }: Props) {
  const {
    allUsers,
    handleAcceptInvite,
    handleRejectInvite,
    handleCancelInvite,
    fetchAllFriendsData,
  } = useContext(FriendsContext);
  const [invitationType, setInvitationType] = useState("Received");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchAllFriendsData();
    setIsRefreshing(false);
  };

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={friendsStyles.mainContainer}>
        <View style={friendsStyles.searchContainer}>
          <View style={friendsStyles.titleContainer}>
            <TouchableOpacity
              style={friendsStyles.goBackButton}
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
            ListEmptyComponent={() => {
              return invitationType === "Received" ? (
                <EmptyListText
                  texts={[
                    `No friend requests to accept?`,
                    `Be the first to reach out and connect!`,
                  ]}
                />
              ) : (
                <EmptyListText
                  texts={[
                    `No pending friend requests?`,
                    `Send out some invitations and start connecting!`,
                    `Your new friends are just a message away.`,
                  ]}
                />
              );
            }}
            renderItem={(item) => {
              return (
                <InviteListItem
                  id={item.item.id}
                  invitationType={invitationType}
                  username={item.item.username}
                  avatar={item.item.avatar}
                  level={item.item.level}
                  onPress1={handleAcceptInvite}
                  onPress2={
                    invitationType === "Sent"
                      ? handleCancelInvite
                      : handleRejectInvite
                  }
                />
              );
            }}
          />
          <View style={friendsStyles.searchButtonContainer}>
            <TouchableOpacity
              style={friendsStyles.searchButton}
              onPress={() => navigation.navigate("Search")}
            >
              <Text style={{ fontSize: 14, color: grey, marginRight: 5 }}>
                Search for more users
              </Text>
              <FontAwesome name={"search"} size={12} color={grey} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default InvitationsScreen;
