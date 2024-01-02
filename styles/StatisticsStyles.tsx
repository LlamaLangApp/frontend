import { StyleSheet } from "react-native";
import { lightGrey } from "../Consts";

const statisticsStyles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    height: "90%",
    marginVertical: "5%",
  },
  calendar: { height: "60%" },
  statsInfoContainer: {
    height: "20%",
    width: "100%",
    alignItems: "center",
  },
  points: {
    alignItems: "center",
    width: "100%",
    height: "20%",
    gap: 10,
  },
  gameChoice: {
    backgroundColor: lightGrey,
    margin: 5,
    height: 60,
    width: 110,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  customHeader: {
    flex: 1,
  },
  statsInfo: {
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    margin: 5,
  },
});

export default statisticsStyles;
