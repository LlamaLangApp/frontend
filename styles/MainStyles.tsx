import { StyleSheet } from "react-native";
import { defaultBackgroundColor } from "../Consts";

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultBackgroundColor,
    alignItems: "center",
  },
  whiteBackgroundContainer: {
    flex: 1,
    backgroundColor: "#fffcff",
    alignItems: "center",
  },
});
export default mainStyles;
