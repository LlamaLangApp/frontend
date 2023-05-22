import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import authStyles from "../styles/AuthStyles";
import { serverURL } from "./backend";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: Props) {
  async function logoutHandler() {
    try {
      const response = await fetch(`http://${serverURL}/auth/token/logout/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response + " " + JSON.stringify(await response.json()));
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={mainStyles.container}>
      <Text>You are logged</Text>
      <TouchableOpacity style={authStyles.loginButton} onPress={logoutHandler}>
        <Text style={authStyles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
