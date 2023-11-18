import Constants from "expo-constants";

const { expoConfig } = Constants;

let serverURL = expoConfig?.hostUri?.split(`:`)?.shift()?.concat(`:8000`);

function setServerURL(newURL: string) {
  serverURL = newURL;
}

export { serverURL, setServerURL };
