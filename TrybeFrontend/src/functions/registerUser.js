import getEnvVars from "../../environment";
const { BACKEND_URL } = getEnvVars();
import loginUser from "./loginUser";
import connectSupporter from "./connectSupporter";
import { createAlert } from "./createAlert";

const registerUser = async (email, username, password) => {
  const url = `${BACKEND_URL}/auth/users/`;
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
  } else if (data.username) {
    createAlert("Registration Failed", data.username[0]);
  } else if (data.password) {
    createAlert("Registration Failed", data.password[0]);
  }
};

export default registerUser;
