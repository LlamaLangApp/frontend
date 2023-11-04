import { Image, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import userStyles from "../../styles/UserStyles";

function LlamaScreen() {
  return (
    <View style={mainStyles.container}>
      <View style={userStyles.mainContainer}>
        <View style={userStyles.textContainer}>
          <Text style={{ fontSize: 35, color: "white" }}>Your llama</Text>
        </View>
        <View style={userStyles.llamaContainer}>
          <Image
            source={require("../../assets/llama_without_background.png")}
            style={userStyles.llamaImage}
          />
        </View>
        <View style={userStyles.storeContainer}>
          <View style={userStyles.skinsContainer}>
            <TouchableOpacity style={userStyles.llamaSkinContainer}>
              <Image
                source={require("../../assets/llama_without_background.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
            <View style={userStyles.lockContainer}>
              <Image
                source={require("../../assets/lock.png")}
                style={{ width: "50%", height: "50%" }}
              />
            </View>
            <View style={userStyles.lockContainer}>
              <Image
                source={require("../../assets/lock.png")}
                style={{ width: "50%", height: "50%" }}
              />
            </View>
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
