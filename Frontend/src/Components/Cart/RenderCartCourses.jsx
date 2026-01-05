import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../Slices/cartSlice";

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!cart.length) {
    return (
      <p className="text-center text-richblack-300">
        No courses in cart
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {cart.map((course) => (
        <div
          key={course._id}
          className="flex flex-col gap-6 rounded-xl border border-richblack-700 bg-richblack-800 p-5 shadow-sm md:flex-row md:items-center md:justify-between"
        >
          {/* Left */}
          <div className="flex flex-1 gap-4">
            <img
              src={course?.thumbnail}
              alt="thumbnail"
              className="h-22.5 w-40 rounded-lg object-cover"
            />

            <div className="space-y-2">
              <p className="text-lg font-semibold text-white">
                {course?.courseName}
              </p>

              <p className="text-sm text-white">
                {course?.tag?.name}
              </p>

              <div className="flex items-center gap-2">
                <ReactStars
                  count={5}
                  value={course?.averageRating || 0}
                  size={18}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />
                <span className="text-sm text-yellow-200">
                  ({course?.ratingAndReviews?.length || 0})
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end">
            <p className="text-xl font-semibold text-yellow-50">
              ₹{course?.price}
            </p>

            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 rounded-md bg-pink-600/10 px-4 py-2 text-pink-300 hover:bg-pink-600 hover:text-white transition cursor-pointer"
            >
              <RiDeleteBin6Line />
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourses;
