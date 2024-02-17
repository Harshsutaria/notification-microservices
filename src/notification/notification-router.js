const express = require("express");
const app = express.Router();
const notificationHandler = require("./notification-handler");
app.post("/push", notificationHandler.post);

module.exports = app;
