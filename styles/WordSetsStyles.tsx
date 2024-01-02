import { StyleSheet } from "react-native";
import { buttonLightPink } from "../Consts";

const wordSetsStyles = StyleSheet.create({
  containerFlashCards: {
    flex: 1,
    alignItems: "center",
  },
  flashCardsInstructionText: {
    marginTop: 500,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  flatListItem: {
    flexDirection: "row",
    marginVertical: "4%",
    marginHorizontal: "3%",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    alignItems: "center",
    color: "#cccccc",
    width: "48%",
    backgroundColor: buttonLightPink,
    borderRadius: 15,
    marginHorizontal: "1%",
  },
  buttonFlashCards: {
    alignItems: "center",
    justifyContent: "center",
    color: "#cccccc",
    width: "48%",
    height: "30%",
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
