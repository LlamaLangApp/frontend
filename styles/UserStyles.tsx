import { StyleSheet } from "react-native";
import { lightGrey, pink } from "../Consts";

const userStyles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  avatarContainer: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    marginTop: "10%",
  },
  barContainer: {
    width: "90%",
    marginTop: "5%",
  },
  infoContainer: {
    height: "25%",
    width: "100%",
    alignItems: "center",
  },
  profileLlamaContainer: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    aspectRatio: 5 / 2.5,
    marginBottom: "3%",
  },
  llamaContainer: {
    flex: 2.5,
    width: "90%",
    marginHorizontal: "5%",
    height: "70%",
    alignItems: "center",
  },
  llamaTextContainer: {
    marginLeft: "10%",
    width: "38%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    height: "40%",
    width: "90%",
    marginHorizontal: "5%",
    justifyContent: "center",
  },
  textContainer: {
    flex: 0.5,
    width: "80%",
    height: "80%",
    alignItems: "center",
    margin: "10%",
  },
  storeTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: "8%",
  },
  storeContainer: {
    flex: 2,
    backgroundColor: pink,
  },
  skinsContainer: {
    width: "100%",
    height: "60%",
    flexDirection: "row",
    marginTop: "5%",
    marginHorizontal: "5%",
  },
  llamaSkinContainer: {
    margin: "2%",
    width: "26%",
    height: "91%",
    borderRadius: 15,
    backgroundColor: lightGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  llama: {
    width: "55%",
    height: "100%",
  },
  cameraIconButton: {
    backgroundColor: lightGrey,
    borderRadius: 24,
    padding: 8,
    position: "absolute",
    right: 5,
    bottom: 5,
  },
  avatarImage: {
    borderRadius: 75,
    width: 150,
    height: 150,
    borderColor: lightGrey,
    borderWidth: 5,
  },
});

export default userStyles;
