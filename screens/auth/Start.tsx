import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@navigation/AuthStack";
import { setServerURL } from "@backend/CommonBackend";
import { LightGreyButton, PinkButton } from "@components/buttons/BasicButton";
import mainStyles from "@styles/MainStyles";
import authStyles from "@styles/AuthStyles";
import textStyles from "@styles/TextStyles";

type Props = NativeStackScreenProps<AuthStackParamList, "Start">;

function StartScreen({ navigation }: Props) {
  const [shouldShowDebugURL, setShouldShowDebugURL] = useState(false);

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={authStyles.startContainer}>
        <View style={authStyles.logoContainer}>
          <TouchableOpacity onPress={() => setShouldShowDebugURL((b) => !b)}>
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 325, height: 220 }}
            />
          </TouchableOpacity>
        </View>
        {shouldShowDebugURL ? (
          <>
            <Text style={textStyles.grey14Weight600}>
              Enter URL without https, but with port:
            </Text>
            <TextInput
              style={authStyles.urlInput}
              autoCapitalize="none"
              onEndEditing={(e) => setServerURL(e.nativeEvent.text)}
            />
          </>
        ) : null}
        <View style={{ width: "90%", height: "13%" }}>
          <PinkButton
            buttonText={"Sign in"}
            onPress={() => navigation.navigate("Login")}
            width={"100%"}
            height={"50%"}
          />
          <LightGreyButton
            buttonText={"Sign up"}
            onPress={() => navigation.navigate("Register")}
            width={"100%"}
            height={"50%"}
          />
        </View>
      </View>
    </View>
  );
}

export default StartScreen;
