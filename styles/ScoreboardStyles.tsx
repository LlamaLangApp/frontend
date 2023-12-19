import { StyleSheet } from "react-native";
import { grey } from "../Consts";

const scoreboardStyles = StyleSheet.create({
  optionsContainer: {
    alignItems: "center",
    marginHorizontal: "7%",
    gap: 10,
    marginBottom: "4%",
  },
  playerPlaceList: {
    width: "86%",
    borderRadius: 10,
    marginBottom: "3%",
  },
  userPlaceContainer: {
    width: "86%",
    height: "12%",
    marginBottom: "5%",
  },
  userPlaceText: {
    color: grey,
    fontWeight: "600",
    marginBottom: "0.9%",
  },
  podiumImage: {
    width: "70%",
    height: "70%",
  },
  placeText: {
    fontSize: 25,
    color: grey,
  },
  placeAndUsernameContainer: {
    height: 70,
    width: 50 + 15 + 15,
    flexDirection: "row",
    marginVertical: "1.5%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    margin: 3,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ede4e8",
  },
  scoreContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});

export default scoreboardStyles;
