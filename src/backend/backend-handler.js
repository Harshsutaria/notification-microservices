const backendProcessor = require("./backend-processor");
const validatePushNotificationPayload = require("../notification/notification-validator");
const logger = require("../../utils/logger");

const backedHandler = {};

backedHandler.pushNotification = async function (packet) {
  logger.info(
    `inside backend handler process with ${JSON.stringify(
      packet.notificationType
    )}`
  );
  let res;
  try {
    const validationResult = validatePushNotificationPayload(packet);
    if (!validationResult.status) {
      logger.error("INVALID REQUEST PAYLOAD");
      throw new Error(validationResult.message);
    }
    res = await backendProcessor.process(packet);
  } catch (error) {
    logger.error(`getting processing sqs payload ${error}`);
    throw new Error(error);
  }

  return res;
};

module.exports = backedHandler;
