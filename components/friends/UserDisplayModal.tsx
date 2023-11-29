import React, { useContext } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { FriendsContext } from "../../screens/friends/Friends";
import friendsStyles from "../../styles/FriendsStyles";
import { grey } from "../../Consts";

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

  return (
    <View style={friendsStyles.modal}>
      <View style={friendsStyles.modalDisplay}>
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
            style={friendsStyles.button}
            onPress={() => handleDeleteFriend(userId)}
          >
            <Text>Delete Friend</Text>
          </TouchableOpacity>
        ) : allUsers[userId].sentInvite ? (
          <TouchableOpacity
            style={friendsStyles.button}
            onPress={() => handleCancelInvite(userId)}
          >
            <Text>Cancel Invite</Text>
          </TouchableOpacity>
        ) : allUsers[userId].receivedInvite ? (
          <View style={{ flexDirection: "row", width: "80%", height: "12%" }}>
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
          <TouchableOpacity
            style={friendsStyles.button}
            onPress={() => handleInvite(userId)}
          >
            <Text>Invite</Text>
          </TouchableOpacity>
        )}
        <Button title="Close" onPress={closeModal} />
      </View>
    </View>
  );
};

export default UserDisplayModal;
