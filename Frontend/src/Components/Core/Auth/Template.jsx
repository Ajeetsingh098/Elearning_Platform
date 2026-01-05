// Template.jsx
import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useSelector } from "react-redux";

function Template({ title, description1, description2, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-center px-8 py-8 bg-linear-to-br from-indigo-600 to-purple-600 min-h-[calc(100vh-80px)]">
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full md:flex overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 bg-linear-to-tr from-purple-500 to-indigo-500 text-white flex-col justify-center p-12">
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <p className="mb-4 text-lg">{description1}</p>
          <p className="text-lg font-medium">{description2}</p>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBEeK-wKTN0Lv-87irpSoFyLiuJq4bl6Q_QA&s"
            alt="Auth Banner"
            className="mt-6 rounded-xl shadow-lg"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            {formType === "login"
              ? "Login to your account"
              : "Create your account"}
          </h2>

          {formType === "login" ? <LoginForm /> : <SignupForm />}

          {/* Loading */}
          {loading && (
            <div className="mt-4 text-center text-indigo-600 font-medium">
              Loading...
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-4 text-gray-400">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition cursor-pointer">
              Continue with Google
            </button>
            <button className="w-full py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition cursor-pointer">
              Continue with Apple
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Template;




// import React from 'react'

//   import LoginForm from './LoginForm'
//   import SignupForm from './SignupForm'
// import { useSelector } from 'react-redux'


// function Template({title,description1,description2, formType}) {
//  const{loading}=useSelector((state)=>state.auth)
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Template
