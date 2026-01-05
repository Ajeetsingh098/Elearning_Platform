const express=require("express");
const router=express.Router();
// const upload=require("../config/multer")

const{auth,isInstructor,isStudent}=require("../middlewares/authMiddleware");
const{getCourseDetails ,showAllCourses,createCourse,editCourse,getInstructorCourses,deleteCourse,getFullCourseDetails}=require("../controllers/Course");

const{createSection,updateSection,deleteSection,}=require("../controllers/Section")
const{createSubsection}=require("../controllers/Subsection")

const{createRating,getAverageRating,getAllRating}=require("../controllers/RatingAndReview");


router.post("/createcourse",auth,isInstructor,createCourse);

router.post("/getcoursedetails",getCourseDetails);

router.get("/showallcourses",showAllCourses)



router.post("/addSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);


router.post("/createSubsection",auth,isInstructor,createSubsection);





// router.post("/createRating",auth,isStudent,createRating);
router.post("/createRating",auth,createRating);

router.get("/getAverageRating",getAverageRating);
router.get("/getAllRating",getAllRating)


router.post("/editCourse",auth,isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);







module.exports=router;