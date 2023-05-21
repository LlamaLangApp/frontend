import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useState } from "react";
import authStyles from "./AuthStyles";
import Constants from "expo-constants";

const { manifest } = Constants;
const serverURL = manifest?.debuggerHost?.split(`:`)?.shift()?.concat(`:8000`);

function RegisterScreen() {
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

  function registerHandler() {
    console.log(serverURL);
  }

  return (
    <View style={{ backgroundColor: "#e09cab" }}>
      <View
        style={{
          marginTop: "45%",
          // marginBottom: "60%",
          marginHorizontal: "12%",
        }}
      >
        <View style={authStyles.appContainer}>
          <View style={authStyles.headingContainer}>
            <Text style={authStyles.headingText}>Sign up to LlamaLang</Text>
          </View>
          <View style={{ flex: 5 }}>
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
                  secureTextEntry={true}
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
              <TouchableOpacity
                style={authStyles.loginButton}
                onPress={registerHandler}
              >
                <Text style={authStyles.buttonText}>Sign up</Text>
              </TouchableOpacity>
              {/*<Button title={"Sign in"} color="#cccccc" />*/}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default RegisterScreen;
