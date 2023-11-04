import React, { useState } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";

const Bucket = () => {
  const screenWidth = Dimensions.get("window").width;
  const [bucketStyles, setBucketStyles] = useState({ left: 0, top: 0 });
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const newX = gestureState.moveX - Math.floor(screenWidth / 2) - 25; // Adjust for the bucket's width
      setBucketStyles({
        left: newX,
        top: 0,
      });
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={[styles.bucket, bucketStyles]}
        {...panResponder.panHandlers}
      />
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
    width: 50,
    height: 50,
    backgroundColor: "pink",
    position: "absolute",
  },
});

export default Bucket;
