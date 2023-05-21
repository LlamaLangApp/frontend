import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import authStyles from "./AuthStyles";

function LogScreen() {
  return (
    <View
      style={{
        marginTop: "45%",
        // marginBottom: "60%",
        marginLeft: "12%",
        marginRight: "12%",
      }}
    >
      <View style={authStyles.appContainer}>
        <View style={authStyles.headingContainer}>
          <Text style={authStyles.headingText}>Sign in to LlamaLang</Text>
        </View>
        <View style={{ flex: 5 }}>
          <View style={authStyles.loginContainer}>
            <Text style={authStyles.plainText}>Username or email address</Text>
            <View style={authStyles.inputContainer}>
              <TextInput style={authStyles.textInput} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={authStyles.plainText}>Password</Text>
              <Text style={authStyles.linkedText}>Forgot password?</Text>
            </View>
            <View style={authStyles.inputContainer}>
              <TextInput style={authStyles.textInput} />
            </View>
            <TouchableOpacity style={authStyles.loginButton}>
              <Text style={authStyles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            {/*<Button title={"Sign in"} color="#cccccc" />*/}
          </View>
        </View>
      </View>
      {/*<View style={authStyles.logoContainer}>*/}
      {/*  <Image*/}
      {/*    source={require("../assets/llama_without_background.png")}*/}
      {/*    style={{ width: "100%", height: "100%" }}*/}
      {/*  />*/}
      {/*</View>*/}
    </View>
  );
}

export default LogScreen;
