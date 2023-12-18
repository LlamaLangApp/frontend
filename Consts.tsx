export const defaultBackgroundColor = "#fffcff";
export const authBackgroundColor = "#e5b3bb";
export const buttonDarkPink = "#b85971";
export const buttonLightPink = "#c77d90";
export const pink = "#e09cab";
export const purple = "#6C0BA9";
export const white = "#ffffff";
export const lightGrey = "#efefef";
export const grey = "#696368";

export type Games = "memory" | "race" | "falling words" | "finding words";

export const defaultUserData = {
  id: 0,
  token: null,
  username: null,
  email: null,
  avatar: null,
  level: 0,
  score: 0,
  llama: 0,
  current_week_points: null,
  points_to_next_level: 0,
};

export type GamesStatistics =
  | "all_games"
  | "memory"
  | "falling_words"
  | "race"
  | "finding_words";

export const friendsActions = [
  {
    text: "Search for more users",
    icon: require("./assets/icons/mag.png"),
    name: "Search",
    position: 1,
    buttonSize: 50,
    textStyle: { fontSize: 16 },
    color: defaultBackgroundColor,
    margin: 5,
  },
  {
    text: "Check your invitations",
    icon: require("./assets/icons/envelope.png"),
    name: "Invitations",
    position: 2,
    buttonSize: 50,
    textStyle: { fontSize: 16 },
    color: pink,
    margin: 5,
  },
];
