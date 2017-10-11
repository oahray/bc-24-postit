const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'oahray@gmail.com',
    pass: process.env.E_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const helperOptions = (to, bcc, subject, html) => ({
  from: '"Postit" <noreply@postit.com>',
  to,
  bcc,
  subject,
  html
});
