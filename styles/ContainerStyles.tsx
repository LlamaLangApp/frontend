import { StyleSheet } from "react-native";
import { grey } from "../Consts";

const containerStyles = StyleSheet.create({
  width100: { width: "100%" },
  textWithMargin: {
    width: "100%",
    marginBottom: "3%",
    alignItems: "center",
  },
  text: {
    width: "98%",
    margin: "1%",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  thinLine: {
    borderBottomWidth: 1,
    borderColor: "#bababa",
    width: "100%",
  },
  darkerThinLine: {
    borderBottomWidth: 1,
    backgroundColor: grey,
    width: "100%",
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  buttonRow: {
    marginTop: 30,
    marginBottom: 15,
    width: "100%",
  },
  spaceBetweenInRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default containerStyles;
