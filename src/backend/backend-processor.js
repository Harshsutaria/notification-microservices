const logger = require("../../utils/logger");
const email = require("../../utils/email");
const message = require("../../utils/message");
const serviceConstants = require("../constants/service-constants");

const backendProcessor = {};

backendProcessor.process = async function (payload) {
  logger.info(`BACKEND PROCESSOR WITH ${JSON.stringify(payload)}`);

  switch (payload.notificationType) {
    case serviceConstants.EMAIL_NOTIFICATION:
      return await backendProcessor.sendEmailNotification(payload);
    case serviceConstants.SMS_NOTIFICATION:
      return backendProcessor.sendMessageNotification(payload);
    default:
      return await backendProcessor.sendEmailNotification(payload);
  }
};

backendProcessor.sendEmailNotification = async function (packet) {
  logger.info(`inside sendEmailNotification with ${packet}`);
  let result;
  try {
    result = await email.sendMail(packet);
    logger.info(`sending email successfully`);
  } catch (error) {
    logger.info(`error occured!!!!!`);
    throw new Error(error);
  }

  return result;
};

backendProcessor.sendMessageNotification = async function (packet) {
  logger.info(`inside sendMessageNotification with ${packet}`);
  let result;
  const promiseArray = [];
  try {
    for (let phoneNumber of packet.targetAudience) {
      const messagePayload = {
        to: phoneNumber,
        message: packet.message,
      };
      promiseArray.push(message.sendMessage(messagePayload));
    }
  } catch (error) {
    logger.info(`error occured!!!!!`);
    throw new Error(error);
  }

  if (promiseArray.length > 0) {
    result = await Promise.allSettled(promiseArray);
  }

  logger.info(`messaging backend process successfully!!!`);
  return result;
};

module.exports = backendProcessor;
