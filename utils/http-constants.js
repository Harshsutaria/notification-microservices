const HTTPConst = {
  info: {
    CONTINUE: 100,
    SWITCHING_PROTOCOL: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,
  },

  success: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
  },

  serverError: {
    INTERNAL_SERVER: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
  },
};

const buildResponse = function (code, data = {}, info = "", res) {
  if (res) {
    res.status(code);
  }
  return { code, data, info };
};

const buildError = function (
  code = HTTPConst.serverError.INTERNAL_SERVER,
  errorMsg = "",
  info = ""
) {
  return {
    code,
    error: errorMsg,
    info,
  };
};

module.exports = { HTTPConst, buildResponse, buildError };
