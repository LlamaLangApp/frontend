import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useMemo } from "react";
import statisticsStyles from "@styles/StatisticsStyles";

const StatisticsInfo = ({
  statsText,
  statsNumber,
  iconName,
  textColor,
  backgroundColor,
}: {
  statsText: string;
  statsNumber: number | undefined;
  iconName: string;
  textColor: string;
  backgroundColor: string;
}) => {
  return useMemo(() => {
    return (
      <View
        style={[
          statisticsStyles.statsInfo,
          { backgroundColor: backgroundColor },
        ]}
      >
        <Text>
          <FontAwesome5 name={iconName} color={textColor} size={18} />
          <Text style={{ fontSize: 18, color: textColor }}>{statsText}</Text>
        </Text>
        <Text style={{ fontSize: 18, color: textColor, fontWeight: "bold" }}>
          {statsNumber}
        </Text>
      </View>
    );
  }, [backgroundColor, textColor, statsNumber, statsText]);
};

export default StatisticsInfo;
