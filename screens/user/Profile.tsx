import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "../../navgation/UserStack";
import mainStyles from "../../styles/MainStyles";
import { useAppStore } from "../../state";
import { Bar as ProgressBar } from "react-native-progress";
import { FontAwesome5 } from "@expo/vector-icons";
import { buttonLightPink, grey, lightGrey, pink } from "../../Consts";
import React from "react";
import userStyles from "../../styles/UserStyles";
import * as ImagePicker from "expo-image-picker";
import { makeApiRequest } from "../../backend/CommonBackend";
import { getUserData, UserData } from "../../backend/UserBackend";

type Props = NativeStackScreenProps<UserStackParamList, "User">;

function ProfileScreen({ navigation }: Props) {
  const {
    username,
    avatar,
    level,
    score,
    token,
    points_to_next_level,
    setUserData,
  } = useAppStore((store) => ({
    username: store.username,
    avatar: store.avatar,
    level: store.level,
    score: store.score,
    token: store.token,
    points_to_next_level: store.points_to_next_level,
    setUserData: store.setUserData,
  }));
  const screenWidth = Dimensions.get("window").width;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      fetch(result.assets[0].uri)
        .then((response) => response.blob())
        .then((blob) => {
          makeApiRequest<UserData>("avatar-upload/", "POST", token, blob, {
            "Content-Disposition": `attachment; filename=avatar.jpg`,
          }).then(() =>
            getUserData(token).then((response) => {
              if (response.type === "success") {
                setUserData(response.result);
              }
            })
          );
        });
    }
  };

  return (
    <View style={mainStyles.whiteBackgroundContainer}>
      <TouchableOpacity style={userStyles.settingsIcon} onPress={pickImage}>
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
                progress={score / (points_to_next_level + score)}
                width={screenWidth * 0.8}
                height={40}
                color={buttonLightPink}
                unfilledColor={"#ffffff"}
                borderWidth={2}
                borderRadius={15}
                borderColor={grey}
                animationType="timing"
              />
            </View>
            <View>
              <Text style={{ color: "#8c878c", fontSize: 9 }}>
                {points_to_next_level} points to next level
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={userStyles.profileLlamaContainer}
          onPress={() => navigation.navigate("Llama")}
        >
          <View style={userStyles.llamaTextContainer}>
            <Text style={{ marginLeft: "20%", fontSize: 35, color: grey }}>
              Your Llama
            </Text>
          </View>
          <View style={userStyles.llama}>
            <Image
              source={require("../../assets/llama.png")}
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
