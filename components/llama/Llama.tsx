import { Image, View } from "react-native";
import React, { useMemo } from "react";

const Llama = () => {
  return useMemo(() => {
    return (
      <View>
        <Image
          source={require("../../assets/llama/llama.png")}
          style={{ width: 250, height: 250 }}
        />
      </View>
    );
  }, []);
};

export default Llama;
