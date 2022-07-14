import getEnvVars from "../../environment";
const { BACKEND_URL } = getEnvVars();
import { createAlert } from "./createAlert";
import emailSupporter from "../functions/emailSupporter";

async function inviteSupporter(token, email, goal) {
  const url = `${BACKEND_URL}/supporters/add/`;
  const data = { supporter_email: email, goal_id: goal.id };
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (response.ok) {
    emailSupporter(email, goal);
    return responseData;
  } else {
    createAlert("Invite Failed", "You can only invite a supporter once");
  }
}

export default inviteSupporter;
