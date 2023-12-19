import { StyleSheet } from "react-native";
import { grey, lightGrey, white } from "../Consts";

const authStyles = StyleSheet.create({
  startContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "10%",
    marginTop: "20%",
    width: "80%",
    height: "80%",
  },
  contentContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: "10%",
    marginHorizontal: "10%",
    width: "80%",
    height: "100%",
  },
  logoContainer: {
    width: "100%",
    height: "32%",
  },
  loginContainer: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: lightGrey,
    alignItems: "flex-start",
    height: "42%",
  },
  registerContainer: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: lightGrey,
    alignItems: "flex-start",
    height: "68%",
  },
  noteContainer: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: lightGrey,
    alignItems: "center",
    justifyContent: "center",
    height: "7%",
    marginTop: 20,
    flexDirection: "row",
  },
  registerNoteContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
    height: "4%",
    marginTop: "3%",
  },
  inputsContainer: {
    margin: "5%",
    width: "90%",
    height: "100%",
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "3%",
  },
  textInput: {
    borderRadius: 10,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: white,
    fontWeight: "500",
    color: grey,
  },
  loginButtonContainer: {
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  registerButtonContainer: {
    alignItems: "center",
    width: "100%",
    height: "12%",
  },
  urlInput: {
    height: 30,
    width: "90%",
    backgroundColor: lightGrey,
    borderRadius: 10,
    padding: 5,
    marginBottom: "5%",
  },
});

export default authStyles;
