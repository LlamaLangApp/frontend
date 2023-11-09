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
  friends: FriendData[];
  setFriends: Dispatch<SetStateAction<FriendData[]>>;
  filteredUsers: FriendData[];
  setFilteredUsers: Dispatch<SetStateAction<FriendData[]>>;
}

const FriendsContext = createContext<FriendsContextType>({
  users: [],
  setUsers: () => {
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
  const [sentInvitations, setSentInvitations] = useState<RequestData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<FriendData[]>([]);

  useEffect(() => {
    Promise.all([
      getFriendsData(token).then((response) => {
        if (response.type === "success") {
          setFriends(response.result);
        }
      }),
      getUsersData(token).then((response) => {
        if (response.type === "success") {
          const usersData = response.result.filter(
            (user) => user.username !== username
          );
          setUsers(usersData);
          setFilteredUsers(usersData);
        }
      }),
      getReceivedRequestsData(id, token).then((response) => {
        if (response.type === "success") {
          setReceivedInvitations(response.result);
        }
      }),
      getSentRequestsData(id, token).then((response) => {
        if (response.type === "success") {
          setSentInvitations(response.result);
        }
      }),
    ]).then();
  }, []);

  return (
    <FriendsContext.Provider
      value={{
        users,
        setUsers,
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
