const nodemailer = require('nodemailer');
const receiveAuthCode = require('./emailTemplates/receiveAuthCode');
const SEEDAO_MAILER_NAME = 'SeeDAO';

const CODE_MAX = 999998;
const CODE_MIN = 100001;

const transporter = nodemailer.createTransport({
  host: 'mail.gandi.net',
  port: 465,
  auth: {
    user: process.env.SEEDAO_MAILER_ACCOUNT,
    pass: process.env.SEEDAO_MAILER_PASSWORD,
  },
});

module.exports = {
  randomCode: () => {
    return Math.round(Math.random() * (CODE_MAX - CODE_MIN + 1) + CODE_MIN);
  },

  sendEmail: (email, code) => {
    var mailOptions = {
      from: `"${SEEDAO_MAILER_NAME}" <${process.env.SEEDAO_MAILER_ACCOUNT}>`,
      to: email,
      subject: 'SeeDAO 验证码',
      text: `SeeDAO 验证码: ${code}`,
      html: receiveAuthCode.getHtml(`${code}`),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log('Email sent: ' + info.response);
        return info.response;
      }
    });
  },
};
