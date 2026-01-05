import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordToken } from "../../../Services/operations/authApi";
import toast from "react-hot-toast";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  

  const { loading } = useSelector((state) => state.auth); 

  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;


    try {

      await dispatch(resetPasswordToken(email)); 
      toast.success("Reset Email Sent")
    
      setEmailSent(true); 
    } catch (error) {
        toast.error("Failed to sent Email")
        console.log("Password token request failed in component.");
    }
  };

  return (
    <div className="flex justify-center px-4 py-20 bg-linear-to-br from-indigo-600 to-purple-600 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        
        {/* Conditional Rendering using emailSent state */}
        {emailSent ? (
          /* Success Message View */
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Check your email
            </h2>
            <p className="text-gray-500 mb-6">
              We have sent a password reset link to <span className="font-semibold text-indigo-600">{email}</span>. Please check your inbox (and spam folder) to continue.
            </p>
            <div className="space-y-4">
                <button
                    onClick={() => {setEmailSent(false); setEmail("")}} 
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                    disabled={loading} 
                >
                    Resend Email
                </button>
            </div>
          </>
        ) : (
          /* Initial Form View */
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-500 mb-6">
              Enter your email and we’ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading} 
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-500 transition cursor-pointer disabled:opacity-50"
                disabled={loading} 
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        )}

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

export default ForgotPassword;