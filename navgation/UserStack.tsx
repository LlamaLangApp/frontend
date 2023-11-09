import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/user/Profile";
import StatisticsScreen from "../screens/user/Statistics";
import LlamaScreen from "../screens/user/Llama";

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
      <Stack.Screen name={"Llama"} component={LlamaScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
