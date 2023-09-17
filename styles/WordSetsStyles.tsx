import { StyleSheet } from "react-native";
import { buttonLightPink } from "../Consts";

const wordSetsStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    color: "#cccccc",
    width: "48%",
    backgroundColor: buttonLightPink,
    borderRadius: 15,
    marginHorizontal: "1%",
  },
  buttonShorter: {
    alignItems: "center",
    color: "#cccccc",
    width: "68%",
    backgroundColor: buttonLightPink,
    borderRadius: 15,
    marginHorizontal: "1%",
  },
  buttonIcon: {
    alignItems: "center",
    justifyContent: "center",
    color: "#cccccc",
    width: "28%",
    backgroundColor: buttonLightPink,
    borderRadius: 15,
    marginHorizontal: "1%",
  },
  buttonText: {
    padding: 10,
    fontSize: 19,
    color: "white",
  },
  headingText: {
    fontSize: 27,
    color: "white",
    textShadowColor: "#2d2d2e",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});

export default wordSetsStyles;
