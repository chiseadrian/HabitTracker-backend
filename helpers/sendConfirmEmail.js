const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  from: process.env.GMAIL_USER,
});


const sendConfirmEmail = async (uid, name, email) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ uid, name }, process.env.SECRET_JWT_EMAIL, {
      expiresIn: '1d',
    }, (err, emailToken) => {
      const url = `${process.env.HOST}/api/auth/confirmation/${emailToken}`;

      if (err) {
        console.log(err);
        reject('Error generating the token to send the confirmation email');
      }

      transporter.sendMail({
        to: email,
        subject: 'Confirm Email',
        html: `Please click <a href="${url}">here</a> to confirm your email.`,
      });

      resolve('Confirmation email sended');
    },
    );
  })
}


module.exports = {
  sendConfirmEmail
}
