const dotenv = require("dotenv");
dotenv.config();

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: null,
  region: process.env.AWS_REGION,
};

module.exports = awsConfig;
