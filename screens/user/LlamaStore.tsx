import { Image, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "@styles/MainStyles";
import userStyles from "@styles/UserStyles";
import textStyles from "@styles/TextStyles";
import containerStyles from "@styles/ContainerStyles";

function LlamaStoreScreen() {
  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={userStyles.mainContainer}>
        <View style={userStyles.textContainer}>
          <Text style={textStyles.grey35weight700}>Your llama</Text>
        </View>
        <View style={userStyles.llamaContainer}>
          <Image
            source={require("@assets/llama/llama.png")}
            style={containerStyles.width100height100}
          />
        </View>
        <View style={userStyles.storeContainer}>
          <View style={userStyles.skinsContainer}>
            <TouchableOpacity style={userStyles.llamaSkinContainer}>
              <Image
                source={require("@assets/llama/llama.png")}
                style={containerStyles.width100height100}
              />
            </TouchableOpacity>
            <TouchableOpacity style={userStyles.llamaSkinContainer}>
              <Image
                source={require("@assets/llama/llama_nerd.png")}
                style={containerStyles.width100height100}
              />
            </TouchableOpacity>
            <TouchableOpacity style={userStyles.llamaSkinContainer}>
              <Image
                source={require("@assets/icons/lock.png")}
                style={{ width: "50%", height: "50%" }}
              />
            </TouchableOpacity>
          </View>
          <View style={userStyles.storeTextContainer}>
            <Text style={textStyles.white14Weight600}>
              New skins coming soon...
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LlamaStoreScreen;
