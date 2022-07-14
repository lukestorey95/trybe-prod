import getEnvVars from "../../environment";
const { BACKEND_URL } = getEnvVars();

async function postMessage(token, id, text) {
  // console.log("did we reach function");
  const url = `${BACKEND_URL}/goals/${id}/messages/`;
  const data = { message: text };
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

export default postMessage;
