const {
  buildResponse,
  HTTPConst,
  buildError,
} = require("../../utils/http-constants");
const notificationService = require("./notification-service");
const logger = require("../../utils/logger");

/**
 * container for handler
 */
const notificationHandler = {};

/**
 * Send notification handler.
 */

notificationHandler.post = async function (req, res) {
  const { author, params, body } = getServiceArgs(req);
  let result;
  try {
    result = await notificationService.send(author, params, body);
    return res.json(
      buildResponse(
        HTTPConst.success.ACCEPTED,
        result,
        "TARGETING USERS PROCESS QUEUED"
      )
    );
  } catch (error) {
    logger.error(`GETTING ERROR WHILE SENDING NOTIFICATION HANDLER ${error}`);
    return res.json(
      buildError(
        HTTPConst.serverError.INTERNAL_SERVER,
        error,
        "TARGETING USERS PROCESS FAILED"
      )
    );
  }
};

function getServiceArgs(req) {
  if (!req.headers.userName || !req.header.password) {
    logger.info(`USERNAME AND PASSWORD ARE MANDATORY AUTH HEADERS`);
  }

  // Setting author, params , body from the request object
  const author = {
    userName: req.header.userName,
  };
  const params = { ...req.query, ...req.params };
  const body = req.body || {};

  return {
    author,
    params,
    body,
  };
}

module.exports = notificationHandler;
