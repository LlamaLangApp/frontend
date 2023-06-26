import { Image, View } from "react-native";
import authStyles from "../styles/AuthStyles";
import React from "react";

const FrontLlamaCenter = () => {
  return (
    <View style={authStyles.llamaContainer}>
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

export default FrontLlamaCenter;
