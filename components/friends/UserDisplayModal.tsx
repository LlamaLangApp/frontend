import React, { useContext, useMemo } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { FriendsContext } from "../../screens/friends/Friends";
import { grey } from "../../Consts";
import friendsStyles from "../../styles/FriendsStyles";
import containerStyles from "../../styles/ContainerStyles";

type UserModal = {
  userId: number;
  closeModal: () => void;
};

const UserDisplayModal = ({ userId, closeModal }: UserModal) => {
  const {
    allUsers,
    handleInvite,
    handleAcceptInvite,
    handleRejectInvite,
    handleCancelInvite,
    handleDeleteFriend,
  } = useContext(FriendsContext);
  return useMemo(() => {
    return (
      <View style={containerStyles.modal}>
        <View style={friendsStyles.modalDisplay}>
          <View style={friendsStyles.userModalImage}>
            <Image
              source={{ uri: allUsers[userId].avatar }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={{ color: grey, fontSize: 30, marginBottom: 3 }}>
            {allUsers[userId].username}
          </Text>
          <Text style={{ color: grey, fontSize: 16, marginBottom: 20 }}>
            Level: {allUsers[userId].level}
          </Text>

          {allUsers[userId].isFriend ? (
            <View style={friendsStyles.buttonModalContainer}>
              <TouchableOpacity
                style={friendsStyles.button}
                onPress={() => handleDeleteFriend(userId)}
              >
                <Text>Delete Friend</Text>
              </TouchableOpacity>
            </View>
          ) : allUsers[userId].sentInvite ? (
            <View style={friendsStyles.buttonModalContainer}>
              <TouchableOpacity
                style={friendsStyles.button}
                onPress={() => handleCancelInvite(userId)}
              >
                <Text>Cancel Invite</Text>
              </TouchableOpacity>
            </View>
          ) : allUsers[userId].receivedInvite ? (
            <View style={friendsStyles.buttonModalContainer}>
              <TouchableOpacity
                style={friendsStyles.halfButton}
                onPress={() => handleAcceptInvite(userId)}
              >
                <Text>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={friendsStyles.halfButton}
                onPress={() => handleRejectInvite(userId)}
              >
                <Text>Reject</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={friendsStyles.buttonModalContainer}>
              <TouchableOpacity
                style={friendsStyles.button}
                onPress={() => handleInvite(userId)}
              >
                <Text>Invite</Text>
              </TouchableOpacity>
            </View>
          )}
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    );
  }, [allUsers[userId]]);
};

export default UserDisplayModal;
