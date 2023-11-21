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

interface FriendsContextType {
  users: FriendData[];
  setUsers: Dispatch<SetStateAction<FriendData[]>>;
  allUsers: User[];
  setAllUsers: Dispatch<SetStateAction<User[]>>;
  friends: FriendData[];
  setFriends: Dispatch<SetStateAction<FriendData[]>>;
  filteredUsers: User[];
  setFilteredUsers: Dispatch<SetStateAction<User[]>>;
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
  friends: [],
  setFriends: () => {
    return [];
  },
  filteredUsers: [],
  setFilteredUsers: () => {
    return [];
  },
});

type FriendsProviderProps = {
  children: ReactNode;
  navigation: NavigationProp<FriendsStackParamList>;
};

type User = {
  id: number;
  username: string;
  avatar: string;
  level: number;
  isFriend: boolean;
  sentInvite: boolean;
  receivedInvite: boolean;
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
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [sentInvitations, setSentInvitations] = useState<RequestData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  function createModifiedUser(
    item: FriendData,
    isFriend: boolean,
    sentInvite: boolean,
    receivedInvite: boolean
  ): User {
    return { ...item, isFriend, sentInvite, receivedInvite };
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
          const friendList = friendsResponse.result.map((item) =>
            createModifiedUser(item, true, false, false)
          );
          const otherUsers = usersResponse.result
            .filter(
              (userItem) => !friendList.some((item) => userItem.id === item.id)
            )
            .map((item) =>
              createModifiedUser(
                item,
                false,
                sentResponse.result.some(
                  (sentItem) => sentItem.receiver === item.id
                ),
                receivedResponse.result.some(
                  (receivedItem) => receivedItem.sender === item.id
                )
              )
            );
          setAllUsers([...friendList, ...otherUsers]);
          setFilteredUsers([...friendList, ...otherUsers]);
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
        friends,
        setFriends,
        filteredUsers,
        setFilteredUsers,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
export { FriendsContext, FriendsProvider };
