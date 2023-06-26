import { Image, View } from "react-native";
import homeStyles from "../styles/HomeStyles";
import React from "react";

const frontLlamaRight = () => {
  return (
    <View style={homeStyles.logoContainer}>
      <Image
        source={require("../assets/llama_without_background.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
};

export default frontLlamaRight;
