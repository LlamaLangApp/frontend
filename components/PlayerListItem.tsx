import { useMemo } from "react";
import { View, Text, Image } from "react-native";
import { grey } from "../Consts";

export type PlaceItem = {
  username: string;
  score: number;
  place: number;
};

export default ({ username, place, score }: PlaceItem) => {
  const placeElem = useMemo(() => {
    if (place == 1) {
      return (
        <Image
          source={require("../assets/scoreboard/medal-1.png")}
          style={{ width: "70%", height: "70%" }}
        />
      );
    } else if (place == 2) {
      return (
        <Image
          source={require("../assets/scoreboard/medal-2.png")}
          style={{ width: "70%", height: "70%" }}
        />
      );
    } else if (place == 3) {
      return (
        <Image
          source={require("../assets/scoreboard/medal-3.png")}
          style={{ width: "70%", height: "70%" }}
        />
      );
    } else {
      return <Text style={{ fontSize: 25, color: grey }}>{place}</Text>;
    }
  }, [place]);

  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 70,
          width: 50 + 15 + 15,
          flexDirection: "row",
          marginVertical: "1.5%",
          marginRight: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            overflow: "hidden",
            margin: 3,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ede4e8",
          }}
        >
          {placeElem}
        </View>
        <Text style={{ fontSize: 20, color: grey }}>{username}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            borderRadius: 15,
            color: grey,
          }}
        >
          {score}
        </Text>
      </View>
    </View>
  );
};
