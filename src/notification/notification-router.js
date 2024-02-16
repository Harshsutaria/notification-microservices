const express = require("express");
const app = express.Router();
const logger = require("../../utils/logger");

app.post("/push", (req, res) => {
  logger.info(`inside push notification service with ${JSON.stringify}`);
  res.send("Holla from notification service!!!!");
});

module.exports = app;
