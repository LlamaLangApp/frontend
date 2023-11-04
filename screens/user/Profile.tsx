import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "../../navgation/UserStack";
import mainStyles from "../../styles/MainStyles";
import { useAppStore } from "../../state";
import { Bar as ProgressBar } from "react-native-progress";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  buttonDarkPink,
  buttonLightPink,
  grey,
  lightGrey,
  pink,
} from "../../Consts";
import React from "react";
import userStyles from "../../styles/UserStyles";

type Props = NativeStackScreenProps<UserStackParamList, "User">;

function ProfileScreen({ navigation }: Props) {
  const { username, avatar, level, score } = useAppStore((store) => ({
    username: store.username,
    avatar: store.avatar ? store.avatar : "",
    level: store.level,
    score: store.score,
  }));
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={mainStyles.container}>
      <TouchableOpacity style={userStyles.settingsIcon}>
        <FontAwesome5 name="edit" size={30} color={"#696368"} />
      </TouchableOpacity>
      <View style={userStyles.mainContainer}>
        <View style={userStyles.userDataContainer}>
          <View style={userStyles.avatarContainer}>
            <View style={userStyles.avatar}>
              {avatar && (
                <Image
                  source={{ uri: avatar }}
                  style={userStyles.avatarImage}
                />
              )}
            </View>
          </View>
          <View style={userStyles.dataContainer}>
            <View style={userStyles.aboveBarContainer}>
              <View>
                <View style={userStyles.usernameContainer}>
                  <Text style={{ color: grey, fontSize: 35 }}>{username}</Text>
                </View>
                <View>
                  <Text style={{ color: grey, fontSize: 23 }}>
                    {score} points
                  </Text>
                </View>
              </View>
              <View style={userStyles.levelContainer}>
                <Text style={{ color: grey, fontSize: 60 }}>{level}</Text>
                <Text style={{ color: grey, fontSize: 15, marginTop: -14 }}>
                  Level
                </Text>
              </View>
            </View>
            <View style={userStyles.barContainer}>
              <ProgressBar
                progress={score / 1000}
                width={screenWidth * 0.8}
                height={40}
                color={buttonLightPink}
                unfilledColor={"#ffffff"}
                borderWidth={2}
                borderRadius={15}
                borderColor={buttonDarkPink}
                animationType="timing"
              />
            </View>
            <View>
              <Text style={{ color: "#8c878c", fontSize: 9 }}>
                {1000 - score} points to next level
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={userStyles.llamaContainer}
          onPress={() => navigation.navigate("Llama")}
        >
          <View style={userStyles.llamaTextContainer}>
            <Text style={{ marginLeft: "20%", fontSize: 35, color: grey }}>
              Your Llama
            </Text>
          </View>
          <View style={userStyles.llama}>
            <Image
              source={require("../../assets/llama_without_background.png")}
              style={userStyles.llamaImage}
            />
          </View>
        </TouchableOpacity>
        <View style={userStyles.buttonsContainer}>
          <TouchableOpacity
            style={[
              userStyles.button,
              { borderColor: pink, backgroundColor: lightGrey },
            ]}
            onPress={() => navigation.navigate("Statistics")}
          >
            <Text style={{ padding: 10, fontSize: 19, color: grey }}>
              Statistics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              userStyles.button,
              { borderColor: lightGrey, backgroundColor: pink },
            ]}
          >
            <Text style={{ padding: 10, fontSize: 19, color: "white" }}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
