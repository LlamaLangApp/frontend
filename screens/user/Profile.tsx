import { Image, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserStackParamList } from "../../navgation/UserStack";
import mainStyles from "../../styles/MainStyles";
import { useAppStore } from "../../state";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FontAwesome5 } from "@expo/vector-icons";
import { buttonDarkPink } from "../../Consts";
import { serverURL } from "../../backend/CommonBackend";

type Props = NativeStackScreenProps<UserStackParamList, "User">;

function ProfileScreen({}: Props) {
  const { setUserData, username, avatar, level, score, token } = useAppStore(
    (store) => ({
      setUserData: store.setUserData,
      username: store.username,
      avatar: store.avatar ? store.avatar : "",
      level: store.level,
      score: store.score,
      token: store.token,
    })
  );
  const [image, setImage] = useState("");

  // console.log(avatar.slice(0, 50));

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      const formData = new FormData();
      fetch(result.assets[0].uri)
        .then((response) => response.blob())
        .then((blob) => {
          formData.append(`${username}`, blob, `${username}.jpg`);

          fetch(`http://${serverURL}/avatar-upload/`, {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: `Token ${token}`,
            },
          }).then((response) => {
            // Handle the response her
            console.log(`misia`);
            FileSystem.readAsStringAsync(result.assets[0].uri, {
              encoding: FileSystem.EncodingType.Base64,
            }).then((fileContent) =>
              setImage(`data:image/png;base64,${fileContent}`)
            );
          });
        });
    }
  };

  return (
    <View style={mainStyles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 2,
          top: 10,
          right: 10,
        }}
        onPress={() => console.log("sth")}
      >
        <FontAwesome5 name="edit" size={30} color={"white"} />
      </TouchableOpacity>
      <View style={{ flex: 5, width: "100%", height: "100%" }}>
        <View
          style={{
            flex: 2.5,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "90%",
              borderRadius: 100,
              borderColor: buttonDarkPink,
              borderWidth: 4,
              overflow: "hidden",
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
        </View>
        <View style={{ flex: 2.5 }}>
          <TouchableOpacity onPress={pickImage}>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
