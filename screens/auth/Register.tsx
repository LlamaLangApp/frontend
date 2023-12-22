import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navgation/AuthStack";
import { registerHandler } from "../../backend/AuthBackend";
import { useAppStore } from "../../state";
import { useInput } from "../../hooks/useInput";
import Llama from "../../components/llama/Llama";
import CustomTextInput from "../../components/auth/CustomTextInput";
import { PinkButton } from "../../components/buttons/BasicButton";
import mainStyles from "../../styles/MainStyles";
import authStyles from "../../styles/AuthStyles";
import textStyles from "../../styles/TextStyles";
import containerStyles from "../../styles/ContainerStyles";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
  const setUserData = useAppStore((store) => store.setUserData);

  const usernameProps = useInput("");
  const emailProps = useInput("");
  const passwordProps = useInput("");
  const confirmPasswordProps = useInput("");

  const pressRegisterButton = React.useCallback(async () => {
    registerHandler(
      usernameProps.value,
      emailProps.value,
      passwordProps.value,
      confirmPasswordProps.value,
      setUserData
    );
  }, [
    setUserData,
    usernameProps.value,
    passwordProps.value,
    confirmPasswordProps.value,
    emailProps.value,
  ]);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={authStyles.contentContainer}>
        <View style={containerStyles.textWithMargin}>
          <Text style={textStyles.grey18Weight700}>Sign up to LlamaLang</Text>
        </View>
        <View style={authStyles.registerContainer}>
          <View style={authStyles.inputsContainer}>
            <CustomTextInput
              inputProps={usernameProps}
              textAbove={"Username"}
            />
            <CustomTextInput
              inputProps={emailProps}
              textAbove={"Email address"}
            />
            <CustomTextInput
              inputProps={passwordProps}
              textAbove={"Password"}
              secureTextEntry={true}
            />
            <CustomTextInput
              inputProps={confirmPasswordProps}
              textAbove={"Confirm password"}
              secureTextEntry={true}
            />
            <View style={authStyles.registerButtonContainer}>
              <PinkButton
                buttonText={"Sign up"}
                onPress={pressRegisterButton}
                height={"100%"}
                width={"100%"}
              />
            </View>
          </View>
        </View>
        <View style={authStyles.registerNoteContainer}>
          <Text style={textStyles.grey14Weight600}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={textStyles.linkedText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Llama />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

export default RegisterScreen;
