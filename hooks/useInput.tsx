import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export type InputProps = {
  value: string;
  onChange: (
    enteredText: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
};

export function useInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  function handleChange(
    enteredText: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setValue(enteredText.nativeEvent.text);
  }

  return {
    value: value,
    onChange: handleChange,
  };
}
