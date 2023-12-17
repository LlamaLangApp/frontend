import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WordSetsListScreen from "../screens/wordsets/WordSetsList";
import WordSetDisplayScreen from "../screens/wordsets/WordSetDisplay";
import { useNavigation } from "@react-navigation/native";
import { WordSetProvider } from "../screens/wordsets/WordSets";
import FlashCardScreen from "../screens/wordsets/FlashCard";

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
        <Stack.Screen name={"FlashCards"} component={FlashCardScreen} />
      </Stack.Navigator>
    </WordSetProvider>
  );
};

export default WordSetStack;
