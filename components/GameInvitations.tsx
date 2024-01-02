import { Modal, TouchableOpacity, View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GamesStackParamList } from "@navigation/GamesStack";
import { UpdateHandlerContext } from "@backend/UpdateHandler";
import { LightGreyButton } from "./buttons/BasicButton";
import EmptyListText from "@components/EmptyListText";
import { grey } from "../Consts";
import gameInvitationsStyles from "@styles/GameInvitationsStyles";
import containerStyles from "@styles/ContainerStyles";
import textStyles from "@styles/TextStyles";

type GamesStack = NavigationProp<GamesStackParamList, "FindingWords">;
export type GameInvite = {
  username: string;
  wordSetId: number;
  game: string;
  waitRoom: number;
};

const GameInvitations = () => {
  const gamesNavigation = useNavigation<GamesStack>();
  const { onWaitRoomInvitation } = useContext(UpdateHandlerContext);

  const [invites, setInvites] = useState<GameInvite[] | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleWaitRoomInvitation = (invites: GameInvite[]) => {
    setInvites(invites);
    invites.forEach(({ username, game }) => {
      Toast.show({
        type: "error",
        text1: `${username} invites you to play in ${game}`,
        topOffset: 5,
        visibilityTime: 3000,
      });
    });
  };

  useEffect(() => {
    return onWaitRoomInvitation(handleWaitRoomInvitation);
  }, [handleWaitRoomInvitation]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={gameInvitationsStyles.invitationsIconContainer}>
        <TouchableOpacity onPress={openModal}>
          <FontAwesome5 name="envelope" size={22} color="black" />
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={containerStyles.modal}>
          <View style={gameInvitationsStyles.modalDisplay}>
            <View style={containerStyles.textWithMargin}>
              <Text style={textStyles.grey20Weight600}>
                INVITATIONS TO PLAY
              </Text>
            </View>
            <View style={gameInvitationsStyles.invitesListContainer}>
              <FlatList
                style={gameInvitationsStyles.invitesList}
                showsVerticalScrollIndicator={false}
                data={invites}
                ItemSeparatorComponent={() => {
                  return <View style={containerStyles.thinLine} />;
                }}
                ListEmptyComponent={() => {
                  return <EmptyListText texts={[`You have no invites`]} />;
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={gameInvitationsStyles.inviteContainer}
                      onPress={() => {
                        gamesNavigation.navigate(
                          "findingwords" === item.game
                            ? "FindingWords"
                            : "Race",
                          { fromInvite: true, invite: item }
                        );
                        closeModal();
                      }}
                    >
                      <Text style={textStyles.grey14Weight600}>
                        <Text style={textStyles.pink}>{item.username}</Text>
                        <Text> wants to play with you in </Text>
                        <Text style={textStyles.weight800}>
                          {item.game.toUpperCase()}
                        </Text>
                      </Text>
                      <FontAwesome
                        name={"chevron-right"}
                        size={12}
                        color={grey}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <LightGreyButton buttonText={"Close"} onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default GameInvitations;
