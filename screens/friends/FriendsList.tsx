import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FloatingAction } from "react-native-floating-action";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import useFilteredItems, { FilterFunction } from "../../hooks/useFilteredItems";
import { FriendsContext, User } from "./Friends";
import UserListItem from "../../components/friends/UserListItem";
import UserDisplayModal from "../../components/friends/UserDisplayModal";
import { buttonLightPink, friendsActions, grey, purple } from "../../Consts";
import mainStyles from "../../styles/MainStyles";
import friendsStyles from "../../styles/FriendsStyles";
import containerStyles from "../../styles/ContainerStyles";
import textStyles from "../../styles/TextStyles";

type Props = NativeStackScreenProps<FriendsStackParamList, "List">;

function FriendsListScreen({ navigation }: Props) {
  const { allUsers, fetchAllFriendsData } = useContext(FriendsContext);

  const filterFriends: FilterFunction<User> = (user: User, text: string) =>
    !!user.isFriend && user.username.toLowerCase().includes(text.toLowerCase());

  const filteredFriendsHook = useFilteredItems<User>({
    allItems: allUsers,
    filterFunction: filterFriends,
  });

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
    fetchAllFriendsData();
    setIsRefreshing(false);
  };

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
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
            style={friendsStyles.textInputFriends}
            onChangeText={filteredFriendsHook.changeFilteredItems}
          />
          <Text style={{ fontSize: 20, marginLeft: 5, color: grey }}>
            Your friends:
          </Text>
          {allUsers ? (
            <FlatList
              style={friendsStyles.usersList}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
              data={filteredFriendsHook.filteredItems}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ height: 1, backgroundColor: "#bababa" }} />
                );
              }}
              ListEmptyComponent={() => {
                return filteredFriendsHook.searchText ? (
                  <View style={containerStyles.emptyList}>
                    <Text style={textStyles.emptyList}>
                      No matching friends for "{filteredFriendsHook.searchText}"
                    </Text>
                  </View>
                ) : (
                  <View style={containerStyles.emptyList}>
                    <Text style={textStyles.emptyList}>
                      Your friend list is waiting to be filled!
                    </Text>
                    <Text style={textStyles.emptyList}>
                      Start connecting now.
                    </Text>
                  </View>
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
