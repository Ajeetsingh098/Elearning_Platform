import React, { useState, useRef } from "react";
import { VscCloudUpload, VscClose } from "react-icons/vsc";
import axios from "axios";
import { toast } from "react-hot-toast";

function Upload({ label, name, setValue ,viewData = null}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(viewData || "");
  const [loading, setLoading] = useState(false); 
  const inputRef = useRef(null);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadToCloudinary(file);
    }
  };

  // Drag and drop handler
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      await uploadToCloudinary(file);
    }
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET ); 
    formData.append("cloud_name", CLOUD_NAME);       

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const url = res.data.secure_url;
      setPreviewSource(url);
      setSelectedFile(file);
      setValue(file); 
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-slate-300" htmlFor={name}>
        {label} {!selectedFile && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`${
          previewSource ? "p-0" : "p-8"
        } flex min-h-62.5 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all duration-300`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !previewSource && inputRef.current.click()}
      >
        {loading ? (
          <p className="text-yellow-400 font-semibold">Uploading...</p>
        ) : previewSource ? (
          <div className="relative w-full h-full group">
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewSource("");
                setSelectedFile(null);
                setValue(null);
              }}
              className="absolute top-3 right-3 p-2 bg-red-500 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <VscClose size={20} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-slate-900 text-yellow-400 mb-4">
              <VscCloudUpload size={30} />
            </div>
            <p className="text-sm text-slate-400">
              Drag and drop an image, or{" "}
              <span className="font-semibold text-yellow-400">Browse</span>
            </p>
            <ul className="mt-6 flex list-disc justify-between gap-x-10 text-center text-xs text-slate-500">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
      />
    </div>
  );
}

export default Upload;
