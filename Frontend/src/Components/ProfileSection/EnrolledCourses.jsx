import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../Services/operations/profileApi";

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await dispatch(getUserEnrolledCourses(token));
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch enrolled courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="mx-auto w-11/12 max-w-6xl py-10">
      {/* Heading */}
      <h2 className="mb-8 text-3xl font-semibold text-white">
        Enrolled Courses
      </h2>

      {/* Loading */}
      {!enrolledCourses && (
        <div className="text-center text-white">Loading...</div>
      )}

      {/* Empty State */}
      {enrolledCourses && !enrolledCourses.length && (
        <p className="text-center text-lg text-white">
          You have not enrolled in any courses yet
        </p>
      )}

      {/* Courses */}
      {enrolledCourses && enrolledCourses.length > 0 && (
        <div className="space-y-6">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-6 shadow-md md:flex-row md:items-center"
            >
              {/* Left */}
              <div className="flex flex-1 gap-4">
                <img
                  src={course.thumbnail}
                  alt="thumbnail"
                  className="h-22.5 w-40 rounded-lg object-cover"
                />

                <div className="space-y-2">
                  <p className="text-lg font-medium text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="line-clamp-2 text-sm text-richblack-300">
                    {course.courseDescription}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="w-full md:w-30 text-sm text-richblack-200">
                {course.totalDuration}
              </div>

              {/* Progress */}
              <div className="w-full md:w-55 space-y-2">
                <p className="text-sm text-richblack-200">
                  Progress: {course.progressPercentage || 0}%
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  bgColor="#ffd60a"
                  baseBgColor="#2c333f"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
