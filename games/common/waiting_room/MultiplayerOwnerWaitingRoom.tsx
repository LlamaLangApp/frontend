import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useAppStore } from "../../../state";
import { getFriendsData } from "@backend/FriendsBackend";
import InviteFriendsModal from "@components/games/InviteFriendsModal";
import Llama from "@components/llama/Llama";
import BlockedButton from "@components/buttons/BlockedButton";
import PlayersInWaitRoomList from "../components/PlayerListInWaitRoom";
import FinePrints from "../components/FinePrints";
import { grey, lightGrey } from "../../../Consts";
import mainStyles from "@styles/MainStyles";
import containerGamesStyles from "@styles/games/ContainerGamesStyles";
import buttonGamesStyles from "@styles/games/ButtonGamesStyles";
import textStyles from "@styles/TextStyles";

type MultiPlayerWaitingRoomProps = {
  gameName: string;
  ws: WebSocket | undefined;
  leaveGame: () => void;
  usersInWaitRoom: string[];
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

  const { gameName, ws, leaveGame, usersInWaitRoom } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const otherPlayersInRoom = () => {
    return usersInWaitRoom.length >= 2;
  };

  async function startGameHandler() {
    ws?.send(JSON.stringify({ type: "start_game" }));
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
        ws?.send(
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
          <Text style={textStyles.grey27Weight800}>
            {gameName.toUpperCase()}
          </Text>
        </View>
        <View style={containerGamesStyles.textWithMargin}>
          <Text style={textStyles.grey18}>You are the owner of this room</Text>
          <Text style={textStyles.grey18}>
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
          <PlayersInWaitRoomList
            players={usersInWaitRoom}
            hostName={"alpaka"}
          />
        </View>
        <TouchableOpacity
          style={[buttonGamesStyles.basic, { backgroundColor: lightGrey }]}
          onPress={openModal}
        >
          <Text style={[textStyles.button, { color: grey }]}>
            Invite friends
          </Text>
        </TouchableOpacity>
        <BlockedButton
          buttonText={"Start game"}
          condition={otherPlayersInRoom()}
          onPress={startGameHandler}
        />
        <FinePrints
          prints={[
            "You need some friends to join to start the game",
            "If you do not want to wait",
            "Maybe try solo games or playing with random people?,",
          ]}
        />
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
