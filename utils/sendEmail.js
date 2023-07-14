const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");
const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport(nodemailerConfig);

  console.log('mailsend')
  // as async we can just return instead of using await
  return transporter.sendMail({
    from: '"Varnit Gupta" <varnitgupta47@gmail.com>',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
