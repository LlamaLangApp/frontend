import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import authStyles from "../../styles/AuthStyles";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navgation/AuthStack";
import { setServerURL } from "../../backend/CommonBackend";

type Props = NativeStackScreenProps<AuthStackParamList, "Start">;

function StartScreen({ navigation }: Props) {
  async function signInHandler() {
    try {
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  }

  async function signUpHandler() {
    try {
      navigation.navigate("Register");
    } catch (error) {
      console.error(error);
    }
  }

  const [shouldShowDebugURL, setShouldShowDebugURL] = useState(false);

  return (
    <View style={mainStyles.container}>
      <View style={authStyles.appContainer}>
        <View style={authStyles.logoContainer}>
          <TouchableOpacity onPress={() => setShouldShowDebugURL((b) => !b)}>
            <Image
              source={require("../../assets/logo.png")}
              style={{
                width: 325,
                height: 220,
              }}
            />
          </TouchableOpacity>

          {shouldShowDebugURL ? (
            <TextInput onEndEditing={(e) => setServerURL(e.nativeEvent.text)} />
          ) : null}
        </View>
        <View style={authStyles.startContainer}>
          {shouldShowDebugURL ? (
            <>
              <Text>Enter URL without https, but with port:</Text>
              <TextInput
                style={{ height: 100, width: 300, backgroundColor: "white" }}
                autoCapitalize="none"
                onEndEditing={(e) => setServerURL(e.nativeEvent.text)}
              />
            </>
          ) : null}
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
