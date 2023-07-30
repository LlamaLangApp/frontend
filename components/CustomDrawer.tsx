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
import { serverURL } from "../backend";
import { useAppStore } from "../state";
import React from "react";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const setToken = useAppStore((store) => store.setToken);

  async function logoutHandler() {
    try {
      const response = await fetch(`http://${serverURL}/auth/token/logout/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response + " " + JSON.stringify(await response.json()));
      setToken(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#ffd5d5" }}
      >
        <ImageBackground
          source={require("../assets/background.jpg")}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View style={{ marginLeft: 10 }}>
            <Image
              source={require("../assets/user_llama.png")}
              style={{ marginTop: 50, width: 100, height: 180 }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              margin: 5,
            }}
          >
            <Text style={{ fontSize: 25 }}>John Doe</Text>
            <Text>200 Coins</Text>
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
          onPress={logoutHandler}
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
