const backedHandler = require("./backend-handler");
const logger = require("../../utils/logger");

handler = async (event) => {
  logger.info(
    `INSIDE BACKEND PROCESSOR ROUTER WITH ${JSON.stringify(
      event.Records[0].messageId
    )}`
  );
  let response = {};
  for (let record of event.Records) {
    const packet = JSON.parse(record.body);
    response = await backedHandler.pushNotification(packet);
  }
  return response;
};

// const event = {
//   Records: [
//     {
//       messageId: "56136fac-f010-42db-9051-f1e8adf147f4",
//       receiptHandle:
//         "AQEBn700/PlQLPmgjyLkhyVSi68ASeT2B807CxxYhgHoXFDv9GBPZZDvg+qkfxYj5Pz39scrO5SYSyhUAHfyqy9VgYCC0OL1wF8NXGm3yV3tPyIbQpc8RiCWGtvHeKRzwzy8YJYl9Pb2UY4lP9TgMmfubP0LXVCXWW6PetI7EEow00kYiPfDdVCX4m/KeTw9hV+qDKJ0nIucjEG6fPjvo99W/1lPC+r1hWevMOPVcbIVTr8VQMHOp30iZ+qN1Wr1vUkRSHglIr/LAy8xJEl0RanNOMBfu9IePDqPsQ9IlwNgqhOeomrj7mF/TyEkHuRJ1wbM4iiZ3c2ti5PjXA84j0Uf0H781oSWq+zs+hpdqUky64wSvfVjfSYvx4XrJkR9Om5R1lSWVEgZhYuwY2wFce1DtA==",
//       body: JSON.stringify({
//         notificationType: "SMS",
//         targetAudience: ["+919699482325", "+919699482325", "+919699482325"],
//         message: "Message notification successfully!!!!",
//       }),
//       attributes: {
//         ApproximateReceiveCount: "1",
//         SentTimestamp: "1708168941737",
//         SenderId: "AIDAYO4KW7LZRTJZ3X3FG",
//         ApproximateFirstReceiveTimestamp: "1708168941743",
//       },
//       messageAttributes: {},
//       md5OfBody: "44a56ab2b00f9b90e3eff36cffa16a12",
//       eventSource: "aws:sqs",
//       eventSourceARN:
//         "arn:aws:sqs:ap-south-1:581722110707:notification-service",
//       awsRegion: "ap-south-1",
//     },
//   ],
// };

// handler(event);

module.exports = handler;
