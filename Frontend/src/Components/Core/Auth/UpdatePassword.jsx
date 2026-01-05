import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom"; 
import { resetPassword } from "../../../Services/operations/authApi"; 
import toast from "react-hot-toast";

function UpdatePassword() {
  const dispatch = useDispatch();
  const location = useLocation(); 
  const navigate = useNavigate(); 
  


  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false); 

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
   
      toast.error("Passwords do not match")
      console.error("Passwords do not match");
      return; 
    }

    setLocalLoading(true);


    const token = location.pathname.split('/').pop();
    
    
    try {

        await dispatch(resetPassword(password, confirmPassword, token, navigate));
        toast.success("Password Updated Successfuly")
    } catch (error) {
         toast.error("Password reset failed in component")
        console.log("Password reset failed in component.");
    }

    setLocalLoading(false);
  };

  return (
    <div className="flex justify-center px-4 py-20 bg-linear-to-br from-indigo-600 to-purple-600 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Set New Password
        </h2>
        <p className="text-gray-500 mb-6">
          Your account is secure. Please choose a strong, new password to access your account.
        </p>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          
          {/* New Password Input */}
          <div className="relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                New Password
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              placeholder="Enter New Password"
              onChange={handleOnChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              disabled={localLoading}
            />
            {/* Show/Hide Password Toggle */}
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 transform cursor-pointer text-gray-500"
              aria-label={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Confirm New Password Input */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1">
                Confirm New Password
            </label>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm New Password"
              onChange={handleOnChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              disabled={localLoading}
            />
            {/* Show/Hide Password Toggle */}
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 transform cursor-pointer text-gray-500"
              aria-label={showConfirmPassword ? "Hide Confirm Password" : "Show Confirm Password"}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-500 transition cursor-pointer disabled:opacity-50"
            disabled={localLoading}
          >
            {localLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Back to Login Link */}
        <p className="text-sm text-center text-gray-500 mt-4">
          <Link to="/login" className="text-indigo-600 hover:underline flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UpdatePassword;