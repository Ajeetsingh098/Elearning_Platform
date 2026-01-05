

const Profile = require("../models/Profile");
const User = require("../models/User");

const cloudinary = require("../config/cloudinary");

exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, about, contactNumber, gender } = req.body;
        const id = req.user.id;
        const { image } = req.body;

        // console.log("REQ BODY:", req.body);
        // console.log("USER ID:", req.user.id);

        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (firstName !== undefined) userDetails.firstName = firstName;
        if (lastName !== undefined) userDetails.lastName = lastName;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "profile_images",
                transformation: [{ width: 300, height: 300, crop: "fill" }],
            });
            userDetails.image = result.secure_url;
        }

        if (image) {
            userDetails.image = image;
        }
        await userDetails.save();

        const profileDetails = await Profile.findById(userDetails.additionalDetails);
        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile details not found",
            });
        }


        if (dateOfBirth !== undefined) profileDetails.dateOfBirth = dateOfBirth;
        if (about !== undefined) profileDetails.about = about;
        if (gender !== undefined) profileDetails.gender = gender;
        if (contactNumber !== undefined) profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        // console.log("PROFILE UPDATED:", profileDetails);
        // console.log("USER UPDATED:", userDetails);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });
    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        if (userDetails.additionalDetails) {
            await Profile.findByIdAndDelete(userDetails.additionalDetails);
        }


        await User.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
        console.error("DELETE ACCOUNT ERROR:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


exports.getAlluserDetails = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const userDetails = await User.findById(req.user.id).populate("additionalDetails").exec();

        if (!userDetails) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            userDetails
        });

    } catch (error) {
        console.error("GET USER DETAILS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({ _id: userId })
            .populate("courses").exec()
       
            if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `could not find user with id: ${userDetails}`
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


