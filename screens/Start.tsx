import { Image, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import authStyles from "../styles/AuthStyles";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navgation/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Start">;

function StartScreen({ navigation }: Props) {
  function signInHandler() {
    navigation.navigate("Login");
  }

  function signUpHandler() {
    navigation.navigate("Register");
  }

  return (
    <View style={mainStyles.container}>
      <View style={authStyles.appContainer}>
        <View style={authStyles.logoContainer}>
          <Image
            source={require("../assets/logo_without_background.png")}
            style={{ width: 325, height: 220 }}
          />
        </View>
        <View style={authStyles.startContainer}>
          <TouchableOpacity
            style={authStyles.startButton}
            onPress={signInHandler}
          >
            <Text style={authStyles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={authStyles.startButton}
            onPress={signUpHandler}
          >
            <Text style={authStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default StartScreen;
