import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendsListScreen from "../screens/friends/Friends";
import SearchUsersScreen from "../screens/friends/SearchUsers";

export type FriendsStackParamList = {
  List: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<FriendsStackParamList>();

const FriendsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"List"} component={FriendsListScreen} />
      <Stack.Screen name={"Search"} component={SearchUsersScreen} />
    </Stack.Navigator>
  );
};

export default FriendsStack;
