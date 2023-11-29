import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppStore } from "../../state";
import { NavigationProp } from "@react-navigation/native";
import { FriendsStackParamList } from "../../navgation/FriendsStack";
import {
  FriendData,
  getFriendsData,
  getReceivedRequestsData,
  getSentRequestsData,
  getUsersData,
  RequestData,
} from "../../backend/FriendsBackend";
import { serverURL } from "../../backend/CommonBackend";

interface FriendsContextType {
  users: FriendData[];
  setUsers: Dispatch<SetStateAction<FriendData[]>>;
  allUsers: Users;
  setAllUsers: Dispatch<SetStateAction<Users>>;
  setUserInAllUsers: (user: User) => void;
  friends: FriendData[];
  setFriends: Dispatch<SetStateAction<FriendData[]>>;
  filteredUsers: User[];
  setFilteredUsers: Dispatch<SetStateAction<User[]>>;
  filteredFriends: User[];
  setFilteredFriends: Dispatch<SetStateAction<User[]>>;
}

const FriendsContext = createContext<FriendsContextType>({
  users: [],
  setUsers: () => {
    return [];
  },
  allUsers: [],
  setAllUsers: () => {
    return [];
  },
  setUserInAllUsers: () => {
    return;
  },
  friends: [],
  setFriends: () => {
    return [];
  },
  filteredUsers: [],
  setFilteredUsers: () => {
    return [];
  },
  filteredFriends: [],
  setFilteredFriends: () => {
    return [];
  },
});

type FriendsProviderProps = {
  children: ReactNode;
  navigation: NavigationProp<FriendsStackParamList>;
};

export type User = {
  id: number;
  username: string;
  avatar: string;
  level: number;
  isFriend: null | number;
  sentInvite: null | number;
  receivedInvite: null | number;
};
export type Users = {
  [id: number]: User;
};

const FriendsProvider = ({ children, navigation }: FriendsProviderProps) => {
  const { id, token, username } = useAppStore((store) => ({
    id: store.id,
    token: store.token,
    username: store.username,
  }));
  const [friends, setFriends] = useState<FriendData[]>([]);
  const [users, setUsers] = useState<FriendData[]>([]);
  const [receivedInvitations, setReceivedInvitations] = useState<RequestData[]>(
    []
  );
  const [allUsers, setAllUsers] = useState<Users>([]);
  const [sentInvitations, setSentInvitations] = useState<RequestData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<User[]>([]);

  function createModifiedUser(
    item: FriendData,
    avatar: string,
    isFriend: null | number,
    sentInvite: null | number,
    receivedInvite: null | number
  ): User {
    return {
      id: item.id,
      username: item.username,
      avatar: avatar,
      level: item.level,
      isFriend: isFriend,
      sentInvite: sentInvite,
      receivedInvite: receivedInvite,
    };
  }
  console.log(username);
  console.log(friends);

  function setUserInAllUsers(user: User) {
    console.log(user);
    setAllUsers({ ...allUsers, [user.id]: user });
  }

  useEffect(() => {
    Promise.all([
      getFriendsData(token),
      getUsersData(token),
      getReceivedRequestsData(id, token),
      getSentRequestsData(id, token),
    ]).then(
      ([friendsResponse, usersResponse, receivedResponse, sentResponse]) => {
        console.log(friendsResponse);
        if (
          friendsResponse.type === "success" &&
          usersResponse.type === "success" &&
          receivedResponse.type === "success" &&
          sentResponse.type === "success"
        ) {
          console.log(
            friendsResponse.result
              .map(
                (item) => `friends :: http://${serverURL}${item.friend.avatar}`
              )
              .join("\n")
          );
          const friendList: Users = Object.fromEntries(
            friendsResponse.result.map((item) => [
              item.friend.id,
              createModifiedUser(
                item.friend,
                `http://${serverURL}${item.friend.avatar}`,
                item.friendship_id,
                null,
                null
              ),
            ])
          );
          console.log(
            usersResponse.result
              .map((item) => `users: ${item.avatar}`)
              .join("\n")
          );
          const otherUsers = Object.fromEntries(
            usersResponse.result
              .filter(
                (userItem) => !(userItem.id in friendList) && userItem.id !== id
              )
              .map((item) => {
                const sentInvite = sentResponse.result.find(
                  (sentItem) => sentItem.receiver === item.id
                );
                const receivedInvite = receivedResponse.result.find(
                  (receivedItem) => receivedItem.sender === item.id
                );
                return [
                  item.id,
                  createModifiedUser(
                    item,
                    item.avatar,
                    null,
                    sentInvite !== undefined ? sentInvite.id : null,
                    receivedInvite !== undefined ? receivedInvite.id : null
                  ),
                ];
              })
          );
          console.log({ ...friendList, ...otherUsers });
          setAllUsers({ ...friendList, ...otherUsers });
          setFilteredUsers([
            ...Object.values(friendList),
            ...Object.values(otherUsers),
          ]);
          setFilteredFriends([...Object.values(friendList)]);
        }
      }
    );
  }, []);

  return (
    <FriendsContext.Provider
      value={{
        users,
        setUsers,
        allUsers,
        setAllUsers,
        setUserInAllUsers,
        friends,
        setFriends,
        filteredUsers,
        setFilteredUsers,
        filteredFriends,
        setFilteredFriends,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
export { FriendsContext, FriendsProvider };
