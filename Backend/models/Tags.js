
const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
   },
   courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      default: [],
   },
   description: {
      type: String,
      default: "",
   },
}, { timestamps: true });

module.exports = mongoose.model("Tag", tagsSchema);











// const mongoose = require("mongoose");



// const tagsSchema = new mongoose.Schema({
//    name: {

//       type: String,
//       required: true

//    },
//    courses: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Course",
//       },
//    ],
//    description: {
//       type: String,

//    }

// });
// module.exports = mongoose.model("Tag", tagsSchema)