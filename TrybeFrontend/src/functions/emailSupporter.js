import getEnvVars from "../../environment";
const { SENDGRID_KEY, SENDGRID_EMAIL } = getEnvVars();

const emailSupporter = async (email, goal) => {
  const url = `https://api.sendgrid.com/v3/mail/send`;
  const data = {
    personalizations: [
      { to: [{ email: `${email}` }], subject: "Please join my Trybe" },
    ],
    content: [
      {
        type: "text/plain",
        value: `I am trying to ${goal.goal_description} and would love your support!`,
      },
    ],
    from: { email: `${SENDGRID_EMAIL}`, name: "Trybe" },
    reply_to: { email: `${SENDGRID_EMAIL}`, name: "Trybe" },
  };

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${SENDGRID_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // console.log("email sent", response.ok);
};

export default emailSupporter;
