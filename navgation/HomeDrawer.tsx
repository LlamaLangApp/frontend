import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home";
import CustomDrawer from "../components/CustomDrawer";
import { FontAwesome } from "@expo/vector-icons";
import FriendsScreen from "../screens/Friends";
import { pink } from "../Consts";
import WordSetStack from "./WordSetStack";
import ScoreboardScreen from "../screens/Scoreboard";
import { FontAwesome5 } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        // headerShown: false,
        headerTintColor: "#000",
        drawerActiveBackgroundColor: pink,
        drawerInactiveTintColor: "#333",
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="Games"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="gamepad" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Wordsets"
        component={WordSetStack}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="book" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="users" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Scoreboard"
        component={ScoreboardScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="medal" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
