import { StyleSheet } from "react-native";
import { buttonDarkPink, buttonLightPink, lightGrey, pink } from "../../Consts";

const mainGamesStyles = StyleSheet.create({
  cardsContainer: {
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  memoryCard: {
    width: "31.333%",
    height: "23%",
    margin: "1%",
    backgroundColor: lightGrey,
    borderRadius: 15,
    borderColor: buttonLightPink,
  },
  fallingWordsCard: {
    backgroundColor: buttonDarkPink,
    padding: 3,
  },
  raceCard: {
    width: "47%",
    height: "47%",
    margin: "1%",
    backgroundColor: lightGrey,
    borderRadius: 15,
  },
  raceCardChosen: {
    width: "47%",
    height: "47%",
    margin: "1%",
    backgroundColor: pink,
    borderRadius: 15,
  },
  llamaContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default mainGamesStyles;
