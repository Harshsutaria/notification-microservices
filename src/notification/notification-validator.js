function validateRequestPayload(payload) {
  const validationResult = {
    status: true,
    message: "PAYLOAD VALIDATION PASSED SUCCESSFULLY",
  };

  if (!["EMAIL", "SMS"].includes(payload.notificationType)) {
    validationResult.status = false;
    validationResult.message = "PLEASE SEND VALID NOTIFICATION TYPE";
    return validationResult;
  }

  if (
    !Array.isArray(payload.targetAudience) ||
    payload.targetAudience.length === 0
  ) {
    validationResult.status = false;
    validationResult.message = "PLEASE ADD ATLEAST 1 TARGET AUDIENCE";
    return validationResult;
  }

  if (!payload.message.length) {
    validationResult.status = false;
    validationResult.message =
      "PLEASE ADD MESSAGE TO BE RECEIVED BY TARGET AUDIENCE";
    return validationResult;
  }

  return validationResult;
}

module.exports = validateRequestPayload;
