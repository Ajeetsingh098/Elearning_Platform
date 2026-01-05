
const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
   
    try {
        const { sectionName, courseId } = req.body;
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties: sectionName and courseId are required"
            });
        }

        // 1. Create the new section
        const newSection = await Section.create({ sectionName });


        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections",
                }
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            data: updatedCourseDetails,
        });

    } catch (error) {
        console.error("CRASH IN ADD SECTION:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to create section, please try again",
            error: error.message,
        });
    }
};




exports.updateSection = async (req, res) => {
    try {

        const { sectionName, sectionId } = req.body;
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            });
        }

        const section = await Section.findByIdAndUpdate(sectionId,
            { sectionName }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Section updated Successfully",
            data: section
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,

        });
    }
};




exports.deleteSection = async (req, res) => {
    try {

        const { sectionId, courseId } = req.body;


        await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionId },
        });


        await Section.findByIdAndDelete(sectionId);

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: { path: "subSections" }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted",
            data: updatedCourse
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting section",
            error: error.message,
        });
    }
};