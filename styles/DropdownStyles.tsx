import { StyleSheet } from "react-native";
import { buttonLightPink } from "../Consts";

const dropdownStyles = StyleSheet.create({
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
    marginBottom: "8%",
  },
  dropdownButtonText: {
    color: "#444444",
    textAlign: "left",
  },
});

export default dropdownStyles;
