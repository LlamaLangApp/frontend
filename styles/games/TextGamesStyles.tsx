import { StyleSheet } from "react-native";
import { grey } from "../../Consts";

const textGamesStyles = StyleSheet.create({
  gameName: {
    fontSize: 27,
    color: grey,
    fontWeight: "800",
  },
  information: {
    fontSize: 18,
    color: grey,
  },
  finePrint: {
    color: "#bababa",
    fontSize: 12,
  },
  button: {
    fontWeight: "600",
    fontSize: 19,
  },
  instructionContainer: {
    margin: "3%",
  },
  instructionText: {
    fontSize: 21,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  textContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headingContainer: {
    // flex: 0.5,
  },
  textWithMarginContainer: {
    width: "100%",
    marginBottom: "3%",
  },
  headingAndPointsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
  headingText: {
    fontSize: 27,
    color: "white",
    textShadowColor: "#2d2d2e",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  secondaryText: {
    fontSize: 21,
    color: "white",
  },
  basicText: {
    fontSize: 16,
    color: "white",
  },
});

export default textGamesStyles;
