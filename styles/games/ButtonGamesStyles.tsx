import { StyleSheet } from "react-native";
import { buttonLightPink } from "../../Consts";

const buttonGamesStyles = StyleSheet.create({
  basic: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: "9%",
    borderRadius: 15,
    marginVertical: "2%",
    flexDirection: "row",
    gap: 10,
  },
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
