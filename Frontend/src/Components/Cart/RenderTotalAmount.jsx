import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { buyCourse } from "../../../Services/operations/studentFeaturesAPI";

function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {

    const courses = cart.map((course) => course._id);
    
   
    if (token) {
      buyCourse(token, courses, user, navigate, dispatch);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-w-70 rounded-md border border-richblack-700 bg-richblack-800 p-6 h-fit">
      <p className="mb-1 text-sm font-medium text-white">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-200">₹ {total}</p>
      
      <button
        onClick={handleBuyCourse}
        className="w-full justify-center rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200 cursor-pointer"
      >
        Buy Now
      </button>
    </div>
  );
}

export default RenderTotalAmount;