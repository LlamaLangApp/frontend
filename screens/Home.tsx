import { Image, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../styles/MainStyles";
import homeStyles from "../styles/HomeStyles";
import { serverURL } from "../components/backend";
import React from "react";
// import { RootStackParamList } from "../App";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppStore } from "../state";

// type Props = NativeStackScreenProps<RootStackParamList, "Home">;
// function HomeScreen({ navigation }: Props) {
function HomeScreen() {
  const setToken = useAppStore((store) => store.setToken);
  async function logoutHandler() {
    try {
      const response = await fetch(`http://${serverURL}/auth/token/logout/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response + " " + JSON.stringify(await response.json()));
      setToken(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={mainStyles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text>You are logged</Text>
        <TouchableOpacity
          style={homeStyles.loginButton}
          onPress={logoutHandler}
        >
          <Text style={homeStyles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={homeStyles.logoContainer}>
        <Image
          source={require("../assets/llama_without_background.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
