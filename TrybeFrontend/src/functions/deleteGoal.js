import getEnvVars from "../../environment";
const { BACKEND_URL } = getEnvVars();

async function deleteGoal(token, id) {
  const url = `${BACKEND_URL}/goals/${id}/`;

  const response = fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  // console.log("do we even hit here?");
  return { id: id };
}

export default deleteGoal;
