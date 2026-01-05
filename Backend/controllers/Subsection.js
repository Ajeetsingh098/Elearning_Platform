
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const Course =require ("../models/Course")
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubsection = async (req, res) => {
    try {

        const { sectionId, title, description ,courseId} = req.body;


        const video = req.files ? req.files.videoFile : null;

        // 3. Validation
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "Missing properties: title, description, sectionId, and video are all required",
            });
        }


        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );


        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });


        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSections: subSectionDetails._id } },
            { new: true }
        )
        .populate("subSections")

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: { path: "subSections",strictPopulate: false }
            })
            .exec();

        
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            data: updatedCourse ,
        });

    } catch (error) {
        console.error("CREATE SUBSECTION ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error during SubSection creation",
            error: error.message,
        });
    }
};









