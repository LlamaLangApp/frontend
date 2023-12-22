import { GamesStackParamList } from "./navgation/GamesStack";

export const defaultBackgroundColor = "#fffcff";
export const authBackgroundColor = "#e5b3bb";
export const buttonDarkPink = "#b85971";
export const buttonLightPink = "#c77d90";
export const pink = "#e09cab";
export const purple = "#6C0BA9";
export const white = "#ffffff";
export const lightGrey = "#efefef";
export const grey = "#696368";

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

export type Games = "memory" | "race" | "falling words" | "finding words";
export type GamesStatistics =
  | "all_games"
  | "memory"
  | "falling_words"
  | "race"
  | "finding_words";

export type GameType = "SinglePlayer" | "MultiPlayer";
export type GameItem = {
  id: string;
  name: Games;
  type: GameType;
  screenName: keyof GamesStackParamList;
};

export const games: GameItem[] = [
  { id: "1", name: "memory", type: "SinglePlayer", screenName: "Memory" },
  { id: "2", name: "race", type: "MultiPlayer", screenName: "Race" },
  {
    id: "3",
    name: "falling words",
    type: "SinglePlayer",
    screenName: "FallingWords",
  },
  {
    id: "4",
    name: "finding words",
    type: "MultiPlayer",
    screenName: "FindingWords",
  },
];

export const friendsActions = [
  {
    text: "Search for more users",
    icon: require("./assets/icons/mag.png"),
    name: "Search",
    position: 1,
    buttonSize: 50,
    textStyle: { fontSize: 16 },
    color: pink,
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
