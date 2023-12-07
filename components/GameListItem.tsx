import { StyleSheet, TouchableOpacity, Image } from "react-native";

interface GameListItemProps {
  text: string;
  id: string;
  disableHighlight: boolean;
  onPressItem: () => void;
}

function GameListItem(props: GameListItemProps) {
  return (
    <TouchableOpacity onPress={props.onPressItem} style={styles.gameListItem}>
      {props.text === "memory" ? (
        <Image
          source={require("../assets/games/Memory.png")}
          style={styles.image}
        />
      ) : (
        <Image
          source={require("../assets/games/FallingWords.png")}
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
}

export default GameListItem;

const styles = StyleSheet.create({
  gameListItem: {
    // margin: 8,
    borderRadius: 15,
    backgroundColor: "#e17c9b",
    alignItems: "center",
    width: "86%",
    marginHorizontal: "7%",
    overflow: "hidden",
    marginVertical: "4%",
  },
  image: {
    width: "100%",
    height: 180,
    overflow: "hidden",
  },
});
