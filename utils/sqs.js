const AWS = require("aws-sdk");
const awsConfig = require("./config");
const dotenv = require("dotenv");
dotenv.config();
const logger = require("./logger");

const sqs = {};

sqs.connect = function () {
  // updating the AWS config to access the role
  AWS.config.update(awsConfig);

  // Creating client for AWS SQS
  const sqsClient = new AWS.SQS({ apiVersion: "2012-11-05" });
  logger.info(`SQS CLIENT CREATED SUCCESSFULLY`);

  return sqsClient;
};

sqs.sendPacketToBacked = async function (queueName, body) {
  logger.info(
    `INSIDE SENDING MESSAGE USING SQS WITH ${queueName} , ${JSON.stringify(
      body
    )}`
  );

  // setting initial packet sending status to false
  let status = false;
  // creating sqs client
  const sqsClient = sqs.connect();
  const sqsQueueURL = `${process.env.AWS_SQS_QUEUE_URL}/${queueName}`;
  const messageBody = JSON.stringify(body);
  let data;

  // Sending packet to backed using SQS queue.
  try {
    data = await sqsClient
      .sendMessage({
        QueueUrl: sqsQueueURL,
        MessageBody: messageBody,
      })
      .promise();
    status = true;
    logger.info(`SENDED PACKET TO BACKEND IS SUCCESSFULLY`);
  } catch (error) {
    logger.error(`SENDED PACKET TO BACKEND FAILED ${error}`);
    throw new Error(error);
  }

  logger.info(`DATA IS ${JSON.stringify(data)}`);
  return status;
};

module.exports = sqs;
