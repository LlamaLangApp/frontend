import Constants from "expo-constants";

const { manifest } = Constants;
export const serverURL = manifest?.debuggerHost
  ?.split(`:`)
  ?.shift()
  ?.concat(`:8000`);

export async function callLogin(
  username: string,
  password: string
): Promise<{ auth_token: string }> {
  const response = await fetch(`http://${serverURL}/auth/token/login/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login returned not ok");
  }

  return await response.json();
}
