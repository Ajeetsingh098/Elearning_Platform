const express=require("express");
const router=express.Router();

const{auth,isInstructor,isStudent,isAdmin}=require("../middlewares/authMiddleware");

const{createTag,showAlltags,tagPageDetails }=require("../controllers/Tags");

router.post("/createTag",auth,isAdmin,createTag);
router.get("/showAlltags",showAlltags);
router.post("/tagPageDetails",tagPageDetails)


module.exports=router;