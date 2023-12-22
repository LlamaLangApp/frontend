import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { serverURL } from "@backend/CommonBackend";
import { Friends } from "@games/common/waiting_room/MultiplayerOwnerWaitingRoom";
import FriendsListItem from "./FriendsListItem";
import { grey } from "../../Consts";
import friendsStyles from "@styles/FriendsStyles";
import containerStyles from "@styles/ContainerStyles";
import textStyles from "@styles/TextStyles";

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
                  <View style={containerStyles.emptyList}>
                    <Text style={textStyles.emptyList}>
                      Unfortunately, you have no friends.
                    </Text>
                    <Text style={textStyles.emptyList}>
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
