import getEnvVars from "../../environment";
const { BACKEND_URL } = getEnvVars();
import loginUser from "./loginUser";
import connectSupporter from "./connectSupporter";

const registerUser = async (email, username, password) => {
  const url = `${BACKEND_URL}/auth/users/`;
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const token = await loginUser(username, password);
      connectSupporter(token.auth_token, data.email, data.id);

      const combinedData = { ...data, ...token };
      return combinedData;
    }
    throw new Error("Request failed");
  } catch (error) {
    console.log(error);
  }
};

export default registerUser;
