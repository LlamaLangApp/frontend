import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "@screens/user/Profile";
import StatisticsScreen from "@screens/Statistics";
import LlamaStoreScreen from "@screens/user/LlamaStore";

export type UserStackParamList = {
  User: undefined;
  Statistics: undefined;
  Llama: undefined;
};

const Stack = createNativeStackNavigator<UserStackParamList>();

const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"User"} component={ProfileScreen} />
      <Stack.Screen name={"Statistics"} component={StatisticsScreen} />
      <Stack.Screen name={"Llama"} component={LlamaStoreScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
