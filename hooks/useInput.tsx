import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

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
