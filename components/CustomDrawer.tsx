import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAppStore } from "../state";
import { logoutHandler } from "../backend/AuthBackend";
import React from "react";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { setUserData, username, avatar, level, token } = useAppStore(
    (store) => ({
      setUserData: store.setUserData,
      username: store.username,
      avatar: store.avatar,
      level: store.level,
      token: store.token,
    })
  );

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#ffd5d5" }}
      >
        <ImageBackground
          source={require("../assets/background.jpg")}
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: "6%",
              marginLeft: "6%",
              marginRight: "1%",
              width: "30%",
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                overflow: "hidden",
              }}
            >
              {avatar ? (
                <Image
                  source={{ uri: avatar }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <View />
              )}
            </View>
            <View
              style={{
                marginLeft: 20,
                justifyContent: "center",
                alignItems: "center",
                marginRight: -30,
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                }}
              >
                {username}
              </Text>
              <Text>Level: {level}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("Told a friend");
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="share-alt" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 15 }}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logoutHandler(token, setUserData)}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="sign-out" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 15 }}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
