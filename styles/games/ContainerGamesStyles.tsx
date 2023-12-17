import { StyleSheet } from "react-native";
import { grey, lightGrey } from "../../Consts";

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
  fakeDropDown: {
    width: "100%",
    height: "87%",
    backgroundColor: lightGrey,
    borderWidth: 1,
    borderColor: grey,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexDirection: "row",
  },
  raceCard: {
    width: "48%",
    height: "48%",
    margin: "1%",
    borderRadius: 15,
  },
  thinLine: {
    borderBottomWidth: 1,
    borderColor: lightGrey,
    width: "100%",
  },
});

export default containerGamesStyles;
