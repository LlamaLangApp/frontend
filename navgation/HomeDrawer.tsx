import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import { FontAwesome } from "@expo/vector-icons";
import { pink } from "../Consts";
import WordSetStack from "./WordSetStack";
import ScoreboardScreen from "../screens/Scoreboard";
import { FontAwesome5 } from "@expo/vector-icons";
import UserStack from "./UserStack";
import FriendsStack from "./FriendsStack";
import HomeScreen from "../screens/Home";
import { UpdateHandlerProvider } from "../backend/UpdateHandler";
import GameInvitationIcon from "../components/GameInvitationIcon";

export type HomeDrawerParamList = {
  Games: undefined;
  Profile: undefined;
  Llama: undefined;
  Wordsets: undefined;
  Friends: undefined;
  Scoreboard: undefined;
};

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

const HomeDrawer = () => {
  return (
    <UpdateHandlerProvider>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        initialRouteName={"Games"}
        screenOptions={{
          headerTitle: "",
          headerTintColor: "#000",
          drawerActiveBackgroundColor: pink,
          drawerInactiveTintColor: "#333",
          drawerActiveTintColor: "#fff",
          drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
          headerRight: () => <GameInvitationIcon />,
        }}
      >
        <Drawer.Screen
          name="Profile"
          component={UserStack}
          options={{
            drawerIcon: ({ color }) => (
              <FontAwesome name="user" size={22} color={color} />
            ),
          }}
        />
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
          component={FriendsStack}
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
    </UpdateHandlerProvider>
  );
};

export default HomeDrawer;
