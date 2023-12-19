import { StyleSheet } from "react-native";
import { buttonLightPink, lightGrey, pink, purple } from "../Consts";

const homeStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // margin: 5,
  },
  buttonRowContainer: {
    marginTop: 30,
    marginBottom: 15,
    width: "100%",
  },
  gamesListContainer: {
    width: "100%",
    flex: 1,
  },
  contentContainer: {
    flex: 5,
    marginHorizontal: "10%",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "10%",
    // alignContent: "center",
  },
  logoContainer: {
    zIndex: 2,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  loginContainer: {
    borderRadius: 15,
    // borderWidth: 3,
    borderColor: "white",
    paddingVertical: "7%",
    paddingHorizontal: "7%",
    backgroundColor: lightGrey,
    margin: 10,
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
    // borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: pink,
    color: "white",
  },
  plainText: {
    // color: "white",
  },
  linkedText: {
    color: purple,
    // color: "#6C0BA9",
    // color: "#b95f75",
  },
  loginButton: {
    alignItems: "center",
    width: "100%",
    color: "#cccccc",
    backgroundColor: buttonLightPink,
    borderRadius: 15,
  },
  buttonText: {
    padding: 10,
    fontSize: 20,
    color: "white",
  },
  coverImageContainer: {
    borderRadius: 15,
    marginHorizontal: "7%",
    overflow: "hidden",
    marginVertical: "4%",
  },
  coverImage: {
    width: "100%",
    height: 180,
  },
});

export default homeStyles;
