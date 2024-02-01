const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_ID: process.env.MAIL_ID,
  
};
