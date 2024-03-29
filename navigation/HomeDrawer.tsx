import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import WordSetStack from "./WordSetStack";
import UserStack from "./UserStack";
import FriendsStack from "./FriendsStack";
import HomeScreen from "@screens/Home";
import ScoreboardScreen from "@screens/Scoreboard";
import StatisticsScreen from "@screens/Statistics";
import { UpdateHandlerProvider } from "@backend/UpdateHandler";
import GameInvitations from "@components/GameInvitations";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { pink } from "../Consts";

export type HomeDrawerParamList = {
  Games: undefined;
  Profile: undefined;
  Llama: undefined;
  Wordsets: undefined;
  Friends: undefined;
  Scoreboard: undefined;
  Statistics: undefined;
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
          headerRight: () => <GameInvitations />,
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
          name="Statistics"
          component={StatisticsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <FontAwesome5 name="chart-area" size={24} color={color} />
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
