import { StyleSheet } from "react-native";

const gameInvitationsStyles = StyleSheet.create({
  invitationsIconContainer: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 3,
  },
  modalDisplay: {
    marginTop: "9%",
    marginBottom: "33%",
    width: "90%",
    height: "58%",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  invitesListContainer: {
    paddingVertical: 16,
    borderRadius: 8,
    width: "100%",
  },
  invitesList: {
    width: "100%",
    height: "80%",
    marginBottom: "2%",
    borderRadius: 10,
  },
  inviteContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    margin: "5%",
    gap: 10,
  },
});
export default gameInvitationsStyles;
