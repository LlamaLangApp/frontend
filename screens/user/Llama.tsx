import { Image, Text, TouchableOpacity, View } from "react-native";
import { grey } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import userStyles from "@styles/UserStyles";

function LlamaScreen() {
  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <View style={userStyles.mainContainer}>
        <View style={userStyles.textContainer}>
          <Text style={{ fontSize: 35, color: grey }}>Your llama</Text>
        </View>
        <View style={userStyles.llamaContainer}>
          <Image
            source={require("../../assets/llama/llama.png")}
            style={userStyles.llamaImage}
          />
        </View>
        <View style={userStyles.storeContainer}>
          <View style={userStyles.skinsContainer}>
            <TouchableOpacity style={userStyles.llamaSkinContainer}>
              <Image
                source={require("../../assets/llama/llama.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={userStyles.llamaSkinContainer}>
              <Image
                source={require("../../assets/llama/llama_nerd.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={userStyles.llamaSkinContainer}>
              <Image
                source={require("../../assets/icons/lock.png")}
                style={{ width: "50%", height: "50%" }}
              />
            </TouchableOpacity>
          </View>
          <View style={userStyles.storeTextContainer}>
            <Text style={{ fontSize: 18, color: "white" }}>
              New skins coming soon...
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default LlamaScreen;
