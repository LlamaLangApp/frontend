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
import { loginHandler } from "../../backend/AuthBackend";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { AuthStackParamList } from "../../navgation/AuthStack";
import FrontLlamaCenter from "../../components/FrontLlamaCenter";
import { useAppStore } from "../../state";
import { useInput } from "../../hooks/useInput";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

function LogScreen({ navigation }: Props) {
  const setUserData = useAppStore((store) => store.setUserData);

  const usernameProps = useInput("");
  const passwordProps = useInput("");

  const pressLoginButton = React.useCallback(() => {
    loginHandler(usernameProps.value, passwordProps.value, setUserData);
  }, [setUserData, usernameProps.value, passwordProps.value]);

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
              value={usernameProps.value}
              onChange={usernameProps.onChange}
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
              value={passwordProps.value}
              onChange={passwordProps.onChange}
            />
          </View>
          <View>
            <TouchableOpacity
              style={authStyles.loginButton}
              onPress={pressLoginButton}
            >
              <Text style={authStyles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={authStyles.loginContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={authStyles.plainText}>New to LlamaLang? </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={authStyles.linkedText}>Create an account</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <FrontLlamaCenter />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default LogScreen;
