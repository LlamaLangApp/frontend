import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import MemoryStack from "@games/memory/MemoryStack";
import RaceStack from "@games/race/RaceStack";
import FallingWordsStack from "@games/falling_words/FallingWordsStack";
import FindingWordsStack from "@games/finding_words/FindingWordsStack";
import HomeDrawer from "./HomeDrawer";
import { GameInvite } from "@components/GameInvitations";

export type GamesStackParamList = {
  Home: undefined;
  Memory: undefined;
  Race: {
    fromInvite: boolean;
    invite: GameInvite | null;
  };
  FallingWords: undefined;
  FindingWords: {
    fromInvite: boolean;
    invite: GameInvite | null;
  };
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        component={gestureHandlerRootHOC(FindingWordsStack)}
      />
    </Stack.Navigator>
  );
};

export default GamesStack;
