import { StyleSheet } from "react-native";
import {
  buttonDarkPink,
  buttonLightPink,
  grey,
  lightGrey,
  pink,
} from "../Consts";

const userStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 5,
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flex: 0.4,
    justifyContent: "flex-end",
    marginLeft: "6%",
    marginBottom: "1%",
  },
  searchContainer: {
    flex: 4.6,
    width: "90%",
    marginHorizontal: "5%",
    marginBottom: "10%",
    backgroundColor: lightGrey,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: buttonDarkPink,
  },
  textInput: {
    marginHorizontal: "2%",
    marginVertical: "2%",
    borderWidth: 2,
    borderColor: buttonDarkPink,
    borderRadius: 10,
    width: "96%",
    height: "6%",
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: "white",
    color: grey,
    fontSize: 18,
  },
  usersList: {
    width: "96%",
    height: "90%",
    marginHorizontal: "2%",
    marginBottom: "2%",
    borderRadius: 10,
  },
  usersListItem: {
    marginVertical: "1%",
    backgroundColor: pink,
    borderColor: buttonLightPink,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: buttonDarkPink,
    overflow: "hidden",
    margin: 3,
    marginRight: 10,
  },
  avatarUsernameContainer: {
    flexDirection: "row",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});

export default userStyles;
