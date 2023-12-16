import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "../../navgation/UserStack";
import mainStyles from "../../styles/MainStyles";
import { useAppStore } from "../../state";
import { Bar as ProgressBar } from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { grey, lightGrey, pink } from "../../Consts";
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
      <View style={userStyles.mainContainer}>
        <View style={userStyles.avatarContainer}>
          {avatar && (
            <View>
              <Image
                style={{
                  borderRadius: 75,
                  width: 150,
                  height: 150,
                  borderColor: lightGrey,
                  borderWidth: 5,
                }}
                source={{ uri: avatar }}
              />
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  backgroundColor: lightGrey,
                  borderRadius: 24,
                  padding: 8,
                  position: "absolute",
                  right: 5,
                  bottom: 5,
                }}
              >
                <MaterialCommunityIcons
                  name={"camera-outline"}
                  size={25}
                  color={grey}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={userStyles.infoContainer}>
          <Text style={{ color: grey, fontSize: 35, fontWeight: "bold" }}>
            {username}
          </Text>
          <Text style={{ color: grey, fontSize: 23 }}>{score} points</Text>
          <View
            style={{
              width: "90%",
              paddingTop: "5%",
            }}
          >
            <Text style={{ color: grey, fontSize: 20, fontWeight: "bold" }}>
              LEVEL {level}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: pink,
              width: "90%",
            }}
          />
          <ProgressBar
            progress={score / (points_to_next_level + score)}
            width={screenWidth * 0.9}
            height={20}
            color={pink}
            unfilledColor={"#fffcff"}
            borderWidth={0}
            borderColor={pink}
            borderRadius={2}
            animationType="timing"
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: pink,
              width: "90%",
            }}
          />
          {/*<View style={userStyles.barContainer}>*/}
          {/*  <ProgressBar*/}
          {/*    progress={score / (points_to_next_level + score)}*/}
          {/*    width={screenWidth * 0.9}*/}
          {/*    height={20}*/}
          {/*    color={pink}*/}
          {/*    unfilledColor={"#fffcff"}*/}
          {/*    borderWidth={1}*/}
          {/*    borderColor={pink}*/}
          {/*    borderRadius={10}*/}
          {/*    animationType="timing"*/}
          {/*  />*/}
          {/*</View>*/}

          <Text
            style={{
              paddingTop: "2%",
              color: grey,
              fontSize: 15,
              width: "90%",
            }}
          >
            {points_to_next_level} points to next level
          </Text>
        </View>
        <View style={{ flex: 3.1, alignItems: "center" }}>
          <TouchableOpacity
            style={userStyles.profileLlamaContainer}
            onPress={() => navigation.navigate("Llama")}
          >
            <View style={userStyles.llamaTextContainer}>
              <Text
                style={{
                  marginLeft: "20%",
                  fontSize: 35,
                  color: grey,
                  fontWeight: "bold",
                }}
              >
                Your Llama
              </Text>
            </View>
            <View style={userStyles.llama}>
              <Image
                source={require("../../assets/llama/llama.png")}
                style={userStyles.llamaImage}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: "3%",
              width: "90%",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              margin: 5,
              alignItems: "center",
              backgroundColor: lightGrey,
            }}
          >
            <Text style={{ fontSize: 18, color: grey }}>Settings</Text>
          </View>
          <View
            style={{
              width: "90%",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              margin: 5,
              alignItems: "center",
              backgroundColor: lightGrey,
            }}
          >
            <Text style={{ fontSize: 18, color: grey }}>Games history</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
