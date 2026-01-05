import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp, signup } from "../../../Services/operations/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    accountType: "Student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    accountType,
  } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const startResendTimer = () => {
    setResendTimer(120);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // SEND OTP ()
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email first");
      return;
    }

    try {
      await dispatch(sendOtp(email));
      setOtpSent(true);
      startResendTimer();

    } catch (error) {

     console.error("Component Error:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!otpSent || !otp) {
      toast.error("Please enter the OTP sent to your email.");
      return;
    }


    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    };


    try {
     
      await dispatch(signup(payload, navigate));
      toast.success("SignUp Successfully")
    } catch (error) {
      toast.error("SignUp error")
      console.error("Signup Error in Component:", error);
    }
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-slate-800 p-8 rounded-2xl shadow-xl flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-white text-center">
        Create Account
      </h2>

      {/* Role Selection */}
      <div className="flex gap-3 justify-center">
        {["Student", "Instructor"].map((role) => (
          <button
            type="button"
            key={role}
            onClick={() => setFormData({ ...formData, accountType: role })}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${accountType === role
              ? "bg-yellow-400 text-black"
              : "bg-slate-700 text-white"
              }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* First & Last Name */}
      <div className="flex gap-3">
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleOnChange}
          placeholder="First Name"
          className="w-1/2 px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
          required
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleOnChange}
          placeholder="Last Name"
          className="w-1/2 px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleOnChange}
        placeholder="Email Address"
        className="px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
        required
      />

      {/* Send / Resend OTP & Message */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={resendTimer > 0}
          className={`py-2 px-4 rounded-lg font-semibold transition shrink-0 cursor-pointer ${resendTimer > 0
            ? "bg-slate-600 text-slate-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
        >
          {otpSent
            ? resendTimer > 0
              ? `Resend OTP in ${resendTimer}s`
              : "Resend OTP"
            : "Send OTP"}
        </button>

        {/* Timer/Status Message */}
        {otpSent && resendTimer > 0 && (
          <p className="text-sm text-yellow-400">
            OTP sent. Check your inbox.
          </p>
        )}
      </div>


      {otpSent && (
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={handleOnChange}
          placeholder="Enter OTP (6 digits)"
          className="px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
          maxLength={6}
          required
        />
      )}

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 cursor-pointer text-slate-300"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleOnChange}
          placeholder="Confirm Password"
          className="w-full px-4 py-2 rounded bg-slate-700 text-white focus:outline-none"
          required
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-3 cursor-pointer text-slate-300"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"

        disabled={!otpSent || !otp}
        className={`py-2 rounded-lg font-bold transition cursor-pointer ${otpSent && otp
          ? "bg-yellow-400 hover:bg-yellow-300 text-black"
          : "bg-slate-600 text-slate-300 cursor-not-allowed"
          }`}
      >
        Create Account
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-yellow-400 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;