import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { FaStar } from "react-icons/fa";
import { createRating } from "../Services/operations/Course";
import { toast } from "react-hot-toast";

function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { entireCourseData } = useSelector((state) => state.viewCourse);
  const { courseId } = useParams(); 

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingLabel, setRatingLabel] = useState("Select Rating");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

 
  useEffect(() => {
    register("courseRating", { required: true, min: 1 });
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [register, setValue]);

  const handleRatingClick = (num) => {
    setRating(num);
    setValue("courseRating", num);
    const labels = {
      1: "Terrible ☹️",
      2: "Bad 🙁",
      3: "Average 😐",
      4: "Good 🙂",
      5: "Excellent! 🤩"
    };
    setRatingLabel(labels[num]);
  };

  const onSubmit = async (data) => {
    const idToSubmit = entireCourseData?._id || courseId;

    if (!rating) {
      toast.error("Please select a star rating");
      return;
    }

    const response = await createRating(
      {
        courseId: idToSubmit,
        rating: rating,
        review: data.courseExperience,
      },
      token
    );

    if (response) {
      setReviewModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-1000 grid h-screen w-screen place-items-center overflow-auto bg-slate-900/80 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-112.5 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <p className="text-xl font-bold text-white">Share Review</p>
          <button onClick={() => setReviewModal(false)}>
            <VscClose size={28} className="text-slate-400 hover:text-white transition-colors" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col items-center">
          {/* User Profile */}
          <div className="flex flex-col items-center mb-6">
            <img src={user?.image} className="h-14 w-14 rounded-full border-2 border-yellow-400 mb-2" alt="user" />
            <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
          </div>

          {/*  Star Selection */}
          <p className="text-yellow-400 text-sm font-semibold mb-2 h-5">{ratingLabel}</p>
          <div className="flex gap-x-2 mb-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                className="transition-all duration-100 transform hover:scale-125"
                onClick={() => handleRatingClick(num)}
                onMouseEnter={() => setHover(num)}
                onMouseLeave={() => setHover(0)}
              >
                <FaStar
                  size={42}
                  className={`${num <= (hover || rating) ? "text-yellow-400 cursor-pointer" : "text-slate-700"}`}
                />
              </button>
            ))}
          </div>

          {/* Textarea */}
          <div className="w-full flex flex-col gap-y-2">
            <label className="text-slate-300 text-sm font-medium">Your Experience</label>
            <textarea
              {...register("courseExperience", { required: true })}
              placeholder="What did you think of this course?"
              className="min-h-30 w-full bg-slate-800 rounded-xl p-4 text-white border border-slate-700 focus:border-yellow-400 outline-none transition-all"
            />
            {errors.courseExperience && <span className="text-pink-500 text-xs mt-1">Please write a review</span>}
          </div>

          <button type="submit" className="w-full mt-8 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-3 rounded-xl transition-all cursor-pointer">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseReviewModal;