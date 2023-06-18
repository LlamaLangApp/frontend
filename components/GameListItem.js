import { View, Text, StyleSheet, Pressable } from "react-native";

function GameListItem(props) {
  return (
    <Pressable>
      {/*onPress={console.log("press")}>*/}
      {/* props.onDeleteItem.bind(this, props.id)}>*/}
      <View style={styles.gameListItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
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
