import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import { grey } from "../../Consts";
import React, { useContext, useEffect, useState } from "react";
import friendsStyles from "../../styles/FriendsStyles";
import UserListItem from "../../components/friends/UserListItem";
import { FriendsContext } from "./Friends";
import UserDisplayModal from "../../components/friends/UserDisplayModal";
import { FontAwesome } from "@expo/vector-icons";
import mainStyles from "../../styles/MainStyles";

type Props = NativeStackScreenProps<FriendsStackParamList, "Search">;

function SearchUsersScreen({ navigation }: Props) {
  const { allUsers, filteredUsers, setFilteredUsers, fetchAllFriendsData } =
    useContext(FriendsContext);
  const [searchText, setSearchText] = useState("");
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
    changeFilteredUsers(searchText);
    setIsRefreshing(false);
  };

  const changeFilteredUsers = (searchText: string) => {
    const filtered = Object.values(allUsers).filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => changeFilteredUsers(searchText), [searchText]);

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
          <View style={friendsStyles.titleContainer}>
            <TouchableOpacity
              style={friendsStyles.goBackButton}
              onPress={() => navigation.navigate("List")}
            >
              <FontAwesome name={"chevron-left"} size={12} color={grey} />
              <Text style={{ fontSize: 15, marginLeft: 5, color: grey }}>
                Friends
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="search users..."
              style={friendsStyles.textInputUsers}
              onChangeText={setSearchText}
            />
          </View>
          <Text style={{ fontSize: 20, marginLeft: 5, color: grey }}>
            All users:
          </Text>
          <FlatList
            style={friendsStyles.usersList}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            data={filteredUsers}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: "#bababa" }} />;
            }}
            ListEmptyComponent={() => {
              return searchText ? (
                <View style={friendsStyles.emptyListContainer}>
                  <Text style={{ color: "#bababa" }}>
                    No matching friends for "{searchText}"
                  </Text>
                </View>
              ) : (
                <View style={friendsStyles.emptyListContainer}>
                  <Text style={{ color: "#bababa" }}>
                    Your are the first user on our server!
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
                  onPress={openModal}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default SearchUsersScreen;
