const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth

exports.auth = async (req, res, next) => {
    try {

        // const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        // if (!token) {
        //     return res.status(402).json({
        //         success: false,
        //         message: "token is missing"
        //     })
        // }
        // //verify token//
        // try {
        //     const decode = await jwt.verify(token, process.env.JWT_SECRET);
        //     console.log(decode);
        //     req.user = decode;
        // } catch (error) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "token is invalid"
        //     })
        // }

        // next();

        let token = req.cookies?.token || req.body?.token || req.header("Authorization");

        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token is missing"
                });
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while validating token"
        });
    }
}

//isStudent//

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(400).json({
                success: false,
                message: "this route is for student only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role not verified"
        });
    }
}

//isInstructor//

exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(400).json({
                success: false,
                message: "this route is for Instructor only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role not verified"
        });
    }
};

//isAdmin//

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(400).json({
                success: false,
                message: "this route is for Admin only"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role not verified"
        });
    }
};