




import React from "react";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import { useEffect } from "react";
import { getUserDetails } from "../../Services/operations/profileApi";

function MyProfile() {
  const { user } = useSelector((state) => state.profile);
   const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


    useEffect(() => {
    if (token) {
      dispatch(getUserDetails(token)); 
    }
  }, [dispatch, token]);
  

  return (
    <div className="mx-auto w-11/12 max-w-250 py-10">
      <h1 className="mb-14 text-3xl font-medium text-slate-50">My Profile</h1>

      {/* Section 1: Top Header Card */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-y-6 rounded-2xl border border-slate-700 bg-slate-800 p-8 px-6 md:px-12 shadow-lg transition-all hover:border-slate-600">
        <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-21.5 rounded-full object-cover border-2 border-yellow-400"
          />
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xl font-bold text-slate-50">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-slate-400">{user?.email}</p>
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 rounded-full mt-2">
              {user?.accountType}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-x-2 rounded-md bg-yellow-400 py-2 px-5 font-semibold text-slate-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-300 active:scale-90"
        >
          <RiEditBoxLine className="text-lg" />
          <span>Edit</span>
        </button>
      </div>

      {/* Section 2: Bio/About Card */}
      <div className="my-10 flex flex-col gap-y-6 rounded-2xl border border-slate-700 bg-slate-800 p-8 px-6 md:px-12 shadow-lg">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-slate-50">About</p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-x-2 rounded-md bg-yellow-400 py-2 px-5 font-semibold text-slate-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-300"
          >
            <RiEditBoxLine />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about ? "text-slate-200" : "text-slate-500 italic"
          } text-sm font-medium leading-6`}
        >
          {user?.additionalDetails?.about ?? "Write something about yourself..."}
        </p>
      </div>

      {/* Section 3: Personal Details Card */}
      <div className="my-10 flex flex-col gap-y-10 rounded-2xl border border-slate-700 bg-slate-800 p-8 px-6 md:px-12 shadow-lg">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-slate-50">Personal Details</p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-x-2 rounded-md bg-yellow-400 py-2 px-5 font-semibold text-slate-900 transition-all duration-200 hover:scale-95 hover:bg-yellow-300"
          >
            <RiEditBoxLine />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>

        {/* Grid for data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">First Name</p>
            <p className="text-sm font-medium text-slate-100">{user?.firstName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Last Name</p>
            <p className="text-sm font-medium text-slate-100">{user?.lastName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Email</p>
            <p className="text-sm font-medium text-slate-100 break-all">{user?.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Phone Number</p>
            <p className="text-sm font-medium text-slate-100">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Gender</p>
            <p className="text-sm font-medium text-slate-100">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Date Of Birth</p>
            <p className="text-sm font-medium text-slate-100">
              {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;