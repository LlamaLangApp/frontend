import { StyleSheet } from "react-native";
import { defaultBackgroundColor, authBackgroundColor } from "../Consts";

const mainStyles = StyleSheet.create({
  whiteBackgroundContainer: {
    flex: 1,
    backgroundColor: defaultBackgroundColor,
    alignItems: "center",
  },
  pinkBackgroundContainer: {
    flex: 1,
    backgroundColor: authBackgroundColor,
    alignItems: "center",
  },
});
export default mainStyles;
