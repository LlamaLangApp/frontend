import { useMemo } from "react";
import { View, Text, Image } from "react-native";
import { buttonLightPink, pink } from "../Consts";

const imageStyle = {
  width: 50,
  height: 50,
  margin: 15,
  backgroundColor: buttonLightPink,
};

export default ({ username, place }: { username: string; place: number }) => {
  const placeElem = useMemo(() => {
    if (place == 1) {
      return (
        <Image source={require("../assets/medal-1.png")} style={imageStyle} />
      );
    } else if (place == 2) {
      return (
        <Image source={require("../assets/medal-2.png")} style={imageStyle} />
      );
    } else if (place == 3) {
      return (
        <Image source={require("../assets/medal-3.png")} style={imageStyle} />
      );
    } else {
      return <Text style={{ fontSize: 45, color: "white" }}>{place}</Text>;
    }
  }, [place]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        backgroundColor: pink,
        borderRadius: 15,
        height: 70,
      }}
    >
      <View
        style={{
          backgroundColor: buttonLightPink,
          flexDirection: "column",
          borderRadius: 15,
          height: 70,
          width: 50 + 15 + 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {placeElem}
      </View>
      <Text style={{ fontSize: 30, padding: 15, color: "white" }}>
        {username}
      </Text>
    </View>
  );
};
