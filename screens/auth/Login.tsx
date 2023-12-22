import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@navigation/AuthStack";
import { loginHandler } from "@backend/AuthBackend";
import { useAppStore } from "../../state";
import { useInput } from "@hooks/useInput";
import Llama from "@components/llama/Llama";
import CustomTextInput from "@components/auth/CustomTextInput";
import { PinkButton } from "@components/buttons/BasicButton";
import mainStyles from "@styles/MainStyles";
import authStyles from "@styles/AuthStyles";
import textStyles from "@styles/TextStyles";
import containerStyles from "@styles/ContainerStyles";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

function LogScreen({ navigation }: Props) {
  const setUserData = useAppStore((store) => store.setUserData);

  const usernameProps = useInput("");
  const passwordProps = useInput("");

  const pressLoginButton = React.useCallback(() => {
    loginHandler(usernameProps.value, passwordProps.value, setUserData);
  }, [usernameProps.value, passwordProps.value, setUserData]);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={authStyles.contentContainer}>
        <View style={containerStyles.textWithMargin}>
          <Text style={textStyles.grey18Weight700}>Sign in to LlamaLang</Text>
        </View>
        <View style={authStyles.loginContainer}>
          <View style={authStyles.inputsContainer}>
            <CustomTextInput
              inputProps={usernameProps}
              textAbove={"Username or email address"}
            />
            <CustomTextInput
              inputProps={passwordProps}
              textAbove={"Password"}
              secureTextEntry={true}
              rightReference={"Forgot password?"}
              referenceOnPress={() => navigation.navigate("Register")}
            />
            <View style={authStyles.loginButtonContainer}>
              <PinkButton
                buttonText={"Sign in"}
                onPress={pressLoginButton}
                height={"100%"}
                width={"100%"}
              />
            </View>
          </View>
        </View>
        <View style={authStyles.noteContainer}>
          <Text style={textStyles.grey14Weight600}>New to LlamaLang? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={textStyles.linkedText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Llama />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default LogScreen;
