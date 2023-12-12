import { StyleSheet } from "react-native";

const containerGamesStyles = StyleSheet.create({
  screen: {
    flex: 3,
    justifyContent: "flex-end",
    margin: "5%",
    width: "90%",
    alignItems: "center",
    height: "100%",
  },
  basic: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textWithMargin: {
    width: "100%",
    marginBottom: "3%",
    alignItems: "center",
  },
  differentSizeTexts: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 3,
    flexDirection: "row",
  },
  dropDown: {
    width: "80%",
    height: "10%",
    marginBottom: "8%",
    alignItems: "center",
  },
  raceCard: {
    width: "48%",
    height: "48%",
    margin: "1%",
    borderRadius: 15,
  },
});

export default containerGamesStyles;
