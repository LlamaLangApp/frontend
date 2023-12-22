import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { FriendsProvider } from "@screens/friends/Friends";
import FriendsListScreen from "@screens/friends/FriendsList";
import SearchUsersScreen from "@screens/friends/SearchUsers";
import InvitationsScreen from "@screens/friends/Invitations";

export type FriendsStackParamList = {
  List: undefined;
  Search: undefined;
  Invitations: undefined;
};

const Stack = createNativeStackNavigator<FriendsStackParamList>();

const FriendsStack = () => {
  return (
    <FriendsProvider navigation={useNavigation()}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"List"} component={FriendsListScreen} />
        <Stack.Screen name={"Search"} component={SearchUsersScreen} />
        <Stack.Screen name={"Invitations"} component={InvitationsScreen} />
      </Stack.Navigator>
    </FriendsProvider>
  );
};

export default FriendsStack;
