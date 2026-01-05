const  mongoose = require("mongoose");
require("dotenv").config();


exports.connect=async(req,res)=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Db connected successfully.")
    } catch (error)
     {
        return res.status(500).json({
            error:"Db connection failed",
           
        })
    }
};