import { StyleSheet } from "react-native";
import { grey, pink, white } from "../../Consts";

const textGamesStyles = StyleSheet.create({
  gameName: {
    fontSize: 27,
    color: grey,
    fontWeight: "800",
  },
  gameNameHorizontally: {
    fontSize: 20,
    color: grey,
    fontWeight: "800",
  },
  information: {
    fontSize: 18,
    color: grey,
  },
  basicWeight600: {
    fontWeight: "600",
    fontSize: 14,
    color: grey,
  },
  whiteWeight600: {
    fontWeight: "600",
    fontSize: 14,
    color: white,
  },
  biggerBasicWeight600: {
    fontWeight: "600",
    fontSize: 20,
    color: grey,
  },
  weight700: {
    fontWeight: "700",
  },
  finePrint: {
    color: "#bababa",
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    fontWeight: "600",
    fontSize: 19,
  },
  important: {
    fontSize: 30,
    color: pink,
    fontWeight: "700",
  },
  importantGrey: {
    fontSize: 30,
    color: grey,
    fontWeight: "700",
  },
});

export default textGamesStyles;
