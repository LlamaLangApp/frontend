import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import dropdownStyles from "../styles/DropdownStyles";
import { useState } from "react";

interface CustomDropdownProps {
  defaultSelectText: string;
  selectData: string[];
  onSelectFunc: (selectedItem: string) => void;
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const { defaultSelectText, selectData, onSelectFunc } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectDropdown
      data={selectData}
      onSelect={(selectedItem) => onSelectFunc(selectedItem)}
      defaultButtonText={`-- Select ${defaultSelectText} --`}
      buttonTextAfterSelection={(selectedItem) => {
        return selectedItem;
      }}
      rowTextForSelection={(item) => {
        return item;
      }}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      buttonStyle={{
        ...dropdownStyles.dropdownButton,
        ...(isOpen
          ? dropdownStyles.dropdownButtonOpen
          : dropdownStyles.dropdownButtonClosed),
      }}
      buttonTextStyle={dropdownStyles.dropdownButtonText}
      renderDropdownIcon={(isOpened) => {
        return (
          <FontAwesome
            name={isOpened ? "chevron-up" : "chevron-down"}
            color={"#444444"}
            size={18}
          />
        );
      }}
      dropdownIconPosition={"right"}
      dropdownStyle={dropdownStyles.dropdown}
      rowStyle={dropdownStyles.dropdownRow}
      rowTextStyle={dropdownStyles.dropdownRowText}
      statusBarTranslucent={true}
    />
  );
};

export default CustomDropdown;
