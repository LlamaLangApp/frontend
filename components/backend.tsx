import Constants from "expo-constants";

const { manifest } = Constants;
const serverURL = manifest?.debuggerHost?.split(`:`)?.shift()?.concat(`:8000`);

export default serverURL;
