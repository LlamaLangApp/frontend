import { FlatList, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useContext, useEffect, useState } from "react";
import { grey, lightGrey, pink } from "../../Consts";
import { FontAwesome5 } from "@expo/vector-icons";
import { getFriendsData } from "../../backend/FriendsBackend";
import { useAppStore } from "../../state";
import { RaceWebSocketContext } from "../race/RaceWebSocket";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import InviteFriendsModal from "../../components/games/InviteFriendsModal";
import Llama from "../../components/games/Llama";
import Toast from "react-native-toast-message";
import BlockedButton from "./components/BlockedButton";

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
  const { ws, leaveGame, usersInWaitRoom } = useContext(RaceWebSocketContext);

  const { gameName } = props;

  const [modalVisible, setModalVisible] = useState(false);
  // const [otherPlayersInRoom, setOtherPlayersInRoom] = useState(false);
  const otherPlayersInRoom = () => {
    return usersInWaitRoom.length >= 2;
  };

  async function startGameHandler() {
    // console.log("Joining Steve...", setName);
    ws.send(JSON.stringify({ type: "start_game" }));
    // startGameAsOwner();
  }

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

  function sentInvitations() {
    const updatedFriends: Friends = { ...friends };
    Object.keys(updatedFriends).forEach((friendId) => {
      const id = parseInt(friendId);
      if (!updatedFriends[id].invited && updatedFriends[id].sendInvite) {
        ws.send(
          JSON.stringify({
            type: "player_invitation",
            user_id: id,
          })
        );
        updatedFriends[id] = { ...updatedFriends[id], invited: true };
      }
    });
    setFriends(updatedFriends);
  }

  useEffect(() => {
    getFriendsData(token).then((response) => {
      if (response.type === "success") {
        const friendsData: Friends = Object.fromEntries(
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
        );
        setFriends(friendsData);
      }
    });
  }, []);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <InviteFriendsModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        friends={friends}
        setFriendInvite={setFriendInvite}
        sentInvitations={sentInvitations}
      />
      <View style={containerGamesStyles.screen}>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.gameName}>{gameName.toUpperCase()}</Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textGamesStyles.information}>
            You are the owner of this room
          </Text>
          <Text style={textGamesStyles.information}>
            Decide with who you want to play
          </Text>
        </View>
        <View
          style={{
            height: "30%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 15, color: grey }}>
              Already in the room:
            </Text>
          </View>
          <FlatList
            style={{
              width: "70%",
              borderRadius: 10,
              height: "30%",
              marginBottom: "5%",
            }}
            data={usersInWaitRoom}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingVertical: 5,
                  margin: 2,
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <Text style={[textGamesStyles.button, { color: grey }]}>
                  {item}
                </Text>
                {item === "aplaka" && (
                  <FontAwesome5 name={"crown"} size={16} color={pink} />
                )}
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          style={[buttonGamesStyles.basic, { backgroundColor: lightGrey }]}
          onPress={openModal}
        >
          <Text style={[textGamesStyles.button, { color: grey }]}>
            Invite friends
          </Text>
        </TouchableOpacity>
        <BlockedButton
          buttonText={"Start game"}
          condition={otherPlayersInRoom()}
          onPress={startGameHandler}
        />
        <Text style={textGamesStyles.finePrint}>
          You need some friends to join to start the game
        </Text>
        <Text style={textGamesStyles.finePrint}>
          If you do not want to wait
        </Text>
        <Text style={textGamesStyles.finePrint}>
          Maybe try solo games or playing with random people?
        </Text>
        <TouchableOpacity style={{ marginVertical: "2%" }} onPress={leaveGame}>
          <Text style={{ color: "#543685", fontSize: 14 }}>Close room</Text>
        </TouchableOpacity>
      </View>
      <Llama />
      <Toast position="top" topOffset={30} />
    </View>
  );
}

export default MultiPlayerOwnerWaitingRoomScreen;
