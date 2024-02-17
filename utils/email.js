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

emailNotification.createEmailPayload = function (emailPayload) {
  return {
    from: process.env.EMAIL_ADDRESS, // Sender's email address
    to: emailPayload.targetAudience.join(","), // Recipient's email address
    subject: "Notification from notification service",
    text: emailPayload.message,
  };
};

emailNotification.sendMail = async function (payload) {
  let email;
  try {
    // create client for setting email transport.
    const client = emailNotification.createClient();
    // creating email payload
    const emailPayload = emailNotification.createEmailPayload(payload);
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
