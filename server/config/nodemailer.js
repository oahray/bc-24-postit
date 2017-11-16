const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: process.env.E_USER,
    pass: process.env.E_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * helperOptions
 * @summary - function to set mailing options for nodemailer
 * @param {string} to: recepient email address
 * @param {array} bcc: array of BCC recepient email addresses
 * @param {string} subject: subject of the email
 * @param {string} html: email content as html
 * @returns {object} helper options
 */
export const helperOptions = (to, bcc, subject, html) => ({
  from: '"Postit" <noreply@postit.com>',
  to,
  bcc,
  subject,
  html
});
