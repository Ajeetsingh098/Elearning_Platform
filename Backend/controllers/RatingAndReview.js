



const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// --- CREATE RATING AND REVIEW ---
exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
    
        const { rating, review, courseId } = req.body;

        
        const courseDetails = await Course.findById(courseId);

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

       
        const isEnrolled = courseDetails.studentsEnrolled?.includes(userId);
        const isInstructor = courseDetails.instructor.toString() === userId;

        if (!isEnrolled && !isInstructor) {
            return res.status(401).json({
                success: false,
                message: "Only enrolled students or the instructor of this course can add a review.",
            });
        }

       
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "You have already submitted a review for this course.",
            });
        }

        // 4. Create the Rating and Review
        const ratingReview = await RatingAndReview.create({
            rating: Number(rating),
            review,
            course: courseId,
            user: userId,
        });

       
        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Rating and Review submitted successfully",
            ratingReview,
        });

    } catch (error) {
        console.error("CREATE RATING ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating review",
            error: error.message,
        });
    }
};

// --- GET AVERAGE RATING ---
exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

       
        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: "No ratings given yet",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error calculating average rating",
            error: error.message,
        });
    }
};

// --- GET ALL RATINGS & REVIEWS ---
exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching all reviews",
            error: error.message,
        });
    }
};















// const RatingAndReview = require("../models/RatingAndReview");
// const Course = require("../models/Course");
// const { default: mongoose } = require("mongoose");


// exports.createRating = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const { rating, review, courseId } = req.body;

//         const courseDetails = await Course.findOne(
//             {
//                 _id: courseId,
//                 stundentsEnrolled: { $elemMatch: { $eq: userId } },
//             }
//         );

//         if (!courseDetails) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Student is not enrolled in the course"
//             })
//         }

//         const alreadyReviewed = await RatingAndReview.findOne({
//             user: userId,
//             course: courseId
//         });
//         if (alreadyReviewed) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Course is already reviewed by user"
//             })
//         }


//         const ratingReview = await RatingAndReview.create({
//             rating, review,
//             course: courseId,
//             user: userId
//         });
//         await Course.findByIdAndUpdate({ _id: courseId },
//             { $push: { ratingAndReviews: ratingReview._id } }, { new: true }
//         )

//         return res.status(200).json({
//             success: true,
//             message: "Rating and Reviews done successfully",
//             ratingReview
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "interval server error",
//             message: error.message
//         })
//     }
// };

// exports.getAverageRating = async (req, res) => {
//     try {

//         const courseId = req.body.courseId;

//         const result = await RatingAndReview.aggregate([
//             {
//                 $match: {
//                     course: new mongoose.Types.ObjectId(courseId),
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     getAverageRating: { $avg: "$rating" },
//                 }
//             }
//         ])

//         if (result.length > 0) {
//             return res.status(200).json({
//                 success: true,
//                 averageRating: result[0].averageRating,
//                 message: "average rating",

//             })
//         }

//         return res.status(200).json({
//             success: true,
//             averageRating: 0,
//             message: "average rating is 0, no rarting given till now",

//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "interval server error",
//             message: error.message
//         })
//     }
// };


// exports.getAllRating = async (req, res) => {
//     try {
//         const allReviews = (await RatingAndReview.find({}))
//             .sort({ rating: "desc" })
//             .populate({
//                 path: "user",
//                 select: "firstName lastName email image"
//             })
//             .populate({
//                 path: "course",
//                 select: "courseName"
//             }).exec();

//         return res.status(200).json({
//             success: true,
//             data: allReviews,
//             message: "All  reviews fetched successfully",

//         })

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Interval server error",
//             message: error.message
//         })
//     }
// }