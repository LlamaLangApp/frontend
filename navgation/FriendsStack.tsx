import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsListScreen from "../screens/friends/FriendsList";
import SearchUsersScreen from "../screens/friends/SearchUsers";
import { FriendsProvider } from "../screens/friends/Friends";
import { useNavigation } from "@react-navigation/native";

export type FriendsStackParamList = {
  List: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<FriendsStackParamList>();

const FriendsStack = () => {
  return (
    <FriendsProvider navigation={useNavigation()}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"List"} component={FriendsListScreen} />
        <Stack.Screen name={"Search"} component={SearchUsersScreen} />
      </Stack.Navigator>
    </FriendsProvider>
  );
};

export default FriendsStack;
