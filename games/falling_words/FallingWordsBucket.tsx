import React from "react";
import {
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";

export const bucketWidth = 70;

type FallingWordsCardProps = {
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; top: number }>
  >;
  bucketPosition: { left: number; top: number };
};

const Bucket: React.FC<FallingWordsCardProps> = ({
  setPosition,
  bucketPosition,
}) => {
  const screenWidth = Math.max(
    Dimensions.get("window").width,
    Dimensions.get("window").height
  );
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const newX = gestureState.moveX - screenWidth / 2 - bucketWidth / 2;
      setPosition({
        left: newX,
        top: 0,
      });
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={[styles.bucket, bucketPosition]}
        {...panResponder.panHandlers}
      >
        <Image source={require("../../assets/llama/llama_bucket.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bucket: {
    position: "absolute",
  },
});

export default Bucket;
