import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { RiEditBoxLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { deleteAccount, updateProfile } from "../../Services/operations/profileApi";
import { useState } from "react";

function Setting() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(user?.image || null);


  const [selectedFile, setSelectedFile] = useState(null);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;



  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);


    const profileData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      dateOfBirth: data.get("dateOfBirth"),
      gender: data.get("gender"),
      contactNumber: data.get("contactNumber"),
      about: data.get("about"),

    };

    if (selectedFile) {
      const imageUrl = await handleUploadToCloudinary(selectedFile);
      if (imageUrl) profileData.image = imageUrl;
    }

    try {

      console.log("PROFILE DATA:", profileData);

      await dispatch(updateProfile(token, profileData));

    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("Could not update profile");
    }
  };


  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action is permanent.");

    if (confirmed) {
      try {
        await dispatch(deleteAccount(token, navigate));
      } catch (error) {
        console.error("Error during account deletion:", error);
      }

    }
  };

  const handleUploadToCloudinary = async (file) => {


    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "profile_images");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("Image upload failed");
      return null;
    }
  };


  return (
    <div className="mx-auto w-11/12 max-w-250 py-10">
      <h1 className="mb-14 text-3xl font-medium text-slate-50">Edit Profile</h1>

      {/* 1. Change Profile Picture */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-800 p-8 px-6 md:px-12 shadow-lg mb-6">
        <div className="flex items-center gap-x-4">
          <img

            src={preview}
            alt="profile"
            className="aspect-square w-19.5 rounded-full object-cover border-2 border-yellow-400"
          />
          <div className="space-y-2">
            <p className="text-lg font-semibold text-slate-50">Change Profile Picture</p>
            <div className="flex flex-row gap-3">

              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profileImageInput"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedFile(file);
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />

              <button
                type="button"
                onClick={() => document.getElementById("profileImageInput").click()}
                className="cursor-pointer rounded-md bg-slate-700 py-2 px-5 font-semibold text-slate-100 hover:bg-slate-600 transition">
                Select

              </button>



              <button
                type="button"
                onClick={async () => {
                  if (!selectedFile) return toast.error("Select a file first");
                  const imageUrl = await handleUploadToCloudinary(selectedFile);
                  if (imageUrl) {
        
                    setPreview(imageUrl); 

                   
                    await dispatch(updateProfile(token, { image: imageUrl }));
                  }

                }}
                className="flex items-center gap-2 cursor-pointer rounded-md bg-yellow-400 py-2 px-5 font-semibold text-slate-900 hover:bg-yellow-300 transition"
              >
                <FiUpload /> Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Edit Profile Information Form */}
      <form onSubmit={handleProfileUpdate} className="my-10 rounded-2xl border border-slate-700 bg-slate-800 p-8 px-6 md:px-12 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-50 mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue={user?.firstName}
              placeholder="Enter first name"
              className="rounded-md bg-slate-700 p-3 text-slate-50 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-sm">Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={user?.lastName}
              placeholder="Enter last name"
              className="rounded-md bg-slate-700 p-3 text-slate-50 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* DOB */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-sm">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              defaultValue={user?.additionalDetails?.dateOfBirth}
              className="rounded-md bg-slate-700 p-3 text-slate-50 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* Gender */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-sm">Gender</label>
            <select
              name="gender"
              defaultValue={user?.additionalDetails?.gender}
              className="rounded-md bg-slate-700 p-3 text-slate-50 outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          {/* contact Number */}
          <div className="flex flex-col gap-2" >
            <label className="text-slate-400 text-sm">Contact</label>
            <input
              type="tel"
              name="contactNumber"
              defaultValue={user?.additionalDetails?.contactNumber}
              placeholder="Enter contact number"
              className="rounded-md bg-slate-700 p-3 text-slate-50 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-slate-400 text-sm">About</label>
            <textarea
              rows="4"
              name="about"
              defaultValue={user?.additionalDetails?.about}
              placeholder="Enter bio details"
              className="rounded-md bg-slate-700 p-3 text-slate-50 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => navigate("/dashboard/my-profile")}
            className="rounded-md cursor-pointer bg-slate-700 py-2 px-6 font-semibold text-slate-100">
            Cancel
          </button>
          <button
            type="submit"
            // onClick={}
            className="rounded-md bg-yellow-400 py-2 px-6 font-semibold text-slate-900 cursor-pointer">
            Save Changes
          </button>
        </div>
      </form>

      {/* 3. Delete Account Section */}
      <div className="my-10 flex flex-row gap-x-5 rounded-2xl border border-pink-700 bg-pink-900/20 p-8 px-6 md:px-12 shadow-lg">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 text-pink-200">
          <FiTrash2
            className="cursor-pointer"
            onClick={handleDeleteAccount}
            size={30} />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-slate-50">Delete Account</h2>
          <div className="w-full md:w-3/5 text-pink-100 text-sm">
            <p>Would you like to delete your account?</p>
            <p>This account contains Paid Courses. Deleting your account will remove all content associated with it.</p>
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-fit cursor-pointer italic text-pink-300 underline hover:text-pink-100 transition"
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;