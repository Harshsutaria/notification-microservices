const express = require("express");
const app = express();
const dotenv = require("dotenv");
const notificationModuleRouter = require("./src/notification/notification-router");
// port at which application server will run.
const SERVER_PORT = 3000;

// configuring dot env file
dotenv.config();

// parse request body as JSON
app.use(express.json());

app.use("/notification", notificationModuleRouter);

app.listen(SERVER_PORT, () =>
  console.log("SERVER RUNNING AT PORT", SERVER_PORT)
);
