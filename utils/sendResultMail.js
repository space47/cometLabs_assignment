const sendEmail = require("./sendEmail");

const sendResultMail = async ({
  name,
  email,
  questionTitle,
  result,
}) => {
  console.log('came to function')
  const message = `<p>Result to Question ${questionTitle} is ${result}</p>`;
  
  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${name}</h4>
          ${message}`,
  });
};

module.exports = sendResultMail;
