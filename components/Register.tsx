import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import authStyles from "../styles/AuthStyles";
import mainStyles from "../styles/MainStyles";
import { serverURL, callLogin } from "./backend";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  function usernameInputHandler(
    enteredText: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setEnteredUsername(enteredText.nativeEvent.text);
  }

  function emailInputHandler(
    enteredText: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setEnteredEmail(enteredText.nativeEvent.text);
  }

  function passwordInputHandler(
    enteredText: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setEnteredPassword(enteredText.nativeEvent.text);
  }

  function confirmPasswordInputHandler(
    enteredText: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setEnteredConfirmPassword(enteredText.nativeEvent.text);
  }

  async function registerHandler() {
    if (enteredPassword === enteredConfirmPassword) {
      console.log("Register handler");
      try {
        const response = await fetch(`http://${serverURL}/auth/users/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: enteredUsername,
            password: enteredPassword,
            email: enteredEmail,
          }),
        });
        console.log(await response.json());

        const { auth_token } = await callLogin(
          enteredUsername,
          enteredPassword
        );
        console.log(auth_token);

        navigation.navigate("Home");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Password doesn't match");
    }
  }

  return (
    <View style={mainStyles.container}>
      <View style={authStyles.contentContainer}>
        <View style={authStyles.headingContainer}>
          <Text style={authStyles.headingText}>Sign up to LlamaLang</Text>
        </View>
        <View style={authStyles.loginContainer}>
          <Text style={authStyles.plainText}>Username</Text>
          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.textInput}
              value={enteredUsername}
              onChange={usernameInputHandler}
            />
          </View>
          <Text style={authStyles.plainText}>Email address</Text>
          <View style={authStyles.inputContainer}>
            <TextInput
              // secureTextEntry={true}
              style={authStyles.textInput}
              value={enteredEmail}
              onChange={emailInputHandler}
            />
          </View>
          <Text style={authStyles.plainText}>Password</Text>
          <View style={authStyles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              style={authStyles.textInput}
              value={enteredPassword}
              onChange={passwordInputHandler}
            />
          </View>
          <Text style={authStyles.plainText}>Confirm password</Text>
          <View style={authStyles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              style={authStyles.textInput}
              value={enteredConfirmPassword}
              onChange={confirmPasswordInputHandler}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={authStyles.loginButton}
              onPress={registerHandler}
            >
              <Text style={authStyles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          {/*<Button title={"Sign in"} color="#cccccc" />*/}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text style={authStyles.plainText}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={authStyles.linkedText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
      <View style={authStyles.logoContainer}>
        <Image
          source={require("../assets/llama_without_background.png")}
          style={{
            width: 200,
            height: "100%",
          }}
        />
      </View>
    </View>
  );
}

export default RegisterScreen;
