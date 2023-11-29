import React, { useContext, useMemo } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { FriendsContext, User } from "../screens/friends/Friends";
import friendsStyles from "../styles/FriendsStyles";
import { grey } from "../Consts";
import {
  acceptFriendsInvite,
  rejectFriendsInvite,
  sendFriendsInvite,
} from "../backend/FriendsBackend";

type UserModal = {
  userId: number;
  id: number;
  token: string | null;
  closeModal: () => void;
};

const UserDisplayModal = ({ userId, id, token, closeModal }: UserModal) => {
  const {
    allUsers,
    setAllUsers,
    setUserInAllUsers,
    friends,
    setFriends,
    filteredUsers,
    setFilteredUsers,
    users,
    setUsers,
  } = useContext(FriendsContext);

  // return useMemo(() => {
  console.log(
    Object.values(allUsers)
      .map((item) => `${item.username}  ${item.receivedInvite}`)
      .join("\n")
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        style={{
          marginTop: "20%",
          width: "80%",
          height: "45%",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <View style={friendsStyles.userModalImage}>
          <Image
            source={{ uri: allUsers[userId].avatar }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={{ color: grey, fontSize: 30 }}>
          {allUsers[userId].username}
        </Text>
        <Text style={{ color: grey, fontSize: 16 }}>
          Level: {allUsers[userId].level}
        </Text>

        {allUsers[userId].isFriend ? (
          <TouchableOpacity
            style={{
              width: "80%",
              height: "12%",
              backgroundColor: "lightgrey",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
            // onPress={() => {}}
          >
            <Text>Delete Friend</Text>
          </TouchableOpacity>
        ) : allUsers[userId].sentInvite ? (
          <TouchableOpacity
            style={{
              width: "80%",
              height: "12%",
              backgroundColor: "lightgrey",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
            // onPress={() => {}}
          >
            <Text>Cancel Invite</Text>
          </TouchableOpacity>
        ) : allUsers[userId].receivedInvite ? (
          <View style={{ flexDirection: "row", width: "80%", height: "12%" }}>
            <TouchableOpacity
              style={{
                width: "48%",
                height: "100%",
                backgroundColor: "lightgrey",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
                marginRight: "2%",
              }}
              onPress={() => {
                acceptFriendsInvite(
                  allUsers[userId].receivedInvite,
                  token
                ).then((response) => {
                  console.log(response);
                  if (response.type === "success") {
                    setUserInAllUsers({
                      ...allUsers[userId],
                      receivedInvite: null,
                      isFriend: response.result.friendship_id,
                    });
                  }
                });
              }}
            >
              <Text>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "48%",
                height: "100%",
                backgroundColor: "lightgrey",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
                marginLeft: "2%",
              }}
              onPress={() => {
                rejectFriendsInvite(
                  allUsers[userId].receivedInvite,
                  token
                ).then((response) => {
                  console.log(response);
                  if (response.type === "success") {
                    setUserInAllUsers({
                      ...allUsers[userId],
                      receivedInvite: null,
                    });
                  }
                });
              }}
            >
              <Text>Reject</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              width: "80%",
              height: "12%",
              backgroundColor: "lightgrey",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={() => {
              console.log(userId);
              sendFriendsInvite(allUsers[userId].id, id, token).then(
                (response) => {
                  console.log(response);
                  if (response.type === "success") {
                    setUserInAllUsers({
                      ...allUsers[userId],
                      sentInvite: response.result.id,
                    });
                  }
                }
              );
            }}
          >
            <Text>Invite</Text>
          </TouchableOpacity>
        )}
        <Button title="Close" onPress={closeModal} />
      </View>
    </View>
  );
  // }, [user]);
};
export default UserDisplayModal;
