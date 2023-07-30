import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import dropdownStyles from "../styles/DropdownStyles";

interface CustomDropdownProps {
  defaultSelectText: string;
  selectData: string[];
  onSelectFunc: (selectedItem: string) => void;
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const { defaultSelectText, selectData, onSelectFunc } = props;
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
      buttonStyle={dropdownStyles.dropdownButton}
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
    />
  );
};

export default CustomDropdown;
