import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
  },
  logoContainer: {
    flex: 4,
  },
  headingContainer: {
    flex: 0.7,
  },
  headingText: {
    fontSize: 27,
    color: "white",
  },
  loginContainer: {
    // flex: 5,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "white",
    paddingVertical: "7%",
    paddingHorizontal: "7%",
    backgroundColor: "#efefef",
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
    borderColor: "white",
    borderRadius: 15,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: "#e09cab",
    color: "white",
  },
  plainText: {
    // color: "white",
  },
  linkedText: {},
  loginButton: {
    alignItems: "center",
    width: "100%",
    color: "#cccccc",
    backgroundColor: "#c77d90",
    borderRadius: 15,
  },
  buttonText: {
    padding: 10,
    fontSize: 20,
    color: "white",
  },
});

export default authStyles;
