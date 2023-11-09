import {
  Button,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import mainStyles from "../../styles/MainStyles";
import { FriendData, getUsersData } from "../../backend/FriendsBackend";
import { useAppStore } from "../../state";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import { grey } from "../../Consts";
import React, { useContext, useEffect, useState } from "react";
import friendsStyles from "../../styles/FriendsStyles";
import UserListItem from "../../components/UserListItem";
import { FriendsContext } from "./Friends";

type Props = NativeStackScreenProps<FriendsStackParamList, "Search">;

function SearchUsersScreen({}: Props) {
  const { token, username } = useAppStore((store) => ({
    token: store.token,
    username: store.username,
  }));
  const {
    friends,
    setFriends,
    filteredUsers,
    setFilteredUsers,
    users,
    setUsers,
  } = useContext(FriendsContext);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText]);

  return (
    <View style={mainStyles.container}>
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
              marginTop: "20%",
              width: "80%",
              height: "45%",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text>Modal Content Goes Here</Text>

            {/* Button to close the modal */}
            <Button title="Close Modal" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <View style={friendsStyles.mainContainer}>
        <View style={friendsStyles.titleContainer}>
          <Text style={{ fontSize: 24, color: grey }}>Search users</Text>
        </View>
        <View style={friendsStyles.searchContainer}>
          <TextInput
            placeholder="search users..."
            style={friendsStyles.textInput}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={openModal}>
            <Text>MARTYNAAAAAAAAAAA</Text>
          </TouchableOpacity>
          <FlatList
            style={friendsStyles.usersList}
            showsVerticalScrollIndicator={false}
            data={filteredUsers}
            renderItem={(item) => {
              return (
                <UserListItem
                  username={item.item.username}
                  avatar={item.item.avatar}
                  level={item.item.level}
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
