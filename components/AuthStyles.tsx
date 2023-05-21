import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
  logoContainer: {
    flex: 1.5,
  },
  headingContainer: {
    flex: 0.7,
  },
  headingText: {
    fontSize: 25,
  },
  loginContainer: {
    // flex: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#cccccc",
    paddingVertical: 17,
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
  loginButton: {
    alignItems: "center",
    width: "100%",
    color: "#cccccc",
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
    fontSize: 17,
  },
});

export default authStyles;
