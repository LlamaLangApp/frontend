import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useEffect, useState } from "react";
import { grey, lightGrey, pink } from "../../Consts";
import { FontAwesome } from "@expo/vector-icons";
import friendsStyles from "../../styles/FriendsStyles";
import { getFriendsData } from "../../backend/FriendsBackend";
import { useAppStore } from "../../state";
import { serverURL } from "../../backend/CommonBackend";
import FriendsListItem from "../../components/games/FriendsListItem";

type MultiPlayerWaitingRoomProps = {
  gameName: string;
};

export type Friends = {
  [id: number]: {
    id: number;
    level: number;
    avatar: string;
    username: string;
    sendInvite: boolean;
    invited: boolean;
  };
};

function MultiPlayerOwnerWaitingRoomScreen(props: MultiPlayerWaitingRoomProps) {
  const { token } = useAppStore((store) => ({
    token: store.token,
  }));
  const { gameName } = props;

  const [modalVisible, setModalVisible] = useState(false);
  // const [otherPlayersInRoom, setOtherPlayersInRoom] = useState(false);
  const [otherPlayersInRoom] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [friends, setFriends] = useState<Friends>([]);

  function setFriendInvite(id: number) {
    setFriends({
      ...friends,
      [id]: { ...friends[id], sendInvite: !friends[id].sendInvite },
    });
  }

  console.log(friends);

  function sentInvitations() {
    const updatedFriends: Friends = { ...friends };
    Object.keys(updatedFriends).forEach((friendId) => {
      const id = parseInt(friendId);
      if (updatedFriends[id].sendInvite) {
        console.log("sent");
        updatedFriends[id] = { ...updatedFriends[id], invited: true };
      }
    });
    setFriends(updatedFriends);
  }

  useEffect(() => {
    getFriendsData(token).then((response) => {
      if (response.type === "success") {
        setFriends(
          Object.fromEntries(
            response.result.map((friend) => {
              return [
                friend.friend.id,
                {
                  id: friend.friend.id,
                  level: friend.friend.level,
                  avatar: friend.friend.avatar,
                  username: friend.friend.username,
                  sendInvite: false,
                  invited: false,
                },
              ];
            })
          )
        );
      }
    });
  }, []);
  console.log(friends);
  return (
    <View style={mainStyles.whiteBackgroundContainer}>
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
      <View
        style={{
          flex: 5.2,
          justifyContent: "flex-end",
          margin: "5%",
          width: "90%",
          alignItems: "center",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            marginBottom: "3%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 27,
              color: grey,
              fontWeight: "800",
            }}
          >
            {gameName.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            marginBottom: "3%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: grey,
            }}
          >
            You are the owner of this room
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: grey,
              marginBottom: "50%",
            }}
          >
            Decide with who you want to play
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            height: "9%",
            borderRadius: 15,
            backgroundColor: lightGrey,
            marginVertical: "2%",
          }}
          onPress={openModal}
        >
          <Text style={{ color: grey, fontWeight: "600", fontSize: 19 }}>
            Invite friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            height: "9%",
            borderRadius: 15,
            backgroundColor: otherPlayersInRoom ? pink : grey,
            margin: "2%",
            flexDirection: "row",
            gap: 10,
          }}
          activeOpacity={otherPlayersInRoom ? 0.2 : 1}
        >
          <Text
            style={{
              color: otherPlayersInRoom ? "white" : lightGrey,
              fontWeight: "600",
              fontSize: 19,
            }}
          >
            Start game
          </Text>
          {!otherPlayersInRoom && (
            <FontAwesome name={"lock"} size={19} color={lightGrey} />
          )}
        </TouchableOpacity>
        <Text style={{ color: "#bababa", fontSize: 12 }}>
          You need some friends to join to start the game
        </Text>
        <Text style={{ color: "#bababa", fontSize: 12 }}>
          If you do not want to wait
        </Text>
        <Text style={{ color: "#bababa", fontSize: 12 }}>
          Maybe try solo games or playing with random people?
        </Text>
        <TouchableOpacity style={{ marginVertical: "2%" }}>
          <Text style={{ color: "#543685", fontSize: 14 }}>Close room</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={require("../../assets/llama.png")}
          style={{
            width: 250,
            height: 250,
          }}
        />
      </View>
    </View>
  );
}

export default MultiPlayerOwnerWaitingRoomScreen;
