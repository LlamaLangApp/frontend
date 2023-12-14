import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import React from "react";
import authStyles from "../../styles/AuthStyles";
import mainStyles from "../../styles/MainStyles";
import { callRegister, loginHandler } from "../../backend/AuthBackend";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navgation/AuthStack";
import Toast from "react-native-toast-message";
import { useAppStore } from "../../state";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { useInput } from "../../hooks/useInput";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
  const setUserData = useAppStore((store) => store.setUserData);

  const usernameProps = useInput("");
  const emailProps = useInput("");
  const passwordProps = useInput("");
  const confirmPasswordProps = useInput("");

  const pressRegisterButton = React.useCallback(async () => {
    if (passwordProps.value === confirmPasswordProps.value) {
      console.log("Registring");
      callRegister(
        usernameProps.value,
        passwordProps.value,
        emailProps.value
      ).then((response) => {
        if (response.type === "success") {
          loginHandler(usernameProps.value, passwordProps.value, setUserData);
        } else {
          Toast.show({
            type: "error",
            text1: response.message,
          });
        }
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Provided passwords are not the same",
      });
    }
  }, [
    setUserData,
    usernameProps.value,
    passwordProps.value,
    confirmPasswordProps.value,
    emailProps.value,
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
              value={usernameProps.value}
              onChange={usernameProps.onChange}
            />
          </View>
          <Text style={authStyles.plainText}>Email address</Text>
          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.textInput}
              value={emailProps.value}
              onChange={emailProps.onChange}
            />
          </View>
          <Text style={authStyles.plainText}>Password</Text>
          <View style={authStyles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              style={authStyles.textInput}
              value={passwordProps.value}
              onChange={passwordProps.onChange}
            />
          </View>
          <Text style={authStyles.plainText}>Confirm password</Text>
          <View style={authStyles.inputContainer}>
            <TextInput
              secureTextEntry={true}
              style={authStyles.textInput}
              value={confirmPasswordProps.value}
              onChange={confirmPasswordProps.onChange}
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
