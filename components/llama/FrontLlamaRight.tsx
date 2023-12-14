import { Image, View } from "react-native";
import React, { useMemo } from "react";

const FrontLlamaRight = () => {
  return useMemo(() => {
    return (
      <View style={{ zIndex: 2, position: "absolute", bottom: 0, right: 0 }}>
        <Image
          source={require("../../assets/llama/llama.png")}
          style={{
            width: 250,
            height: 250,
          }}
        />
      </View>
    );
  }, []);
};

export default FrontLlamaRight;
