import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import authStyles from "../../styles/AuthStyles";
import mainStyles from "../../styles/MainStyles";
import { callRegister, loginHandler } from "../../backend/AuthBackend";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navgation/AuthStack";
import Toast from "react-native-toast-message";
import { useAppStore } from "../../state";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const setUserData = useAppStore((store) => store.setUserData);

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

  const pressRegisterButton = React.useCallback(async () => {
    if (enteredPassword === enteredConfirmPassword) {
      callRegister(enteredUsername, enteredPassword, enteredEmail).then(
        (response) => {
          if (response.type === "success") {
            loginHandler(enteredUsername, enteredPassword, setUserData);
          } else {
            Toast.show({
              type: "error",
              text1: response.message,
            });
          }
        }
      );
    } else {
      Toast.show({
        type: "error",
        text1: "Provided passwords are not the same",
      });
    }
  }, [
    setUserData,
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
          <View>
            <TouchableOpacity
              style={authStyles.loginButton}
              onPress={pressRegisterButton}
            >
              <Text style={authStyles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={authStyles.plainText}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={authStyles.linkedText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
      <FrontLlamaCenter />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default RegisterScreen;
