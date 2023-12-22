import { StyleSheet } from "react-native";
import { grey, pink, purple, white } from "../Consts";

const textStyles = StyleSheet.create({
  grey14Weight600: { fontWeight: "600", fontSize: 14, color: grey },
  grey18: { fontSize: 18, color: grey },
  grey18Weight700: { fontSize: 18, color: grey, fontWeight: "700" },
  grey20Weight600: { fontWeight: "600", fontSize: 20, color: grey },
  grey20Weight800: { fontSize: 20, color: grey, fontWeight: "800" },
  grey25Weight600: { fontWeight: "600", fontSize: 25, color: grey },
  grey27Weight800: { fontSize: 27, color: grey, fontWeight: "800" },
  grey30weight700: { fontSize: 30, color: grey, fontWeight: "700" },

  pink: { color: pink },
  pink14: { fontSize: 14, color: pink },
  pink20Weight600: { fontWeight: "600", fontSize: 20, color: pink },
  pink30weight700: { fontSize: 30, color: pink, fontWeight: "700" },

  white14Weight600: { fontWeight: "600", fontSize: 14, color: white },

  weight700: { fontWeight: "700" },
  weight800: { fontWeight: "800" },

  button: { fontWeight: "600", fontSize: 19 },
  emptyList: { color: "#bababa" },
  linkedText: { fontSize: 14, color: purple },
  finePrint: { color: "#bababa", fontSize: 12, textAlign: "center" },
});

export default textStyles;
