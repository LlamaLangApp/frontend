import {
  FlatList,
  Image,
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
import {
  buttonDarkPink,
  buttonLightPink,
  grey,
  lightGrey,
  pink,
} from "../../Consts";
import React, { useEffect, useState } from "react";

type Props = NativeStackScreenProps<FriendsStackParamList, "Search">;

function SearchUsersScreen({}: Props) {
  const { token, username } = useAppStore((store) => ({
    token: store.token,
    username: store.username,
  }));
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<FriendData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<FriendData[]>([]);

  useEffect(() => {
    getUsersData(token).then((response) => {
      if (response.type === "success") {
        const usersData = response.result.filter(
          (user) => user.username !== username
        );
        setUsers(usersData);
        setFilteredUsers(usersData);
      }
    });
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText]);

  return (
    <View style={mainStyles.container}>
      <View style={{ flex: 5, width: "100%", height: "100%" }}>
        <View
          style={{
            flex: 0.4,
            justifyContent: "flex-end",
            marginLeft: "6%",
            marginBottom: "1%",
          }}
        >
          <Text style={{ fontSize: 24, color: grey }}>Search users</Text>
        </View>
        <View
          style={{
            flex: 4.6,
            width: "90%",
            marginHorizontal: "5%",
            marginBottom: "10%",
            backgroundColor: lightGrey,
            borderWidth: 3,
            borderRadius: 15,
            borderColor: buttonDarkPink,
          }}
        >
          <View>
            <TextInput
              placeholder="search users..."
              style={{
                marginHorizontal: "2%",
                marginVertical: "2%",
                borderWidth: 2,
                borderColor: buttonDarkPink,
                borderRadius: 10,
                width: "96%",
                height: "6%",
                paddingVertical: 8,
                paddingHorizontal: 5,
                backgroundColor: "white",
                color: grey,
                fontSize: 18,
              }}
              // value={}
              onChangeText={setSearchText}
            />
            <FlatList
              style={{
                width: "96%",
                height: "90%",
                marginHorizontal: "2%",
                marginBottom: "2%",
                borderRadius: 10,
              }}
              showsVerticalScrollIndicator={false}
              data={filteredUsers}
              renderItem={(itemData) => {
                return (
                  <TouchableOpacity>
                    <View
                      style={{
                        marginVertical: "1%",
                        backgroundColor: pink,
                        borderColor: buttonLightPink,
                        borderWidth: 2,
                        borderRadius: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            borderWidth: 2,
                            borderColor: buttonDarkPink,
                            overflow: "hidden",
                            margin: 3,
                          }}
                        >
                          <Image
                            source={{ uri: itemData.item.avatar }}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </View>
                        <Text style={{ fontSize: 21, color: "white" }}>
                          {itemData.item.username}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default SearchUsersScreen;
