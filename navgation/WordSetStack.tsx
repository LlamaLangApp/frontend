import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WordSetsListScreen from "../screens/WordSetsList";
import WordSetDisplayScreen from "../screens/WordSetDisplay";
import FlashCardsScreen from "../screens/FlashCards";
import { useNavigation } from "@react-navigation/native";
import { WordSetProvider } from "../screens/WordSets";

export type WordSetStackParamList = {
  List: undefined;
  Display: undefined;
  FlashCards: undefined;
};

const Stack = createNativeStackNavigator<WordSetStackParamList>();

const WordSetStack = () => {
  return (
    <WordSetProvider navigation={useNavigation()}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"List"} component={WordSetsListScreen} />
        <Stack.Screen name={"Display"} component={WordSetDisplayScreen} />
        <Stack.Screen name={"FlashCards"} component={FlashCardsScreen} />
      </Stack.Navigator>
    </WordSetProvider>
  );
};

export default WordSetStack;
