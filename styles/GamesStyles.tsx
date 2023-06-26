import { StyleSheet } from "react-native";
import { buttonLightPink, lightGrey } from "../Consts";

const gameStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 3,
    justifyContent: "flex-end",
    margin: "10%",
  },
  cardsContainer: {
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  card: {
    width: "31.3%",
    height: "23%",
    margin: "1%",
    backgroundColor: lightGrey,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: buttonLightPink,
  },
  llamaContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
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
  headingAndPointsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  dropdown: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdownRow: {
    borderBottomColor: "#c5c5c5",
  },
  dropdownRowText: {
    color: "#444444",
    textAlign: "left",
  },
  dropdownButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: buttonLightPink,
  },
  dropdownButtonText: {
    color: "#444444",
    textAlign: "left",
  },
  startButton: {
    alignItems: "center",
    width: "100%",
    color: "#cccccc",
    backgroundColor: buttonLightPink,
    borderRadius: 15,
    margin: "1%",
  },
  progressBar: {
    // width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: buttonLightPink,
  },
  buttonText: {
    padding: 10,
    fontSize: 20,
    color: "white",
  },
});

export default gameStyles;
