import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import React, { useContext, useEffect, useState } from "react";
import { grey, lightGrey, pink } from "../../Consts";
import { FontAwesome } from "@expo/vector-icons";
import { getFriendsData } from "../../backend/FriendsBackend";
import { useAppStore } from "../../state";
import { RaceWebSocketContext } from "../race/RaceWebSocket";
import containerGamesStyles from "../../styles/games/ContainerGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import InviteFriendsModal from "../../components/games/InviteFriendsModal";
import Llama from "../../components/games/Llama";

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
  const { ws } = useContext(RaceWebSocketContext);

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
          <Text style={[textGamesStyles.information, { marginBottom: "50%" }]}>
            Decide with who you want to play
          </Text>
        </View>
        <TouchableOpacity
          style={[buttonGamesStyles.basic, { backgroundColor: lightGrey }]}
          onPress={openModal}
        >
          <Text style={[textGamesStyles.button, { color: grey }]}>
            Invite friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            buttonGamesStyles.basic,
            { backgroundColor: otherPlayersInRoom ? pink : grey },
          ]}
          activeOpacity={otherPlayersInRoom ? 0.2 : 1}
        >
          <Text
            style={[
              textGamesStyles.button,
              { color: otherPlayersInRoom ? "white" : lightGrey },
            ]}
          >
            Start game
          </Text>
          {!otherPlayersInRoom && (
            <FontAwesome name={"lock"} size={19} color={lightGrey} />
          )}
        </TouchableOpacity>
        <Text style={textGamesStyles.finePrint}>
          You need some friends to join to start the game
        </Text>
        <Text style={textGamesStyles.finePrint}>
          If you do not want to wait
        </Text>
        <Text style={textGamesStyles.finePrint}>
          Maybe try solo games or playing with random people?
        </Text>
        <TouchableOpacity style={{ marginVertical: "2%" }}>
          <Text style={{ color: "#543685", fontSize: 14 }}>Close room</Text>
        </TouchableOpacity>
      </View>
      <Llama />
    </View>
  );
}

export default MultiPlayerOwnerWaitingRoomScreen;
