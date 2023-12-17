import { Modal, TouchableOpacity, View, Text, FlatList } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { UpdateHandlerContext } from "../backend/UpdateHandler";
import { GamesStackParamList } from "../navgation/GamesStack";
import Toast from "react-native-toast-message";
import { grey, pink } from "../Consts";
import containerStyles from "../styles/ContainerStyles";
import textStyles from "../styles/TextStyles";
import { LightGreyButton } from "./buttons/BasicButton";

type GamesStack = NavigationProp<GamesStackParamList, "FindingWords">;
export type GameInvite = {
  username: string;
  wordSetId: number;
  game: string;
  waitRoom: number;
};

const GameInvitationIcon = () => {
  const gamesNavigation = useNavigation<GamesStack>();
  const { onWaitRoomInvitation } = useContext(UpdateHandlerContext);

  const [invites, setInvites] = useState<GameInvite[] | null>(null);

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleWaitRoomInvitation = (invites: GameInvite[]) => {
    setInvites(invites);
    // invites.forEach(({ username, wordSetId, game, waitRoom }) => {
    invites.forEach(({ username, game, waitRoom }) => {
      console.log(
        `${username} I am further Steve... game: ${game}, waitRoom: ${waitRoom}`
      );
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
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 15,
          zIndex: 3,
        }}
      >
        <TouchableOpacity onPress={openModal}>
          <FontAwesome5 name="envelope" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
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
              marginTop: "9%",
              marginBottom: "33%",
              width: "90%",
              height: "58%",
              backgroundColor: "white",
              padding: 30,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <View style={containerStyles.textWithMargin}>
              <Text style={textStyles.biggerBasicWeight600}>
                INVITATIONS TO PLAY
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 16,
                borderRadius: 8,
                width: "100%",
              }}
            >
              <FlatList
                style={{
                  width: "100%",
                  height: "80%",
                  marginBottom: "2%",
                  borderRadius: 10,
                }}
                showsVerticalScrollIndicator={false}
                data={invites ? [...invites, ...invites] : invites}
                ItemSeparatorComponent={() => {
                  return (
                    <View style={{ height: 1, backgroundColor: "#bababa" }} />
                  );
                }}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "10%",
                      }}
                    >
                      <Text style={{ color: "#bababa" }}>
                        You have no invites
                      </Text>
                    </View>
                  );
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "5%",
                        gap: 10,
                      }}
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
                      <Text style={textStyles.basicWeight600}>
                        <Text style={{ color: pink }}>{item.username}</Text>
                        <Text> wants to play with you in </Text>
                        <Text style={{ fontWeight: "800" }}>
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

export default GameInvitationIcon;
