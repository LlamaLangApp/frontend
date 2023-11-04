import { StyleSheet } from "react-native";
import { buttonDarkPink, grey, lightGrey, pink } from "../Consts";

const userStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 5,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  userDataContainer: {
    flex: 2.7,
    width: "90%",
    height: "100%",
    marginHorizontal: "5%",
    marginTop: "5%",
    marginBottom: "3%",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: pink,
    backgroundColor: lightGrey,
    justifyContent: "flex-end",
  },
  avatarContainer: {
    flex: 1.7,
    width: "100%",
    height: "100%",
  },
  dataContainer: {
    flex: 1,
    marginHorizontal: "6%",
    marginVertical: "2%",
  },
  aboveBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barContainer: {
    alignItems: "center",
  },
  usernameContainer: {
    marginBottom: "2%",
  },
  levelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  llamaContainer: {
    flex: 1.3,
    width: "90%",
    height: "100%",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: pink,
    backgroundColor: lightGrey,
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  llamaTextContainer: {
    width: "45%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    width: "100%",
    marginHorizontal: "5%",
    marginTop: "3%",
    marginBottom: "5%",
  },
  lockContainer: {
    margin: "2%",
    width: "26%",
    height: "91%",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: grey,
    backgroundColor: lightGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "40%",
    borderWidth: 3,
    borderRadius: 15,
  },
  llama: {
    width: "55%",
    height: "100%",
  },
  llamaImage: {
    width: "110%",
    height: "100%",
  },
  avatar: {
    margin: "5%",
    width: "60%",
    height: "90%",
    borderRadius: 50,
    borderColor: buttonDarkPink,
    borderWidth: 4,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  settingsIcon: {
    position: "absolute",
    zIndex: 2,
    top: 40,
    right: 35,
  },
  colorText: {
    color: grey,
  },
});

export default userStyles;
