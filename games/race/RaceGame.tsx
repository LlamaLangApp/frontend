import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RaceStackParamList } from "./RaceStack";
import { Text, View } from "react-native";
import mainStyles from "../../styles/MainStyles";

type Props = NativeStackScreenProps<RaceStackParamList, "Game">;

function RaceGameScreen() {
  return (
    <View style={mainStyles.container}>
      <Text>Halo</Text>
    </View>
  );
}

export default RaceGameScreen;
