
const User = require("../models/User");
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt");
const crypto=require("crypto")
const passwordResetTemplate = require("../Mail_templates/passwordUpdate");


exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "your email is not registerd"
            });
        }
        const token = crypto.randomUUID();

        

        const updatedDetails = await User.findOneAndUpdate({ email: email },
             { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 }, { new: true })

        const url = `http://localhost:5173/update-password/${token}`;

        const htmlBody = passwordResetTemplate(url);

        await mailSender(email,
            "Password Rest Link",
              htmlBody,
            
        )

        return res.status(201).json({
            success: true,
            message: "Email sent succesfully,pleae reset your password",
            updatedDetails
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending mail for reset password."
        });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;
        if (password !== confirmPassword) {
            return res.status(500).json({
                success: false,
                message: "password not matching"
            });
        }
        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "token is invalid"
            });
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "token is expired"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({ token: token },
            { password: hashPassword },
            { new: true },
        );

        return res.status(200).json({
            success: true,
            message: "password updated succesfully"
        });

    } catch (error) {
         console.log(error);
         return res.status(500).json({
            success: false,
            message: "Something went wrong while updating password"
        });
    }



};