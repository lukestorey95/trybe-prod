import getEnvVars from "../../environment";
const { BACKEND_URL } = getEnvVars();

async function inviteSupporter(token, email, id) {
  const url = `${BACKEND_URL}/supporters/add/`;
  const data = { supporter_email: email, goal_id: id };
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
  // console.log(responseData);
  return responseData;
}

export default inviteSupporter;
