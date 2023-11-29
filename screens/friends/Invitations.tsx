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
import mainStyles from "../../styles/MainStyles";

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
    fetchAllFriendsData().then(() => setIsRefreshing(false));
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
        </View>
      </View>
    </View>
  );
}

export default InvitationsScreen;
