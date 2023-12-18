import { useMemo } from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { grey } from "../Consts";

const playerPlaceImages: Record<1 | 2 | 3, ImageSourcePropType> = {
  1: require("../assets/scoreboard/medal-1.png"),
  2: require("../assets/scoreboard/medal-2.png"),
  3: require("../assets/scoreboard/medal-3.png"),
};

export type PlaceItem = {
  username: string;
  score: number;
  place: number;
};

export default ({ username, place, score }: PlaceItem) => {
  const placeElement = useMemo(() => {
    if (place === 1 || place === 2 || place === 3) {
      return (
        <Image
          source={playerPlaceImages[place]}
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
          {placeElement}
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
