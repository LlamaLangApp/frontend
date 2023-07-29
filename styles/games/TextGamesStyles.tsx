import { StyleSheet } from "react-native";

const textGamesStyles = StyleSheet.create({
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
    // flex: 0.5,
    marginBottom: "5%",
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
    // fontFamily: "Roboto",
  },
  secondaryText: {
    fontSize: 21,
    color: "white",
    // textShadowColor: "#2d2d2e",
    // textShadowOffset: { width: 0.5, height: 1 },
    // textShadowRadius: 2,
    // fontFamily: "Roboto",
  },
  basicText: {
    fontSize: 16,
    color: "white",
    // textShadowColor: "#2d2d2e",
    // textShadowOffset: { width: 0.5, height: 1 },
    // textShadowRadius: 2,
    // fontFamily: "Roboto",
  },
});

export default textGamesStyles;
