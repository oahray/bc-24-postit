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

export const templates = {
  recovery: (req, user) => `<div>
    <h2 style="color:brown">You requested a password reset. </h2>
    <p style="color:black">A request was made to reset your password. If you did not make this request, simply ignore this email and your password would <strong>not</strong> be changed. If you did make this request just click the link below: </p>
    <p>${req.protocol}://${req.headers.host}/resetpassword?t=${user.resetHash}</p>
    <p style="color:black">If the above URL does not work, try copying and pasting it into your browser. If you continue to experience problems please feel free to contact us.
    </p>
    <p style="color:black">Best regards, <br/> The Postit Team</div></p>`,

  notification: (message, group) =>
    `<div>
      <h4>${message.sender.toUpperCase()} says it's ${message.priority}.</h4> <p>You have received a new ${message.priority} message from <strong>${message.sender}</strong> in your group <strong>'${group.name}'</strong></p>
      <p>To reply ${message.sender}, please login to your account</p><br/>
      <p>The Postit team</p>
    </div>`
};
