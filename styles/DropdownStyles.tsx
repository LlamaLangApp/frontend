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
    borderWidth: 1,
    borderColor: buttonLightPink,
  },
  dropdownButtonClosed: {
    borderRadius: 15,
  },
  dropdownButtonOpen: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  dropdownButtonText: {
    color: "#444444",
    textAlign: "left",
  },
});

export default dropdownStyles;
