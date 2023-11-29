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
  acceptFriendsInvite,
  cancelFriendsInvite,
  deleteFriend,
  FriendData,
  getFriendsData,
  getReceivedRequestsData,
  getSentRequestsData,
  getUsersData,
  rejectFriendsInvite,
  RequestData,
  sendFriendsInvite,
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
  handleInvite: (userId: number) => void;
  handleAcceptInvite: (userId: number) => void;
  handleRejectInvite: (userId: number) => void;
  handleCancelInvite: (userId: number) => void;
  handleDeleteFriend: (userId: number) => void;
  fetchAllFriendsData: () => Promise<any>;
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
  handleInvite: () => null,
  handleAcceptInvite: () => null,
  handleRejectInvite: () => null,
  handleCancelInvite: () => null,
  handleDeleteFriend: () => null,
  fetchAllFriendsData: async () => undefined,
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
  const [allUsers, setAllUsers] = useState<Users>([]);
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

  function setUserInAllUsers(user: User) {
    console.log(user);
    setAllUsers({ ...allUsers, [user.id]: user });
    console.log(allUsers);
  }

  const fetchAllFriendsData = async () => {
    await Promise.all([
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
  };

  useEffect(() => {
    fetchAllFriendsData().then();
  }, []);

  const handleInvite = (userId: number) => {
    sendFriendsInvite(allUsers[userId].id, id, token).then((response) => {
      console.log(response);
      if (response.type === "success") {
        setUserInAllUsers({
          ...allUsers[userId],
          sentInvite: response.result.id,
        });
      }
    });
  };

  const handleAcceptInvite = (userId: number) => {
    acceptFriendsInvite(allUsers[userId].receivedInvite, token).then(
      (response) => {
        console.log(response);
        if (response.type === "success") {
          setUserInAllUsers({
            ...allUsers[userId],
            receivedInvite: null,
            isFriend: response.result.friendship_id,
          });
        }
      }
    );
  };

  const handleRejectInvite = (userId: number) => {
    rejectFriendsInvite(allUsers[userId].receivedInvite, token).then(
      (response) => {
        console.log(response);
        if (response.type === "success") {
          setUserInAllUsers({
            ...allUsers[userId],
            receivedInvite: null,
          });
        }
      }
    );
  };

  const handleCancelInvite = (userId: number) => {
    cancelFriendsInvite(allUsers[userId].sentInvite, token).then((response) => {
      console.log(response);
      if (response.type === "success") {
        setUserInAllUsers({
          ...allUsers[userId],
          sentInvite: null,
        });
      }
    });
  };

  const handleDeleteFriend = (userId: number) => {
    deleteFriend(allUsers[userId].isFriend, token).then((response) => {
      console.log(response);
      if (response.type === "success") {
        setUserInAllUsers({
          ...allUsers[userId],
          isFriend: null,
        });
      }
    });
  };

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
        handleInvite,
        handleAcceptInvite,
        handleRejectInvite,
        handleCancelInvite,
        handleDeleteFriend,
        fetchAllFriendsData,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
export { FriendsContext, FriendsProvider };
