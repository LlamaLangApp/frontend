import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import React, { useContext, useEffect, useState } from "react";
import { FriendsContext } from "./Friends";
import friendsStyles from "../../styles/FriendsStyles";
import { buttonLightPink, friendsActions, grey, purple } from "../../Consts";
import UserListItem from "../../components/friends/UserListItem";
import { FloatingAction } from "react-native-floating-action";
import UserDisplayModal from "../../components/friends/UserDisplayModal";

type Props = NativeStackScreenProps<FriendsStackParamList, "List">;

function FriendsListScreen({ navigation }: Props) {
  const { allUsers, setFilteredFriends, fetchAllFriendsData, filteredFriends } =
    useContext(FriendsContext);
  const [searchText, setSearchText] = useState("");

  useEffect(
    () =>
      setFilteredFriends(
        Object.values(allUsers).filter((user) => user.isFriend)
      ),
    []
  );
  useEffect(() => {
    const filtered = Object.values(allUsers).filter(
      (user) =>
        user.isFriend &&
        user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFriends(filtered);
  }, [searchText]);

  const handlePress = (name: string | undefined) => {
    if (name === "Invitations" || name === "Search") {
      navigation.navigate(name);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [chosenUserId, setChosenUserId] = useState<number>(0);

  const openModal = (id: number) => {
    setChosenUserId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchAllFriendsData().then(() => setIsRefreshing(false));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fffcff",
        alignItems: "center",
      }}
    >
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        transparent={true}
      >
        <UserDisplayModal userId={chosenUserId} closeModal={closeModal} />
      </Modal>
      <View style={friendsStyles.mainContainer}>
        <View style={friendsStyles.searchContainer}>
          <TextInput
            placeholder="search friends..."
            style={friendsStyles.textInput2}
            onChangeText={setSearchText}
          />
          <Text style={{ fontSize: 20, marginLeft: 5, color: grey }}>
            Your friends:
          </Text>
          {allUsers ? (
            <FlatList
              style={{
                width: "96%",
                height: "90%",
                marginHorizontal: "2%",
                marginBottom: "2%",
                borderRadius: 10,
              }}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
              data={filteredFriends}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ height: 1, backgroundColor: "#bababa" }} />
                );
              }}
              renderItem={(item) => {
                return (
                  <UserListItem
                    id={item.item.id}
                    username={item.item.username}
                    avatar={item.item.avatar}
                    level={item.item.level}
                    onPress={() => openModal(item.item.id)}
                  />
                );
              }}
            />
          ) : (
            <ActivityIndicator size={"large"} color={purple} />
          )}
        </View>
      </View>
      <FloatingAction
        actions={friendsActions}
        onPressItem={(name) => handlePress(name)}
        color={buttonLightPink}
        buttonSize={65}
      />
    </View>
  );
}

export default FriendsListScreen;
