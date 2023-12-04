import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemoryStack from "../games/memory/MemoryStack";
import RaceStack from "../games/race/RaceStack";
import FallingWordsStack from "../games/falling_words/FallingWordsStack";
import HomeDrawer from "./HomeDrawer";
import FindingWordsStack from "../games/finding_words/FindingWordsStack";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export type GamesStackParamList = {
  Home: undefined;
  Memory: undefined;
  Race: undefined;
  FallingWords: undefined;
  FindingWords: undefined;
};

const Stack = createNativeStackNavigator<GamesStackParamList>();

const GamesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"Home"} component={HomeDrawer} />
      <Stack.Screen name={"Memory"} component={MemoryStack} />
      <Stack.Screen name={"Race"} component={RaceStack} />
      <Stack.Screen name={"FallingWords"} component={FallingWordsStack} />
      <Stack.Screen
        name={"FindingWords"}
        component={gestureHandlerRootHOC(FindingWordsStack)}
      />
    </Stack.Navigator>
  );
};

export default GamesStack;
