import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import mainStyles from "../../styles/MainStyles";
import { FriendData, getFriendsData } from "../../backend/FriendsBackend";
import { useAppStore } from "../../state";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import React, { useContext, useEffect, useState } from "react";
import { FriendsContext, User } from "./Friends";
import friendsStyles from "../../styles/FriendsStyles";
import { FontAwesome } from "@expo/vector-icons";
import {
  buttonLightPink,
  defaultBackgroundColor,
  grey,
  lightGrey,
  pink,
  purple,
} from "../../Consts";
import UserListItem from "../../components/UserListItem";
import { FloatingAction } from "react-native-floating-action";

type Props = NativeStackScreenProps<FriendsStackParamList, "List">;

function FriendsListScreen({ navigation }: Props) {
  const { token } = useAppStore((store) => ({
    token: store.token,
  }));
  const {
    allUsers,
    friends,
    setFriends,
    filteredUsers,
    setFilteredUsers,
    users,
    setUsers,
    setFilteredFriends,
    filteredFriends,
  } = useContext(FriendsContext);
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
  const actions = [
    {
      text: "Search for more users",
      icon: require("../../assets/1f50d.png"), // Replace with your icon
      name: "Search",
      position: 1,
      buttonSize: 50,
      textStyle: { fontSize: 16 },
      color: defaultBackgroundColor,
      margin: 5,
    },
    {
      text: "Check your invitations",
      icon: require("../../assets/medal-2.png"), // Replace with your icon
      name: "Invitations",
      position: 2,
      buttonSize: 50,
      textStyle: { fontSize: 16 },
      color: buttonLightPink,
      margin: 5,
    },
    // Add more options as needed
  ];
  const handlePress = (name: "List" | "Invitations") => {
    navigation.navigate(name);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fffcff",
        alignItems: "center",
      }}
    >
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
                    onPress={() => {}}
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
        actions={actions}
        onPressItem={(name) => handlePress(name)}
        color={pink}
        buttonSize={65}
      />
    </View>
  );
}

export default FriendsListScreen;
