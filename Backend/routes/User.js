

const express = require("express");
const router = express.Router();


const {
    login,
    signUp,
    sendOtp,
    changePassword,
} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middlewares/authMiddleware")


router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOtp);
router.post("/changepassword",auth,changePassword);



router.post("/resetpasswordtoken", resetPasswordToken);
router.post("/resetpassword", resetPassword)





module.exports = router;