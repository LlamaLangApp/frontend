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
import { callLogin, callRegister } from "../backend";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Toast from "react-native-toast-message";
import { useAppStore } from "../state";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const setToken = useAppStore((store) => store.setToken);

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

  const registerHandler = React.useCallback(async () => {
    if (enteredPassword === enteredConfirmPassword) {
      const response = await callRegister(
        enteredUsername,
        enteredPassword,
        enteredEmail
      );
      switch (response.type) {
        case "success":
          const loginResponse = await callLogin(
            enteredUsername,
            enteredPassword
          );
          switch (loginResponse.type) {
            case "success":
              setToken(loginResponse.authToken);
              break;
            case "error":
              Toast.show({
                type: "error",
                text1: loginResponse.message,
              });
              break;
          }
          break;
        case "error":
          Toast.show({
            type: "error",
            text1: response.message,
          });
          break;
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Provided passwords are not the same",
      });
    }
  }, [
    setToken,
    enteredUsername,
    enteredPassword,
    enteredConfirmPassword,
    enteredEmail,
  ]);

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
      <View style={authStyles.llamaContainer}>
        <Image
          source={require("../assets/llama_without_background.png")}
          style={{
            width: 200,
            height: "100%",
          }}
        />
      </View>
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default RegisterScreen;
