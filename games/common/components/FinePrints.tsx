import textGamesStyles from "../../../styles/games/TextGamesStyles";
import { Text, View } from "react-native";
import React, { useMemo } from "react";

const FinePrints = ({ prints }: { prints: string[] }) => {
  return useMemo(() => {
    return (
      <View>
        {prints.map((item, index) => (
          <Text key={index} style={textGamesStyles.finePrint}>
            {item}
          </Text>
        ))}
      </View>
    );
  }, [prints]);
};

export default FinePrints;
