import { Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordSetStackParamList } from "../navgation/WordSetStack";

type Props = NativeStackScreenProps<WordSetStackParamList, "List">;

function WordSetsListScreen({ navigation }: Props) {
  return (
    <View>
      <Text>WordSetsScreen</Text>
      <TouchableOpacity
        style={{
          alignItems: "center",
          width: "40%",
          borderRadius: 15,
        }}
        onPress={() => {
          navigation.navigate("Display");
        }}
      >
        <Text>WordSetsScreen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WordSetsListScreen;
