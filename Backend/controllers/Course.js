const Course = require("../models/Course");
const Tag = require("../models/Tags");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/Subsection");
const CourseProgress = require("../models/CourseProgress")





exports.createCourse = async (req, res) => {
    try {

       
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            status,
            instructions,
        } = req.body;

       
        const thumbnail = req.files ? req.files.thumbnailImage : null;

        // 4. Validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required, including the thumbnail image",
            });
        }

        // 5. Instructor Validation
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
            return res.status(403).json({
                success: false,
                message: "Only instructors can create courses",
            });
        }

        // 6. Tag/Category Validation
        const tagDetails = await Tag.findById(tag);
        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "Category/Tag not found",
            });
        }


        const uploadedImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );


        let learnArray = whatYouWillLearn;
        if (typeof learnArray === "string") {
            try {
                learnArray = JSON.parse(learnArray);
            } catch (e) {
                learnArray = [learnArray]; 
            }
        }

        // 9. Create entry in Database
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn: learnArray,
            instructor: instructorDetails._id,
            price: Number(price),
            thumbnail: uploadedImage.secure_url,
            tag: tagDetails._id,
            status: status || "Draft",
            instructions: instructions,
        });

        // 10. Sync references
        await User.findByIdAndUpdate(instructorDetails._id, {
            $push: { courses: newCourse._id },
        });

        await Tag.findByIdAndUpdate(tagDetails._id, {
            $push: { courses: newCourse._id },
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });

    } catch (error) {
        console.error("CREATE COURSE ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error during course creation",
            error: error.message,
        });
    }
};

exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    ).populate("instructor");

    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching courses",
      error: error.message,
    });
  }
};


exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("tag")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
          strictPopulate: false,
        },
      });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not available here bro",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching course details",
      error: error.message,
    });
  }
};


exports.editCourse = async (req, res) => {


  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }


    if (req.files && req.files.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }


  //  for (const key in updates) {
  //     if (updates.hasOwnProperty(key) && key !== "courseId") {
        
  //       if (key === "whatYouWillLearn" || key === "instructions") {
  //           try {
  //               course[key] = JSON.parse(updates[key]);
  //           } catch (e) {
  //               course[key] = updates[key]; 
  //           }
  //       } else {
  //           course[key] = updates[key];
  //       }
  //     }
  //   }

  Object.entries(updates).forEach(([key, value]) => {
      if (key !== "courseId") {
      
        if (key === "whatYouWillLearn" || key === "tag") {
          try {
            course[key] = JSON.parse(value);
          } catch (e) {
            course[key] = value;
          }
        } else {
          course[key] = value;
        }
      }
    });

    await course.save();

    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("tag")
      .populate({
        path: "courseContent",
        populate: { path: "subSections" , strictPopulate: false,},
      })
      .exec();

 res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
  console.error("EDIT COURSE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;


    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
    .sort({ createdAt: -1 })
    .populate({
      path: "courseContent",
      populate: {
        path: "subSections", 
      },
    })
    .exec();
    ;

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {

      await Section.findByIdAndDelete(sectionId);
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("tag")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSections" , strictPopulate: false, },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({ success: false, message: "Course not available" });
    }


    const courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    }) || { completedVideos: [] };

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        completedVideos: courseProgress.completedVideos,
      },
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};




