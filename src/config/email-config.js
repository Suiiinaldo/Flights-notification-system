const nodemailer = require("nodemailer");
const { MAIL_ID, MAIL_PASS } = require("./server-config");

const mailSender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: MAIL_ID,
        pass: MAIL_PASS,
    }
})

module.exports = mailSender;