import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../App";

type Props = NativeStackScreenProps<MemoryStackParamList, "Results">;
type MainStack = NavigationProp<MainStackParamList, "Home">;

function MemoryResultsScreen({ route, navigation }: Props) {
  const parentNavigation = useNavigation<MainStack>();
  const { points, setName } = route.params;

  async function exitGameHandler() {
    try {
      parentNavigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  }

  async function playAgainHandler() {
    try {
      navigation.navigate("Start");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentContainer}>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.headingText}>Memory</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.basicText}>You have earned:</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>{points}/60 pkt</Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.basicText}>
            {60 <= points
              ? "Yay! You learned set:"
              : "Unfortunately, you don't know all words from set:"}
          </Text>
        </View>
        <Text> </Text>
        <View style={gameStyles.headingContainer}>
          <Text style={gameStyles.secondaryText}>{setName}</Text>
        </View>
        <Text> </Text>
        <Text> </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={gameStyles.button} onPress={exitGameHandler}>
            <Text style={gameStyles.buttonText}>Exit game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={gameStyles.button}
            onPress={playAgainHandler}
          >
            <Text style={gameStyles.buttonText}>Play again</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FrontLlamaCenter />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default MemoryResultsScreen;
