import gameStyles from "../styles/GamesStyles";
import { FontAwesome } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";

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
      buttonStyle={gameStyles.dropdownButton}
      buttonTextStyle={gameStyles.dropdownButtonText}
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
      dropdownStyle={gameStyles.dropdown}
      rowStyle={gameStyles.dropdownRow}
      rowTextStyle={gameStyles.dropdownRowText}
    />
  );
};

export default CustomDropdown;
