import { StyleSheet } from "react-native";
import { buttonLightPink } from "../../Consts";

const buttonGamesStyles = StyleSheet.create({
  startButton: {
    alignItems: "center",
    width: "100%",
    color: "#cccccc",
    backgroundColor: buttonLightPink,
    borderRadius: 15,
    margin: "1%",
  },
  button: {
    alignItems: "center",
    width: "48%",
    color: "#cccccc",
    backgroundColor: buttonLightPink,
    borderRadius: 15,
    margin: "1%",
  },
  buttonText: {
    padding: 10,
    fontSize: 20,
    color: "white",
  },
});

export default buttonGamesStyles;
