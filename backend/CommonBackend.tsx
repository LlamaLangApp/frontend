import Constants from "expo-constants";

const { expoConfig } = Constants;
export const serverURL = expoConfig?.hostUri
    ?.split(`:`)
    ?.shift()
    ?.concat(`:8000`);
