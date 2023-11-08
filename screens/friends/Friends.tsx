import { Text, TouchableOpacity, View } from "react-native";
import mainStyles from "../../styles/MainStyles";
import { getUsersData } from "../../backend/FriendsBackend";
import { useAppStore } from "../../state";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../../navgation/FriendsStack";

type Props = NativeStackScreenProps<FriendsStackParamList, "List">;

function FriendsListScreen({ navigation }: Props) {
  const { token } = useAppStore((store) => ({
    token: store.token,
  }));
  const handler = () => {
    getUsersData(token).then((response) => {
      if (response.type === "success") {
        console.log("ok");
      }
    });
  };

  return (
    <View style={mainStyles.container}>
      <TouchableOpacity onPress={handler}>
        <Text>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "80%",
          marginTop: 40,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
        onPress={() => navigation.navigate("Search")}
      >
        <Text>Search Users</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FriendsListScreen;
