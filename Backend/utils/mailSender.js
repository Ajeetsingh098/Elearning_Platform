

const nodemailer = require("nodemailer");



const mailSender = async (email, subject, htmlBody) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port:465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      pool: true,
      maxConnections: 1,
      rateLimit: 1
    });


    console.log("Attempting to connect to SMTP...");

    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: `${email}`,
      subject: subject,
      html: htmlBody,
    });

    console.log("Email sent:");
    return info;

  } catch (error) {
    console.log("Mail Error:", error);
    return error;
  }
};

module.exports = mailSender;
