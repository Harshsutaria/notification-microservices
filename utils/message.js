// Ref :- https://www.npmjs.com/package/twilio
const twilio = require("twilio");
const logger = require("./logger");

//configuring .env file to fetch env constants.
const dotenv = require("dotenv");
dotenv.config();

// fetching env variables form .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

/**
 * this container will hold the implementation for messages util.
 */
const messageImpl = {};

/**
 * Method implemented to send sms using twilio package.
 *
 * @param {string} payload.to  receiver of the message
 * @param {string} payload.from sender of the message
 * @param {string} payload.body  message to be sent
 *
 * @returns {string} message of the body
 */
messageImpl.sendMessage = async function (payload) {
  let message;
  // creating twilio client
  const twilioClient = twilio(accountSid, authToken, {
    autoRetry: true,
    maxRetries: 3,
  });

  // Trying to send a message to using twilio client
  try {
    message = await twilioClient.messages.create(payload);
    logger.info(`MESSAGE SUCCESSFULLY SENDED TO ${payload.to}`);
  } catch (error) {
    logger.error(`SENDING MESSAGE VIA TWILIO CLIENT FAILED ${error}`);
    throw new Error(error);
  }

  return message?.body;
};
