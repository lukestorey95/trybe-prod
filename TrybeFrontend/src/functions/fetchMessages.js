import getEnvVars from "../../environment";
const { BACKEND_URL } = getEnvVars();

const fetchMessages = async (token, id) => {
  // console.log(id);
  const url = `${BACKEND_URL}/goals/${id}/messages/`;
  // console.log(url);
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchMessages;
