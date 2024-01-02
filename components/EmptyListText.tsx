import { Text, View } from "react-native";
import React, { useMemo } from "react";
import textStyles from "@styles/TextStyles";
import containerStyles from "@styles/ContainerStyles";

const EmptyListText = ({ texts }: { texts: string[] }) => {
  return useMemo(() => {
    return (
      <View style={containerStyles.emptyList}>
        {texts.map((text, index) => (
          <Text key={index} style={textStyles.emptyList}>
            {text}
          </Text>
        ))}
      </View>
    );
  }, [texts]);
};

export default EmptyListText;
