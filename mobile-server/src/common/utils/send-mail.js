import nodemailer from 'nodemailer';
const fs = require('fs');
const path = require('path');
const templatePath = path.join(__dirname, '../../../public/mail/index.html');
let template = '';
fs.readFile(templatePath, (err, data) => {
  template = data.toString();
});

export async function sendMail({ receiver, subject, name, password }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  console.log(process.env.GMAIL_USER, process.env.GMAIL_PASS);
  const body = template.replace('{{name}}', name).replace('{{password}}', password);
  const mailContent = {
    from: process.env.GMAIL_USER,
    to: receiver,
    subject,
    html: body
  };
  const mail = await transporter.sendMail(mailContent);
  return mail;
}
