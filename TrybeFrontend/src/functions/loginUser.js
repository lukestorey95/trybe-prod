import getEnvVars from "../../environment";
const { BACKEND_URL } = getEnvVars();
import { createAlert } from "./createAlert";

const loginUser = async (username, password) => {
  const response = await fetch(`${BACKEND_URL}/auth/token/login/`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const confirmation = await response.json();

  if (response.ok) {
    return confirmation;
  } else {
    createAlert("Login Failed", confirmation.non_field_errors[0]);
  }
};

export default loginUser;
