import { StyleSheet } from "react-native";
import { lightGrey, pink } from "../Consts";

const userStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 5,
    width: "100%",
    height: "100%",
  },
  userDataContainer: {
    flex: 2.7,
    width: "90%",
    height: "100%",
    marginHorizontal: "5%",
    marginTop: "5%",
    marginBottom: "3%",
    borderRadius: 15,
    justifyContent: "flex-end",
  },
  avatarContainer: {
    flex: 1.5,
    alignItems: "center",
    paddingTop: "8%",
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
    paddingTop: "2%",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1.9,
    alignItems: "center",
  },
  usernameContainer: {
    alignItems: "center",
  },
  levelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileLlamaContainer: {
    width: "90%",
    borderRadius: 15,
    backgroundColor: lightGrey,
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    aspectRatio: 5 / 2.5,
    marginTop: "1%",
  },
  llamaContainer: {
    flex: 2.5,
    width: "90%",
    marginHorizontal: "5%",
    height: "70%",
    alignItems: "center",
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
    backgroundColor: lightGrey,
    alignItems: "center",
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "40%",
    borderRadius: 15,
  },
  llama: {
    width: "55%",
    height: "100%",
  },
  llamaImage: {
    width: "100%",
    height: "100%",
  },
});

export default userStyles;
