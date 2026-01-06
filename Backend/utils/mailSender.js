
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
 service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  debug: true,
  logger: true,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false
  }
});

const mailSender = async (email, subject, htmlBody) => {
  try {
    console.log(`Attempting to send email to: ${email}`);

    let info = await transporter.sendMail({
      from: `"ATpoint" <${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlBody,
    });


    return info;
  } catch (error) {
    console.error("Mail Error in mailSender:", error.message);
    return null;
  }
};

module.exports = mailSender;




// const nodemailer = require("nodemailer");



// const mailSender = async (email, subject, htmlBody) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port:465,
//       secure: true,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       pool: true,
//      socketTimeout: 20000,
//   connectionTimeout: 20000,
//     });


//     console.log("Attempting to connect to SMTP...");

//     let info = await transporter.sendMail({
//       from: process.env.MAIL_USER,
//       to: `${email}`,
//       subject: subject,
//       html: htmlBody,
//     });
//      console.log("SMTP Response received!");
//     console.log("Email sent:");
//     return info;

//   } catch (error) {
//     console.log("Mail Error:", error);
//     return error;
//   }
// };

// module.exports = mailSender;
