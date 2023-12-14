export const defaultBackgroundColor = "#e5b3bb";
export const buttonDarkPink = "#b85971";
export const buttonLightPink = "#c77d90";
export const pink = "#e09cab";
export const purple = "#6C0BA9";
export const white = "#ffffff";
export const lightGrey = "#efefef";
export const grey = "#696368";

export type Games = "memory" | "race" | "falling words" | "finding words";

export const defaultUserData = {
  token: null,
  username: null,
  email: null,
  avatar: null,
  level: 0,
  score: 0,
  llama: 0,
  points_to_next_level: 0,
  current_week_points: null,
};

export const friendsActions = [
  {
    text: "Search for more users",
    icon: require("./assets/mag.png"),
    name: "Search",
    position: 1,
    buttonSize: 50,
    textStyle: { fontSize: 16 },
    color: defaultBackgroundColor,
    margin: 5,
  },
  {
    text: "Check your invitations",
    icon: require("./assets/envelope.png"),
    name: "Invitations",
    position: 2,
    buttonSize: 50,
    textStyle: { fontSize: 16 },
    color: pink,
    margin: 5,
  },
];
