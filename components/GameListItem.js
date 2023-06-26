import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function GameListItem(props) {
  return (
    <TouchableOpacity onPress={props.onPressItem}>
      <View style={styles.gameListItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default GameListItem;

const styles = StyleSheet.create({
  gameListItem: {
    margin: 8,
    // padding: 8,
    paddingVertical: 40,
    borderRadius: 15,
    backgroundColor: "#e17c9b",
    alignItems: "center",
  },
  goalText: {
    color: "white",
    fontSize: 50,
  },
});
