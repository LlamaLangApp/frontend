import { Text, TouchableOpacity, View, Image } from "react-native";
import { getUserData, UserData } from "../backend/UserBackend";
import { useAppStore } from "../state";
import { useState } from "react";

function FriendsScreen() {
  const token = useAppStore.getState().token;
  const [userData, setUserData] = useState<UserData>({});
  console.log(userData);
  return (
    <View>
      <Text>Friends</Text>
      <TouchableOpacity
        onPress={() =>
          getUserData(token).then((response) => {
            if (response.type === "success") {
              setUserData(response.result);
            }
          })
        }
      >
        <Text>siema</Text>
        <Text>{userData ? userData.email : ""}</Text>
      </TouchableOpacity>
      <View>
        <Image
          source={{ uri: userData.avatar }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </View>
  );
}

export default FriendsScreen;
