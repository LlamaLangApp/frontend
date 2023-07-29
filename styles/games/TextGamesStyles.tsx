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
    // fontFamily: "Roboto",
  },
  secondaryText: {
    fontSize: 21,
    color: "white",
    // fontFamily: "Roboto",
  },
  basicText: {
    fontSize: 16,
    color: "white",
    // fontFamily: "Roboto",
  },
});

export default textGamesStyles;
