import { StyleSheet } from "react-native";
import { buttonDarkPink, buttonLightPink, lightGrey, pink } from "../../Consts";

const mainGamesStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 5.2,
    justifyContent: "flex-end",
    margin: "10%",
  },
  multiplayerContentContainer: {
    flex: 5,
    width: "90%",
    justifyContent: "flex-end",
    margin: "5%",
    marginTop: "20%",
  },
  mainContentContainer: {
    flex: 5.2,
    justifyContent: "flex-end",
    marginHorizontal: "10%",
    marginTop: "10%",
  },
  cardsContainer: {
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  memoryCard: {
    width: "31.3%",
    height: "23%",
    margin: "1%",
    backgroundColor: lightGrey,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: buttonLightPink,
    // shadowColor: "#2d2d2e",
    // shadowOffset: { width: 0.5, height: 1 },
    // shadowRadius: 2,
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
  pickedRaceCard: {
    width: "70%",
    height: "55%",
    // margin: "20%",
    marginHorizontal: "15%",
    marginVertical: "20%",
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
