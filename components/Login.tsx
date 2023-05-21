import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

function LogScreen() {
  return (
    <View
      style={{
        marginTop: "40%",
        marginBottom: "60%",
        marginLeft: "12%",
        marginRight: "12%",
      }}
    >
      <View style={styles.appContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Sign in to LlamaLang</Text>
        </View>
        <View style={{ flex: 5 }}>
          <View style={styles.loginContainer}>
            <Text style={styles.plainText}>Username or email address</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.textInput} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.plainText}>Password</Text>
              <Text style={styles.linkedText}>Forgot password?</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.textInput} />
            </View>
            <TouchableOpacity style={styles.loginButton}>
              <Text>Sign in</Text>
            </TouchableOpacity>
            <Button title={"Sign in"} color="#cccccc" />
          </View>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/Llama-bez-tla.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
}

export default LogScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
  logoContainer: {
    flex: 1.5,
  },
  headingContainer: {
    flex: 0.9,
  },
  headingText: {
    fontSize: 25,
  },
  loginContainer: {
    // flex: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#cccccc",
    paddingTop: 15,
    paddingBottom: 3,
    paddingHorizontal: 12,
    // alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 18,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#cccccc",
    borderRadius: 10,
    width: "100%",
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  plainText: {},
  linkedText: {},
  loginButton: {},
});
