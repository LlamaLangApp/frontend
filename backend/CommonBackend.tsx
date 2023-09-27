import Constants from "expo-constants";

const { manifest } = Constants;
export const serverURL = manifest?.debuggerHost
  ?.split(`:`)
  ?.shift()
  ?.concat(`:8000`);
