const logger = require("../../utils/logger");
const validateRequestPayload = require("./notification-validator");
const serviceConstants = require("../constants/service-constants");
const sqs = require("../../utils/sqs");

/**
 * Notifications service container
 */
const notificationService = {};

notificationService.send = async function (author, params, body) {
  logger.info(`INSIDE NOTIFICATION SERVICE WITH ${JSON.stringify(author)}`);

  // adding validation for request payload.
  const validateRequestPayloadResult = validateRequestPayload(body);
  if (!validateRequestPayloadResult.status) {
    logger.error(
      `INVALID REQUEST PAYLOAD ${validateRequestPayloadResult.message}`
    );
    throw new Error(validateRequestPayloadResult.message);
  }

  // Sending packet to backend using SQS queue
  const status = await sqs.sendPacketToBacked(
    serviceConstants.SQS_QUEUE_NAME,
    body
  );

  logger.info(`SENDING PACKET TO BACKEND ${JSON.stringify(status)}`);
  return status;
};
