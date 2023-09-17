export const defaultBackgroundColor = "#e5b3bb";
export const buttonDarkPink = "#b85971";
export const buttonLightPink = "#c77d90";
export const pink = "#e09cab";
export const purple = "#6C0BA9";
export const lightGrey = "#efefef";

export type GameType = {
  // Name for users
  name: string;
  backend_name: string;
  statistics: {
    name: string;
    // SQL aggregate type
    aggregate: "sum" | "avg" | "min" | "count";
    // Column name in backed table
    statistic: string;
    // How to sort
    order: "asc" | "desc";
    // How to display nicely, default is just convert to str
    display?: (stat: number) => string;
  }[];
};
export const games: GameType[] = [
  {
    name: "Memory",
    backend_name: "memory",
    statistics: [
      {
        name: "Games played",
        aggregate: "count",
        statistic: "_",
        order: "desc",
      },
      {
        name: "Accuracy",
        aggregate: "avg",
        statistic: "accuracy",
        order: "desc",
        display: (stat: number) => `${Math.round(stat * 100)}%`,
      },
    ],
  },
  { name: "Race", backend_name: "race", statistics: [] },
];
