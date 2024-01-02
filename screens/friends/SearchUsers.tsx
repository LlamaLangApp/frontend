import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { FriendsStackParamList } from "@navigation/FriendsStack";
import useFilteredItems, { FilterFunction } from "@hooks/useFilteredItems";
import UserListItem from "@components/friends/UserListItem";
import { FriendsContext, User } from "./Friends";
import UserDisplayModal from "@components/friends/UserDisplayModal";
import EmptyListText from "@components/EmptyListText";
import { grey } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import friendsStyles from "@styles/FriendsStyles";
import containerStyles from "@styles/ContainerStyles";
import textStyles from "@styles/TextStyles";

type Props = NativeStackScreenProps<FriendsStackParamList, "Search">;

function SearchUsersScreen({ navigation }: Props) {
  const { allUsers, fetchAllFriendsData } = useContext(FriendsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [chosenUserId, setChosenUserId] = useState<number>(0);

  const filterUsers: FilterFunction<User> = (user: User, searchText: string) =>
    user.username.toLowerCase().includes(searchText.toLowerCase());

  const filteredUsersHook = useFilteredItems<User>({
    allItems: allUsers,
    filterFunction: filterUsers,
  });
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
          <View style={friendsStyles.titleContainer}>
            <TouchableOpacity
              style={friendsStyles.goBackButton}
              onPress={() => navigation.navigate("List")}
            >
              <FontAwesome name={"chevron-left"} size={12} color={grey} />
              <Text
                style={[textStyles.grey14Weight600, textStyles.marginLeft5]}
              >
                Friends
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="search users..."
              style={friendsStyles.textInputUsers}
              value={filteredUsersHook.searchText}
              onChangeText={filteredUsersHook.changeFilteredItems}
            />
          </View>
          <Text style={[textStyles.grey20Weight600, textStyles.marginLeft5]}>
            All users:
          </Text>
          <FlatList
            style={friendsStyles.usersList}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            data={filteredUsersHook.filteredItems}
            ItemSeparatorComponent={() => {
              return <View style={containerStyles.thinLine} />;
            }}
            ListEmptyComponent={() => {
              return filteredUsersHook.searchText ? (
                <EmptyListText
                  texts={[
                    `No matching users for "${filteredUsersHook.searchText}"`,
                  ]}
                />
              ) : (
                <EmptyListText
                  texts={[`Your are the first user on our server!`]}
                />
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
