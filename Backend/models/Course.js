
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  courseDescription: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true
  },
  whatYouWillLearn: {
    type: [String],
    default: []
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section"
    }],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview"
    }],
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag", required: true
  },
  studentsEnrolled: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User", default: []
  },
  instructions: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft"
  },

}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);




// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   courseName: {
//     type: String,
//     required: true,
//   },
//   courseDescription: {
//     type: String,
//     required: true,
//   },
//   instructor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   whatYouWillLearn: {
//     type: String,
//   },
//   courseContent: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Section",
//     },
//   ],
//   ratingAndReviews: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "RatingAndReviews",
//     },
//   ],
//   price: {
//     type: Number,
//     required: true,
//   },
//   thumbnail: {
//     type: String,
//   },
//   tag: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Tag",
//     required: true,
//   },
//   studentsEnrolled: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   instructions: {
//     type: [String],
//   },
//   status: {
//     type: String,
//     enum: ["Draft", "Published"],
//     default: "Draft",
//   },
// });

// module.exports = mongoose.model("Course", courseSchema);
