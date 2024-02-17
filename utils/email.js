const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const logger = require("../utils/logger");
dotenv.config();

/**
 * container for sending email notification
 */
const emailNotification = {};

emailNotification.createClient = function () {
  // creating a transporter object
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  logger.info(`EMAIL CLIENT SUCCESSFULLY CREATED`);
  return transporter;
};

emailNotification.sendMail = async function (emailPayload) {
  let email;
  try {
    // create client for setting email transport.
    const client = emailNotification.createClient();
    email = await client.sendMail(emailPayload);
    logger.info(`email obj is ${JSON.stringify(email)}`);
    logger.info(`EMAIL SUCCESSFULLY SENDED TO ${emailPayload.to}`);
  } catch (error) {
    logger.error(`GETTING ERROR WHILE SENDING EMAIL ${error}`);
    throw new Error(Error);
  }

  return email;
};

module.exports = emailNotification;

//  Test payload
// emailNotification.sendMail({
//   from: "harshsutaria25@gmail.com", // Sender's email address
//   to: "harshsutaria25@gmail.com", // Recipient's email address
//   subject: "Test Email",
//   text: "Papa meri jaan!!!!!!!!!",
// });
