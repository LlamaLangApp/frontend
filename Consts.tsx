export const defaultBackgroundColor = "#e5b3bb";
export const buttonDarkPink = "#b85971";
export const buttonLightPink = "#c77d90";
export const pink = "#e09cab";
export const purple = "#6C0BA9";
export const lightGrey = "#efefef";

export type GameType = { name: string; backend_name: string };
export const games: GameType[] = [
  { name: "Memory", backend_name: "memory" },
  { name: "Race", backend_name: "race" },
];
