import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import gameStyles from "../../styles/GamesStyles";
import React, { useState } from "react";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MemoryStackParamList } from "./MemoryStack";
import ProgressBar from "react-native-progress/Bar";
import { buttonDarkPink, buttonLightPink } from "../../Consts";
import authStyles from "../../styles/AuthStyles";

type Props = NativeStackScreenProps<MemoryStackParamList, "Game">;
const itemData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function MemoryGameScreen({ navigation }: Props) {
  const screenWidth = Dimensions.get("window").width;
  const [progress, setProgress] = useState(0);
  const [attempt, setAttempt] = useState(15);
  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 1 / 15);
    setAttempt((prevAttempt) => prevAttempt - 1);
  };
  console.log(progress);
  return (
    <View style={mainStyles.container}>
      <View style={gameStyles.contentContainer}>
        <View style={{ flex: 1.3, marginTop: 30 }}>
          <View style={gameStyles.headingAndPointsContainer}>
            <Text style={gameStyles.headingText}>Memory</Text>
            <Text style={gameStyles.secondaryText}>0 pkt</Text>
          </View>
          <View style={gameStyles.headingContainer}>
            <Text style={gameStyles.basicText}>
              Match the words with their translations
            </Text>
          </View>
          <Text> </Text>
          <View style={gameStyles.headingAndPointsContainer}>
            <Text style={gameStyles.basicText}>Attempts left:</Text>
            <Text style={gameStyles.secondaryText}>{attempt}/15</Text>
          </View>
          <ProgressBar
            progress={progress}
            width={screenWidth * 0.8}
            height={40}
            color={buttonLightPink}
            unfilledColor={"#ffffff"}
            borderWidth={1}
            borderRadius={15}
            borderColor={buttonDarkPink}
            animationType="timing"
          />
        </View>
        <View style={{ flex: 3.7 }}>
          <View style={gameStyles.cardsContainer}>
            {itemData.map((item) => {
              return (
                <View style={gameStyles.card}>
                  {/*<Text>hrllo</Text>*/}
                  <View style={authStyles.llamaContainer}>
                    <Image
                      source={require("../../assets/llama_without_background.png")}
                      style={{
                        width: 90,
                        height: 90,
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/*<View style={{ flexDirection: "row" }}>*/}
        {/*  <TouchableOpacity*/}
        {/*    style={gameStyles.startButton}*/}
        {/*    onPress={handlePress}*/}
        {/*  >*/}
        {/*    <Text style={gameStyles.buttonText}>Play</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
      </View>
    </View>
  );
}

export default MemoryGameScreen;
