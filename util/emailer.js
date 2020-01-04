const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

exports.transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);
