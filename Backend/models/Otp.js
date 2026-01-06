const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailVerificationTemplate = require("../Mail_templates/emailVerification");

const OtpSchema = new mongoose.Schema({
  email: {

    type: String,
    required: true,
    unique: true

  },
  otp: {
    type: String,
    required: true,

  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,

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

    console.log("Email sent successfully", mailResponse.response);

  } catch (error) {
    console.log("error occured during sending mail", error)
    throw error;
  }
}


OtpSchema.pre("save", async function () {
  try {
    await sendVerificationEmail(this.email, this.otp);
  //  next();
  } catch (error) {
    console.log("Error sending email:", error);
   
  }
});


module.exports = mongoose.model("Otp", OtpSchema)