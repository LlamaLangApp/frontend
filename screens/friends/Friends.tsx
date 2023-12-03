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
  sendFriendsInvite,
} from "../../backend/FriendsBackend";
import { serverURL } from "../../backend/CommonBackend";

interface FriendsContextType {
  allUsers: Users;
  setAllUsers: Dispatch<SetStateAction<Users>>;
  filteredUsers: User[];
  setFilteredUsers: Dispatch<SetStateAction<User[]>>;
  filteredFriends: User[];
  setFilteredFriends: Dispatch<SetStateAction<User[]>>;
  handleInvite: (userId: number) => void;
  handleAcceptInvite: (userId: number) => void;
  handleRejectInvite: (userId: number) => void;
  handleCancelInvite: (userId: number) => void;
  handleDeleteFriend: (userId: number) => void;
  fetchAllFriendsData: () => void;
}

const FriendsContext = createContext<FriendsContextType>({
  allUsers: [],
  setAllUsers: () => {
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
  fetchAllFriendsData: () => {
    return;
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

const FriendsProvider = ({ children }: FriendsProviderProps) => {
  const { id, token } = useAppStore((store) => ({
    id: store.id,
    token: store.token,
    username: store.username,
  }));
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

  const fetchAllFriendsData = () => {
    Promise.all([
      getFriendsData(token),
      getUsersData(token),
      getReceivedRequestsData(token),
      getSentRequestsData(token),
    ]).then(
      ([friendsResponse, usersResponse, receivedResponse, sentResponse]) => {
        if (
          friendsResponse.type === "success" &&
          usersResponse.type === "success" &&
          receivedResponse.type === "success" &&
          sentResponse.type === "success"
        ) {
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
    fetchAllFriendsData();
  }, []);

  const handleInvite = (userId: number) => {
    sendFriendsInvite(allUsers[userId].id, id, token).then((response) => {
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
        allUsers,
        setAllUsers,
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
