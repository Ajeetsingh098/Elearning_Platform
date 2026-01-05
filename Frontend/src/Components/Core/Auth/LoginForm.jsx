import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../Services/operations/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Call login API
        await dispatch(login(email, password, navigate));
        toast.success("LoggedIn Successfully")
       
      } catch (error) {
       
        toast.error(error?.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col gap-5 w-full max-w-md mx-auto bg-slate-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white text-center">Login</h2>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-slate-300 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md bg-slate-700 text-white focus:ring-2 focus:ring-yellow-400"
        />
        {errors.email && (
          <span className="text-red-400 text-sm">{errors.email}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1 relative">
        <label className="text-slate-300 font-medium">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter your password"
          className="px-4 py-2 rounded-md bg-slate-700 text-white focus:ring-2 focus:ring-yellow-400"
        />
        <span
          className="absolute right-3 top-9 cursor-pointer text-slate-300"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.password && (
          <span className="text-red-400 text-sm">{errors.password}</span>
        )}
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-yellow-400 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-300 transition cursor-pointer"
      >
        Login
      </button>

      <p className="text-sm text-slate-400 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-yellow-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;




// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { login } from "../../../Services/operations/authApi";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function LoginForm() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});

//   const { email, password } = formData;

//   const handleOnChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();

//     const validationErrors = {};
//     if (!email) validationErrors.email = "Email is required";
//     if (!password) validationErrors.password = "Password is required";

//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       dispatch(login(email, password, navigate));
//     }
//   };

//   return (
//     <form
//       onSubmit={handleOnSubmit}
//       className="flex flex-col gap-5 w-full max-w-md mx-auto bg-slate-800 p-8 rounded-lg shadow-lg"
//     >
//       <h2 className="text-2xl font-bold text-white text-center">Login</h2>

//       {/* Email */}
//       <div className="flex flex-col gap-1">
//         <label className="text-slate-300 font-medium">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={handleOnChange}
//           placeholder="Enter your email"
//           className="px-4 py-2 rounded-md bg-slate-700 text-white focus:ring-2 focus:ring-yellow-400"
//         />
//         {errors.email && (
//           <span className="text-red-400 text-sm">{errors.email}</span>
//         )}
//       </div>

//       {/* Password */}
//       <div className="flex flex-col gap-1 relative">
//         <label className="text-slate-300 font-medium">Password</label>
//         <input
//           type={showPassword ? "text" : "password"}
//           name="password"
//           value={password}
//           onChange={handleOnChange}
//           placeholder="Enter your password"
//           className="px-4 py-2 rounded-md bg-slate-700 text-white focus:ring-2 focus:ring-yellow-400"
//         />
//         <span
//           className="absolute right-3 top-9 cursor-pointer text-slate-300"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <FaEyeSlash /> : <FaEye />}
//         </span>
//         {errors.password && (
//           <span className="text-red-400 text-sm">{errors.password}</span>
//         )}
//       </div>

//       {/* Forgot Password */}
//       <div className="flex justify-end">
//         <Link
//           to="/forgot-password"
//           className="text-sm text-yellow-400 hover:underline"
//         >
//           Forgot Password?
//         </Link>
//       </div>

//       {/* Login Button */}
//       <button
//         type="submit"
//         className="bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-300 transition cursor-pointer"
//       >
//         Login
//       </button>

//       <p className="text-sm text-slate-400 text-center">
//         Don't have an account?{" "}
//         <Link to="/signup" className="text-yellow-400 hover:underline">
//           Sign Up
//         </Link>
//       </p>
//     </form>
//   );
// }

// export default LoginForm;









// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { useNavigate ,Link } from 'react-router-dom'
// import { useState } from 'react';


// function LoginForm() {
//        const navigate =useNavigate();
//        const dispatch=useDispatch();
//        const[formData,setFormData]=useState({
//         email:"",
//         password:""
//        })

//        const [showPassword ,setPassword]=useState(false);
//        const{email,password}=formData;
//        const handleOnChange=(e)=>{
//         setFormData((preData)=>({
//             ...preData,
//             [e.target.name]:e.target.value
//         })
//     )
//        }
//     const handleOnSubmit=(e)=>{
//     e.preventDefault()
//     dispatchEvent(login(email ,password ,navigate))

// }
//   return (
//    <form 
//    onSubmit={handleOnSubmit}
   
//    >

//    </form>
//   )
// }

// export default LoginForm
