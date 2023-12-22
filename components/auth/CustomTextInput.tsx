import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { InputProps } from "../../hooks/useInput";
import authStyles from "../../styles/AuthStyles";
import textStyles from "../../styles/TextStyles";
import containerStyles from "../../styles/ContainerStyles";

const CustomTextInput = ({
  inputProps,
  textAbove,
  secureTextEntry,
  rightReference,
  referenceOnPress,
}: {
  inputProps: InputProps;
  textAbove: string;
  secureTextEntry?: boolean;
  rightReference?: string;
  referenceOnPress?: () => void;
}) => {
  return useMemo(() => {
    return (
      <View style={{ width: "100%" }}>
        <View
          style={[
            containerStyles.text,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Text style={textStyles.grey14Weight600}>{textAbove}</Text>
          {rightReference && referenceOnPress && (
            <TouchableOpacity onPress={referenceOnPress}>
              <Text style={textStyles.linkedText}>{rightReference}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={authStyles.textInputContainer}>
          <TextInput
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            style={authStyles.textInput}
            value={inputProps.value}
            onChange={inputProps.onChange}
          />
        </View>
      </View>
    );
  }, [inputProps.value, textAbove, secureTextEntry, rightReference]);
};

export default CustomTextInput;
