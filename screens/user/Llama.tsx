import { Image, Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import userStyles from "../../styles/UserStyles";
import { buttonDarkPink, grey, lightGrey, pink } from "../../Consts";

function LlamaScreen() {
  return (
    <View style={mainStyles.container}>
      <View style={userStyles.mainContainer}>
        <View
          style={{
            flex: 0.5,
            width: "80%",
            height: "80%",
            alignItems: "center",
            margin: "10%",
          }}
        >
          <Text style={{ fontSize: 35, color: "white" }}>Your llama</Text>
        </View>
        <View
          style={{
            flex: 2.5,
            width: "90%",
            marginHorizontal: "5%",
            height: "70%",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/llama_without_background.png")}
            style={userStyles.llamaImage}
          />
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: pink,
            borderColor: buttonDarkPink,
            borderTopWidth: 3,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "60%",
              flexDirection: "row",
              marginTop: "5%",
              marginHorizontal: "5%",
            }}
          >
            <TouchableOpacity
              style={{
                margin: "2%",
                width: "26%",
                height: "91%",
                borderRadius: 15,
                backgroundColor: lightGrey,
                borderWidth: 3,
                borderColor: "green",
              }}
            >
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
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: "8%",
            }}
          >
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
