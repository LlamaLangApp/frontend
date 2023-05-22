import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import authStyles from "../styles/AuthStyles";
import mainStyles from "../styles/MainStyles";
import { callLogin } from "./backend";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

function LogScreen({ navigation }: Props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  function usernameInputHandler(
    enteredText: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setEnteredUsername(enteredText.nativeEvent.text);
  }

  function passwordInputHandler(
    enteredText: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setEnteredPassword(enteredText.nativeEvent.text);
  }

  async function loginHandler() {
    const { auth_token } = await callLogin(enteredUsername, enteredPassword);
    console.log(auth_token);
    navigation.navigate("Home");
    try {
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={mainStyles.container}>
      <View style={authStyles.contentContainer}>
        <View style={authStyles.headingContainer}>
          <Text style={authStyles.headingText}>Sign in to LlamaLang</Text>
        </View>
        <View style={authStyles.loginContainer}>
          <Text style={authStyles.plainText}>Username or email address</Text>
          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.textInput}
              value={enteredUsername}
              onChange={usernameInputHandler}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={authStyles.plainText}>Password</Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={authStyles.linkedText}>Forgot password?</Text>
            </Pressable>
          </View>
          <View style={authStyles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              style={authStyles.textInput}
              value={enteredPassword}
              onChange={passwordInputHandler}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={authStyles.loginButton}
              onPress={loginHandler}
            >
              <Text style={authStyles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={authStyles.loginContainer}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={authStyles.plainText}>New to LlamaLang? </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={authStyles.linkedText}>Create an account</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={authStyles.logoContainer}>
        <Image
          source={require("../assets/llama_without_background.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    </View>
  );
}

export default LogScreen;
