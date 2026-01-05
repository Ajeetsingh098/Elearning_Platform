


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../../../Slices/authSlice";
import { setUser } from "../../../Slices/profileSlice";
import { VscDashboard, VscSignOut, VscSettingsGear, VscAccount, VscMortarBoard, VscAdd, VscLibrary, VscGraph } from "react-icons/vsc";
import toast from "react-hot-toast";


function ProfileDropdown({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  if (!isOpen) return null;

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.clear();
    setIsOpen(false);
    toast.success("Logged Out")
    navigate("/");
  };

  return (
    <>
      {/* Backdrop - */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>

          
      <div className="fixed top-0 left-0 h-full w-70 sm:w-87.5 bg-slate-900 z-50 shadow-2xl flex flex-col border-l border-slate-700 animate-slide-in">

        {/* Header Section */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-4">
          <img
            src={user?.image}
            alt="profile"
            className="h-12 w-12 rounded-full border-2 border-yellow-400 object-cover"
          />
          <div>
            <p className="text-white font-bold leading-tight">
              {user?.firstName} {user?.lastName}</p>

            <p className="text-slate-400 text-xs">
              {user?.email}</p>

            <span className="text-[10px] bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full mt-1 inline-block">
              {user?.accountType}
            </span>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col p-4 gap-2">
          
            {/* profile section for both */}

          <Link
            to="/dashboard/my-profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition"
          >
            <VscAccount className="text-lg" />
            <span>My Profile</span>
          </Link>
           

           {/* Instructor section */}
           
            {user?.accountType === "Instructor" && (
            <Link to="/dashboard/instructor" 
            onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition">
              <VscGraph className="text-lg text-yellow-400" />
              <span className="text-white">Dashboard</span>
            </Link>
          )}


          {user?.accountType === "Instructor" && (
            <Link to="/dashboard/my-courses" 
            onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition">
              <VscLibrary className="text-lg text-yellow-400" />
              <span className="text-white">My Courses</span>
            </Link>
          )}

            {user?.accountType === "Instructor" && (
            <Link to="/dashboard/add-courses" 
            onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition">
              <VscAdd className="text-lg text-yellow-400" />
              <span className="text-white">Add Courses</span>
            </Link>
          )}


         

             {/* Student section */}

          {user?.accountType === "Student" && (
            <Link to="/dashboard/enrolled-courses" onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition">
              <VscMortarBoard className="text-lg text-yellow-400" />
              <span className="text-white">Enrolled Courses</span>
            </Link>
          )}







           {/* Setting section for both */}

          <Link
            to="/dashboard/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition"
          >
            <VscSettingsGear className="text-lg" />
            <span>Settings</span>
          </Link>


        </div>

        {/*  Logout */}
        <div className="mt-auto p-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg font-semibold transition duration-300 cursor-pointer"
          >
            <VscSignOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileDropdown;



