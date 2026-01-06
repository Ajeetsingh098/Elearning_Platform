const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailVerificationTemplate = require("../Mail_templates/emailVerification");

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,


  },
  otp: {
    type: String,
    required: true,

  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,

  }

});

//for sending mail//
async function sendVerificationEmail(email, otp) {
  try {
    const htmlBody = emailVerificationTemplate(otp);

    const mailResponse = await mailSender(
      email,
      "Email Verification - OTP",
      htmlBody
    );

    // console.log("Email sent successfully", mailResponse.response);
    if (mailResponse) {
      console.log("Email sent successfully", mailResponse.messageId || "Sent");
    }
  } catch (error) {
    console.log("error occured during sending mail", error)
  }
}


OtpSchema.pre("save", async function () {
  console.log("New document saved to database");

  if (this.isNew) {
    sendVerificationEmail(this.email, this.otp);
  }
  // next();
});


module.exports = mongoose.model("Otp", OtpSchema)