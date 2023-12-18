import buttonGamesStyles from "../../styles/games/ButtonGamesStyles";
import textGamesStyles from "../../styles/games/TextGamesStyles";
import { DimensionValue, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { grey, lightGrey, pink, white } from "../../Consts";

const BasicButton = ({
  buttonText,
  buttonColor,
  textColor,
  onPress,
  height,
  width,
}: {
  buttonText: string;
  buttonColor: string;
  textColor: string;
  onPress: () => void;
  height?: DimensionValue;
  width?: DimensionValue;
}) => {
  return useMemo(() => {
    return (
      <TouchableOpacity
        style={[
          buttonGamesStyles.basic,
          {
            backgroundColor: buttonColor,
            height: height ? height : "9%",
            width: width ? width : "70%",
          },
        ]}
        onPress={onPress}
      >
        <Text style={[textGamesStyles.button, { color: textColor }]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  }, [buttonText, buttonColor, textColor, onPress]);
};

export const PinkButton = ({
  buttonText,
  onPress,
  height,
  width,
}: {
  buttonText: string;
  onPress: () => void;
  height?: DimensionValue;
  width?: DimensionValue;
}) => {
  return (
    <BasicButton
      buttonText={buttonText}
      buttonColor={pink}
      textColor={white}
      onPress={onPress}
      height={height}
      width={width}
    />
  );
};

export const LightGreyButton = ({
  buttonText,
  onPress,
  height,
  width,
}: {
  buttonText: string;
  onPress: () => void;
  height?: DimensionValue;
  width?: DimensionValue;
}) => {
  return (
    <BasicButton
      buttonText={buttonText}
      buttonColor={lightGrey}
      textColor={grey}
      onPress={onPress}
      height={height}
      width={width}
    />
  );
};
