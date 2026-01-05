const express=require("express");
const router=express.Router();
const upload=require("../config/multer")

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); 

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer();

const{auth}=require("../middlewares/authMiddleware");

const{updateProfile,deleteAccount,getAlluserDetails,getEnrolledCourses }=require("../controllers/Profile");


router.post("/deleteaccount",auth,deleteAccount);
router.get("/getalluserdetails",auth,getAlluserDetails)
router.put("/updateProfile", auth, upload.single("profileImage"), updateProfile);


router.get("/getEnrolledCourses",auth,getEnrolledCourses )


module.exports=router;