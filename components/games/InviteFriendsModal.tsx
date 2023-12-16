import React, { useMemo } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import friendsStyles from "../../styles/FriendsStyles";
import { grey } from "../../Consts";
import { Friends } from "../../games/common/MultiplayerOwnerWaitingRoom";
import FriendsListItem from "./FriendsListItem";
import { serverURL } from "../../backend/CommonBackend";

const InviteFriendsModal = ({
  modalVisible,
  closeModal,
  friends,
  setFriendInvite,
  sentInvitations,
}: {
  modalVisible: boolean;
  closeModal: () => void;
  friends: Friends;
  setFriendInvite: (id: number) => void;
  sentInvitations: () => void;
}) => {
  return useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        transparent={true}
      >
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
              width: "90%",
              height: "46%",
              marginTop: "22%",
              marginBottom: "32%",
              backgroundColor: "white",
              padding: 30,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: grey, marginBottom: 18 }}>
              Choose friends to invite
            </Text>
            <FlatList
              style={friendsStyles.usersList}
              refreshing={false}
              showsVerticalScrollIndicator={false}
              data={Object.values(friends)}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ height: 1, backgroundColor: "#bababa" }} />
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={friendsStyles.emptyListContainer}>
                    <Text style={{ color: "#bababa" }}>
                      Unfortunately, you have no friends.
                    </Text>
                    <Text style={{ color: "#bababa" }}>
                      Maybe try solo games or playing with random people?
                    </Text>
                  </View>
                );
              }}
              renderItem={(item) => {
                return (
                  <FriendsListItem
                    id={item.item.id}
                    username={item.item.username}
                    avatar={`http://${serverURL}${item.item.avatar}`}
                    level={item.item.level}
                    invited={item.item.invited}
                    sentInvite={item.item.sendInvite}
                    friends={friends}
                    onPressInCheckBox={() => setFriendInvite(item.item.id)}
                  />
                );
              }}
            />
            <TouchableOpacity onPress={sentInvitations}>
              <Text>Sent Invites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }, [friends, modalVisible]);
};
export default InviteFriendsModal;