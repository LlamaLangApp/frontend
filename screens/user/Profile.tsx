import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "../../navgation/UserStack";
import mainStyles from "../../styles/MainStyles";
import { useAppStore } from "../../state";
import { Bar as ProgressBar } from "react-native-progress";
import { FontAwesome5 } from "@expo/vector-icons";
import { buttonDarkPink, buttonLightPink, lightGrey, pink } from "../../Consts";
import React from "react";

type Props = NativeStackScreenProps<UserStackParamList, "User">;

function ProfileScreen({}: Props) {
  const { username, avatar, level, score } = useAppStore((store) => ({
    username: store.username,
    avatar: store.avatar ? store.avatar : "",
    level: store.level,
    score: store.score,
  }));
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={mainStyles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 2,
          top: 40,
          right: 35,
        }}
        // onPress={pickImage}
      >
        <FontAwesome5 name="edit" size={30} color={"#696368"} />
      </TouchableOpacity>
      <View
        style={{
          flex: 5,
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            flex: 2.7,
            width: "90%",
            height: "100%",
            marginHorizontal: "5%",
            // marginVertical: "3%",
            marginTop: "5%",
            marginBottom: "3%",
            borderRadius: 15,
            borderWidth: 3,
            borderColor: pink,
            backgroundColor: lightGrey,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flex: 1.7,
              width: "100%",
              height: "100%",
              // alignItems: "center",
            }}
          >
            <View
              style={{
                margin: "5%",
                width: "60%",
                height: "90%",
                borderRadius: 50,
                borderColor: buttonDarkPink,
                borderWidth: 4,
                overflow: "hidden",
              }}
            >
              {avatar && (
                <Image
                  source={{ uri: avatar }}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </View>
          </View>
          <View
            style={{ flex: 1, marginHorizontal: "6%", marginVertical: "2%" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <View style={{ marginBottom: "2%" }}>
                  <Text style={{ color: "#696368", fontSize: 35 }}>
                    {username}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#696368", fontSize: 23 }}>
                    {score} points
                  </Text>
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#696368", fontSize: 60 }}>{level}</Text>
                <Text
                  style={{ color: "#696368", fontSize: 15, marginTop: -14 }}
                >
                  Level
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
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
        <View
          style={{
            flex: 1.3,
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "100%",
              borderRadius: 15,
              borderWidth: 3,
              borderColor: pink,
              backgroundColor: lightGrey,
              marginHorizontal: "5%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "45%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ marginLeft: "20%", fontSize: 35, color: "#696368" }}
              >
                Your Llama
              </Text>
            </View>
            <View style={{ width: "55%", height: "100%" }}>
              <Image
                source={require("../../assets/llama_without_background.png")}
                style={{
                  width: "110%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            width: "100%",
            marginHorizontal: "5%",
            marginTop: "3%",
            marginBottom: "5%",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              height: "40%",
              borderColor: pink,
              backgroundColor: lightGrey,
              borderWidth: 3,
              borderRadius: 15,
            }}
          >
            <Text style={{ padding: 10, fontSize: 19, color: "#696368" }}>
              Statistics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              height: "40%",
              borderColor: lightGrey,
              backgroundColor: pink,
              borderWidth: 3,
              borderRadius: 15,
            }}
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
