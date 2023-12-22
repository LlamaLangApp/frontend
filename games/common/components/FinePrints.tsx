import { Text, View } from "react-native";
import React, { useMemo } from "react";
import textStyles from "@styles/TextStyles";

const FinePrints = ({ prints }: { prints: string[] }) => {
  return useMemo(() => {
    return (
      <View>
        {prints.map((item, index) => (
          <Text key={index} style={textStyles.finePrint}>
            {item}
          </Text>
        ))}
      </View>
    );
  }, [prints]);
};

export default FinePrints;
