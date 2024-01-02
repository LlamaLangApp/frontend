import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { Bar as ProgressBar } from "react-native-progress";
import { UserStackParamList } from "@navigation/UserStack";
import { makeApiRequest } from "@backend/CommonBackend";
import { getUserData, UserData } from "@backend/UserBackend";
import { LightGreyButton, PinkButton } from "@components/buttons/BasicButton";
import { useAppStore } from "../../state";
import { defaultBackgroundColor, grey, pink } from "../../Consts";
import mainStyles from "@styles/MainStyles";
import userStyles from "@styles/UserStyles";
import textStyles from "@styles/TextStyles";
import containerStyles from "@styles/ContainerStyles";

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
              <Image style={userStyles.avatarImage} source={{ uri: avatar }} />
              <TouchableOpacity
                onPress={pickImage}
                style={userStyles.cameraIconButton}
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
          <Text style={textStyles.grey35weight700}>{username}</Text>
          <Text style={textStyles.grey23}>{score} points</Text>
          <View style={userStyles.barContainer}>
            <Text style={textStyles.grey20Weight800}>LEVEL {level}</Text>
            <View style={containerStyles.pinkThinLine} />
            <ProgressBar
              progress={score / (points_to_next_level + score)}
              width={screenWidth * 0.9}
              height={20}
              color={pink}
              unfilledColor={defaultBackgroundColor}
              borderWidth={0}
              borderColor={pink}
              borderRadius={2}
              animationType="timing"
            />
            <View style={containerStyles.pinkThinLine} />
            <Text style={textStyles.grey}>
              {points_to_next_level} points to next level
            </Text>
          </View>
        </View>
        <View style={userStyles.buttonsContainer}>
          <TouchableOpacity
            style={userStyles.profileLlamaContainer}
            onPress={() => navigation.navigate("Llama")}
          >
            <View style={userStyles.llamaTextContainer}>
              <Text style={textStyles.grey35weight700}>Your Llama</Text>
            </View>
            <View style={userStyles.llama}>
              <Image
                source={require("@assets/llama/llama.png")}
                style={containerStyles.width100height100}
              />
            </View>
          </TouchableOpacity>
          <LightGreyButton
            buttonText={"Games history"}
            onPress={() => console.log("games history")}
            width={"100%"}
            height={"15%"}
          />
          <PinkButton
            buttonText={"Settings"}
            onPress={() => console.log("settings")}
            width={"100%"}
            height={"15%"}
          />
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
