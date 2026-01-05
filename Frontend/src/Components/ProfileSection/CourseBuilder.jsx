

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  createSection,
  updateSection,
  deleteCourse ,
  createSubSection,
} from "../../Services/operations/Course";
import {
  VscAdd,
  VscChevronLeft,
  VscChevronRight,
  VscEdit,
  VscTrash,
  VscGripper,
  VscPlayCircle,
  VscCloudUpload,
  VscLoading,
} from "react-icons/vsc";
import { toast } from "react-hot-toast";

// ================= LECTURE UPLOADER COMPONENT =================
function LectureUploader({ section, courseData, setCourseData }) {
  const [lectureName, setLectureName] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { token } = useSelector((state) => state.auth);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploadVideo = async () => {
    if (!lectureName.trim() || !videoFile) {
      return toast.error("Please enter a title and select a video");
    }
       console.log("Section ID:", section._id);
    console.log("Title:", lectureName);
    console.log("File:", videoFile);
    console.log("Cloud Name:", CLOUD_NAME);
    console.log("Preset:", UPLOAD_PRESET);




    const formData = new FormData();
   formData.append("videoFile", videoFile);
    formData.append("title", lectureName);
    formData.append("sectionId", section._id);
    formData.append("courseId", courseData._id);
    formData.append("description", "Lecture video");
   
      // formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      // setUploadProgress(0);

      // 1. Upload to Cloudinary

      // const res = await axios.post(
      //   `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
      //   formData,
      //   {
      //     onUploadProgress: (progressEvent) => {
      //       const percentCompleted = Math.round(
      //         (progressEvent.loaded * 100) / progressEvent.total
      //       );
      //       setUploadProgress(percentCompleted);
      //     },
      //   }
      // );

      // 2. Call Backend API to save Subsection in MongoDB
      // const result = await createSubSection(
      //   {
      //     sectionId: section._id, 
      //     title: lectureName,
      //     videoUrl: res.data.secure_url,
      //     courseId: courseData._id,
      //   },
      //   token
      // );
          
      const result = await createSubSection(
        formData, 
        token,
           {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      
      );

     if (result) {
        setCourseData(result);
        setLectureName("");
        setVideoFile(null);
        setUploadProgress(0);
        // toast.success("Lecture added!");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Video upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4 ml-2 sm:ml-10 p-4 border-l-2 border-slate-700 bg-slate-800/20 rounded-r-lg">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Lecture title"
          value={lectureName}
          onChange={(e) => setLectureName(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
        />
        <label className="cursor-pointer flex items-center justify-center gap-2 bg-slate-700 px-3 py-2 rounded-lg text-xs hover:bg-slate-600 transition">
          <VscCloudUpload />{" "}
          {videoFile ? videoFile.name.substring(0, 15) + "..." : "Select Video"}
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </label>
      </div>
      {uploading && (
        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
          <div
            className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      <button
        onClick={uploadVideo}
        disabled={uploading}
        className="flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg hover:bg-yellow-500 disabled:bg-slate-600 font-bold transition-all"
      >
        {uploading ? <VscLoading className="animate-spin" /> : <VscAdd />}
        {uploading ? `Uploading ${uploadProgress}%` : "Add Lecture"}
      </button>
    </div>
  );
}

// ================= MAIN COURSE BUILDER COMPONENT =================
function CourseBuilder({ setStep, courseData, setCourseData }) {
  const [sectionName, setSectionName] = useState("");
  const [editSectionId, setEditSectionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handleCreateSection = async () => {
    if (!sectionName.trim()) return;
    setLoading(true);
    let result;

    if (editSectionId) {
      //  update section
      result = await updateSection(
        {
          sectionName,
          sectionId: editSectionId,
          courseId: courseData._id,
        },
        token
      );
    } else {
      // A create section in MongoDB
      result = await createSection(
        {
          sectionName,
          courseId: courseData._id,
        },
        token
      );
    }

    if (result) {
      setCourseData(result);
      setSectionName("");
      setEditSectionId(null);
      // toast.success("Section added to Database");

    }
    setLoading(false);
  };

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: courseData._id,
      },
      token
    );
    if (result) {
      setCourseData(result);
    }
  };

  const handleNextStep = () => {
    if (courseData.courseContent.length === 0) {
      return toast.error("Please add at least one section");
    }
    if (courseData.courseContent.some((s) => s.subSections.length === 0)) {
      return toast.error("All sections must have at least one lecture");
    }
    setStep(3);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-slate-100 flex items-center gap-2">
          <span className="bg-yellow-400 text-slate-900 h-6 w-6 rounded-full flex items-center justify-center text-xs">
            2
          </span>
          Build Curriculum
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <input
            type="text"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="Add a section (e.g. Introduction to React)"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
          />
          <button
            onClick={handleCreateSection}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-slate-900 border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-all font-bold"
          >
            {loading ? <VscLoading className="animate-spin" /> : editSectionId ? <VscEdit /> : <VscAdd />}
            {editSectionId ? "Update Section" : "Create Section"}
          </button>
        </div>

        <div className="space-y-6">
          
          {courseData?.courseContent?.map((section) => (
            <div key={section._id} className="border border-slate-800 rounded-2xl bg-slate-800/20 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-slate-800/40 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <VscGripper className="text-slate-600" />
                  <span className="font-bold text-slate-200">{section.sectionName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setEditSectionId(section._id);
                      setSectionName(section.sectionName);
                    }}
                    className="text-slate-400 hover:text-yellow-400 transition-colors"
                  >
                    <VscEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section._id)}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <VscTrash size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-900/30">
                {section.subSections?.map((sub) => (
                  <div key={sub._id} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl mb-2 ml-4 sm:ml-8 border border-slate-700">
                    <div className="flex items-center gap-3">
                      <VscPlayCircle className="text-yellow-400" />
                      <span className="text-sm text-slate-300 font-medium">{sub.title}</span>
                    </div>
                    <a href={sub.videoUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-yellow-400 uppercase tracking-widest hover:underline">
                      Preview
                    </a>
                  </div>
                ))}
                
                <LectureUploader section={section} courseData={courseData} setCourseData={setCourseData} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors">
          <VscChevronLeft /> Back to Course Info
        </button>
        <button onClick={handleNextStep} className="flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold px-10 py-3 rounded-2xl hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-400/10">
          Next: Publish Settings <VscChevronRight />
        </button>
      </div>
    </div>
  );
}

export default CourseBuilder;

















// import React, { useState } from "react";
// import axios from "axios";

// import { createSection, updateSection } from "../../Services/operations/Course";

// import {
//   VscAdd,
//   VscChevronLeft,
//   VscChevronRight,
//   VscEdit,
//   VscTrash,
//   VscGripper,
//   VscPlayCircle,
//   VscCloudUpload,
//   VscLoading
// } from "react-icons/vsc";
// import { toast } from "react-hot-toast";

// function LectureUploader({ section, courseData, setCourseData }) {
//   const [lectureName, setLectureName] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//   const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

//   const uploadVideo = async () => {
//     if (!lectureName.trim() || !videoFile) {
//       return toast.error("Please enter a title and select a video");
//     }

//     if (!CLOUD_NAME || !UPLOAD_PRESET) {
//       return toast.error("Cloudinary configuration missing");
//     }

//     const formData = new FormData();
//     formData.append("file", videoFile);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     try {
//       setUploading(true);
//       const res = await axios.post(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
//         formData,
//         {
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           },
//         }
//       );

//       const updatedSections = courseData.sections.map((sec) => {
//         if (sec.id === section.id) {
//           return {
//             ...sec,
//             subSections: [
//               ...sec.subSections,
//               { id: Date.now(), title: lectureName, videoUrl: res.data.secure_url },
//             ],
//           };
//         }
//         return sec;
//       });

//       setCourseData({ ...courseData, sections: updatedSections });
//       setLectureName("");
//       setVideoFile(null);
//       setUploadProgress(0);
//       toast.success("Lecture added!");
//     } catch (err) {
//       console.error("Upload Error:", err);
//       toast.error("Video upload failed. Check file size or network.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3 mt-4 ml-2 sm:ml-10 p-4 border-l-2 border-slate-700 bg-slate-800/20 rounded-r-lg">
//       <div className="flex flex-col sm:flex-row gap-2">
//         <input
//           type="text"
//           placeholder="Lecture title"
//           value={lectureName}
//           onChange={(e) => setLectureName(e.target.value)}
//           className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400"
//         />
//         <label className="cursor-pointer flex items-center justify-center gap-2 bg-slate-700 px-3 py-2 rounded-lg text-xs hover:bg-slate-600 transition">
//           <VscCloudUpload /> {videoFile ? videoFile.name.substring(0, 15) + "..." : "Select Video"}
//           <input
//             type="file"
//             accept="video/*"
//             hidden
//             onChange={(e) => setVideoFile(e.target.files[0])}
//           />
//         </label>
//       </div>

//       {uploading && (
//         <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
//           <div className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
//         </div>
//       )}

//       <button
//         onClick={uploadVideo}
//         disabled={uploading}
//         className="flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg hover:bg-yellow-500 disabled:bg-slate-600 font-bold transition-all"
//       >
//         {uploading ? <VscLoading className="animate-spin" /> : <VscAdd />}
//         {uploading ? `Uploading ${uploadProgress}%` : "Add Lecture"}
//       </button>
//     </div>
//   );
// }

// function CourseBuilder({ setStep, courseData, setCourseData }) {
//   const [sectionName, setSectionName] = useState("");
//   const [editSectionId, setEditSectionId] = useState(null);

//   const handleCreateSection = () => {
//     if (!sectionName.trim()) return;

//     if (editSectionId) {
//       const updatedSections = courseData.sections.map((sec) =>
//         sec.id === editSectionId ? { ...sec, title: sectionName } : sec
//       );
//       setCourseData({ ...courseData, sections: updatedSections });
//       setEditSectionId(null);
//       toast.success("Section updated");
//     } else {
//       const newSection = { id: Date.now(), title: sectionName, subSections: [] };
//       setCourseData({ ...courseData, sections: [...(courseData.sections || []), newSection] });
//       toast.success("Section created");
//     }
//     setSectionName("");
//   };

//   const deleteSection = (id) => {
//     const updatedSections = courseData.sections.filter((sec) => sec.id !== id);
//     setCourseData({ ...courseData, sections: updatedSections });
//     toast.error("Section deleted");
//   };

//   const handleNextStep = () => {
//     if (courseData.sections.length === 0) return toast.error("Please add at least one section");
//     if (courseData.sections.some(s => s.subSections.length === 0)) return toast.error("All sections must have at least one lecture");
//     setStep(3);
//   };

//   return (
//     <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
//       <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-2xl">
//         <h2 className="text-xl font-bold mb-6 text-slate-100 flex items-center gap-2">
//           <span className="bg-yellow-400 text-slate-900 h-6 w-6 rounded-full flex items-center justify-center text-xs">2</span>
//           Build Curriculum
//         </h2>

//         <div className="flex flex-col sm:flex-row gap-3 mb-10">
//           <input
//             type="text"
//             value={sectionName}
//             onChange={(e) => setSectionName(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleCreateSection()}
//             placeholder="Add a section (e.g. Introduction to React)"
//             className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
//           />
//           <button
//             onClick={handleCreateSection}
//             className="flex items-center justify-center gap-2 bg-slate-900 border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-all font-bold shadow-lg shadow-yellow-400/5"
//           >
//             {editSectionId ? <VscEdit /> : <VscAdd />} {editSectionId ? "Update" : "Create"}
//           </button>
//         </div>

//         <div className="space-y-6">
//           {courseData?.sections?.map((section) => (
//             <div key={section.id} className="border border-slate-800 rounded-2xl bg-slate-800/20 overflow-hidden">
//               <div className="flex items-center justify-between px-5 py-4 bg-slate-800/40 border-b border-slate-800">
//                 <div className="flex items-center gap-3">
//                   <VscGripper className="text-slate-600" />
//                   <span className="font-bold text-slate-200">{section.title}</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <button onClick={() => { setEditSectionId(section.id); setSectionName(section.title); }} className="text-slate-400 hover:text-yellow-400 transition-colors">
//                     <VscEdit size={18} />
//                   </button>
//                   <button onClick={() => deleteSection(section.id)} className="text-slate-400 hover:text-red-400 transition-colors">
//                     <VscTrash size={18} />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-4 bg-slate-900/30">
//                 {section.subSections.map((sub, idx) => (
//                   <div key={idx} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl mb-2 ml-4 sm:ml-8 border border-slate-700 hover:border-slate-600 transition-all">
//                     <div className="flex items-center gap-3">
//                       <VscPlayCircle className="text-yellow-400" />
//                       <span className="text-sm text-slate-300 font-medium">{sub.title}</span>
//                     </div>
//                     <a href={sub.videoUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-yellow-400 uppercase tracking-widest hover:underline">
//                       Preview
//                     </a>
//                   </div>
//                 ))}
                
//                 <LectureUploader section={section} courseData={courseData} setCourseData={setCourseData} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-between items-center mt-8">
//         <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors">
//           <VscChevronLeft /> Back to Course Info
//         </button>
//         <button onClick={handleNextStep} className="flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold px-10 py-3 rounded-2xl hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-400/10">
//           Next: Publish Settings <VscChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CourseBuilder;








// import React, { useState } from "react";
// import axios from "axios";
// import {
//   VscAdd,
//   VscChevronLeft,
//   VscChevronRight,
//   VscEdit,
//   VscTrash,
//   VscGripper,
//   VscPlayCircle,
// } from "react-icons/vsc";





// function LectureUploader({ section, courseData, setCourseData }) {
//   const [lectureName, setLectureName] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploading, setUploading] = useState(false);



//  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//   const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;




//   const uploadVideo = async () => {
//     if (!lectureName.trim() || !videoFile) {
//       return alert("Enter lecture title and select a video");
//     }

//     const formData = new FormData();
//     formData.append("file", videoFile);
//     formData.append("upload_preset",UPLOAD_PRESET); 

//     try {
//       setUploading(true);
//       const res = await axios.post(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, 
//         formData
//       );

//       // Add lecture to the section
//       const updatedSections = courseData.sections.map((sec) => {
//         if (sec.id === section.id) {
//           return {
//             ...sec,
//             subSections: [
//               ...sec.subSections,
//               { title: lectureName, videoUrl: res.data.secure_url },
//             ],
//           };
//         }
//         return sec;
//       });

//       setCourseData({ ...courseData, sections: updatedSections });
//       setLectureName("");
//       setVideoFile(null);
//     } catch (err) {
//       console.error("Video upload failed:", err);
//       alert("Upload failed. Try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const deleteLecture = (idx) => {
//     const updatedSections = courseData.sections.map((sec) => {
//       if (sec.id === section.id) {
//         const newSubSections = sec.subSections.filter((_, i) => i !== idx);
//         return { ...sec, subSections: newSubSections };
//       }
//       return sec;
//     });
//     setCourseData({ ...courseData, sections: updatedSections });
//   };

//   return (
//     <div className="flex flex-col gap-2 mt-2 ml-2 sm:ml-6">
//       <input
//         type="text"
//         placeholder="Lecture title"
//         value={lectureName}
//         onChange={(e) => setLectureName(e.target.value)}
//         className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm sm:text-base"
//       />
//       <input
//         type="file"
//         accept="video/*"
//         onChange={(e) => setVideoFile(e.target.files[0])}
//         className="text-sm"
//       />
//       <button
//         onClick={uploadVideo}
//         disabled={uploading}
//         className="flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-2 rounded hover:bg-yellow-500 mt-1"
//       >
//         <VscAdd /> {uploading ? "Uploading..." : "Add Lecture"}
//       </button>

//       {/* List of lectures */}
//       {section.subSections.length > 0 &&
//         section.subSections.map((sub, idx) => (
//           <div
//             key={idx}
//             className="flex items-center justify-between bg-slate-900/50 p-2 rounded mt-1"
//           >
//             <div className="flex items-center gap-2">
//               <VscPlayCircle className="text-yellow-400" />
//               <span>{sub.title}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               {sub.videoUrl && (
//                 <a
//                   href={sub.videoUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-sm text-blue-400 underline"
//                 >
//                   Watch
//                 </a>
//               )}
//               <button
//                 onClick={() => deleteLecture(idx)}
//                 className="text-red-400 hover:text-red-600"
//               >
//                 <VscTrash />
//               </button>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }

// function CourseBuilder({ setStep, courseData, setCourseData }) {
//   const [sectionName, setSectionName] = useState("");
//   const [editSectionId, setEditSectionId] = useState(null);

//   const handleCreateSection = () => {
//     if (!sectionName.trim()) return;

//     if (editSectionId) {
//       const updatedSections = courseData.sections.map((sec) =>
//         sec.id === editSectionId ? { ...sec, title: sectionName } : sec
//       );
//       setCourseData({ ...courseData, sections: updatedSections });
//       setEditSectionId(null);
//     } else {
//       const newSection = { id: Date.now(), title: sectionName, subSections: [] };
//       setCourseData({ ...courseData, sections: [...(courseData.sections || []), newSection] });
//     }
//     setSectionName("");
//   };

//   const deleteSection = (id) => {
//     const updatedSections = courseData.sections.filter((sec) => sec.id !== id);
//     setCourseData({ ...courseData, sections: updatedSections });
//   };

//   return (
//     <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//       {/* Section Builder */}
//       <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
//         <h2 className="text-lg sm:text-xl font-semibold mb-5">Course Builder</h2>

//         {/* Section Input */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-8">
//           <input
//             type="text"
//             value={sectionName}
//             onChange={(e) => setSectionName(e.target.value)}
//             placeholder="Add a section to build your course"
//             className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400/50"
//           />
//           <button
//             onClick={handleCreateSection}
//             className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition font-bold"
//           >
//             <VscAdd /> {editSectionId ? "Update Section" : "Create Section"}
//           </button>
//         </div>

//         {/* Sections */}
//         <div className="space-y-4">
//           {courseData?.sections?.length > 0 ? (
//             courseData.sections.map((section) => (
//               <div
//                 key={section.id}
//                 className="border border-slate-700 rounded-xl bg-slate-800/30 overflow-hidden"
//               >
//                 {/* Section Header */}
//                 <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-800/50 border-b border-slate-700">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <VscGripper className="text-slate-500 shrink-0" />
//                     <span className="text-sm sm:text-base font-medium truncate">
//                       {section.title}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 text-slate-400">
//                     <button
//                       onClick={() => {
//                         setEditSectionId(section.id);
//                         setSectionName(section.title);
//                       }}
//                       className="hover:text-yellow-400"
//                     >
//                       <VscEdit />
//                     </button>
//                     <button
//                       onClick={() => deleteSection(section.id)}
//                       className="hover:text-red-400"
//                     >
//                       <VscTrash />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Lectures */}
//                 <div className="p-4 space-y-3">
//                   {section.subSections.length > 0 ? (
//                     section.subSections.map((sub, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg ml-2 sm:ml-6 border-l-2 border-yellow-400/30"
//                       >
//                         <div className="flex items-center gap-3">
//                           <VscPlayCircle className="text-yellow-400" />
//                           <span className="text-xs sm:text-sm">{sub.title}</span>
//                         </div>
//                         {sub.videoUrl && (
//                           <a
//                             href={sub.videoUrl}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="text-sm text-blue-400 underline"
//                           >
//                             Watch
//                           </a>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-xs text-slate-500 italic ml-2 sm:ml-8">
//                       No lectures added yet.
//                     </p>
//                   )}

//                   {/* Lecture uploader */}
//                   <LectureUploader
//                     section={section}
//                     courseData={courseData}
//                     setCourseData={setCourseData}
//                   />
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl">
//               <p className="text-slate-500 text-sm">Your curriculum is empty. Start by creating a section.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Navigation */}
//       <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-slate-800">
//         <button
//           onClick={() => setStep(1)}
//           className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
//         >
//           <VscChevronLeft /> Back
//         </button>
//         <button
//           onClick={() => setStep(3)}
//           className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-500 transition"
//         >
//           Next Step <VscChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CourseBuilder;












// import React, { useState } from "react";
// import {
//   VscAdd,
//   VscChevronDown,
//   VscEdit,
//   VscTrash,
//   VscPlayCircle,
//   VscGripper,
//   VscChevronLeft,
//   VscChevronRight
// } from "react-icons/vsc";

// function CourseBuilder({ setStep, courseData, setCourseData }) {
//   const [sectionName, setSectionName] = useState("");
//   const [editSectionId, setEditSectionId] = useState(null);

//   const handleCreateSection = () => {
//     if (!sectionName.trim()) return;

//     if (editSectionId) {
//       const updatedSections = courseData.sections.map((sec) =>
//         sec.id === editSectionId ? { ...sec, title: sectionName } : sec
//       );
//       setCourseData({ ...courseData, sections: updatedSections });
//       setEditSectionId(null);
//     } else {
//       const newSection = {
//         id: Date.now(),
//         title: sectionName,
//         subSections: [],
//       };
//       const sections = courseData?.sections || [];
//       setCourseData({ ...courseData, sections: [...sections, newSection] });
//     }
//     setSectionName("");
//   };

//   const deleteSection = (id) => {
//     const updatedSections = courseData.sections.filter((sec) => sec.id !== id);
//     setCourseData({ ...courseData, sections: updatedSections });
//   };

//   return (
//     <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

//       {/* Builder Card */}
//       <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
//         <h2 className="text-lg sm:text-xl font-semibold mb-5">
//           Course Builder
//         </h2>

//         {/* Section Input */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-8">
//           <input
//             type="text"
//             value={sectionName}
//             onChange={(e) => setSectionName(e.target.value)}
//             placeholder="Add a section to build your course"
//             className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400/50"
//           />
//           <button
//             onClick={handleCreateSection}
//             className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition font-bold"
//           >
//             <VscAdd />
//             {editSectionId ? "Update Section" : "Create Section"}
//           </button>
//         </div>

//         {/* Sections */}
//         <div className="space-y-4">
//           {courseData?.sections?.length > 0 ? (
//             courseData.sections.map((section) => (
//               <div
//                 key={section.id}
//                 className="border border-slate-700 rounded-xl bg-slate-800/30 overflow-hidden"
//               >
//                 {/* Section Header */}
//                 <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-800/50 border-b border-slate-700">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <VscGripper className="text-slate-500 shrink-0" />
//                     <span className="text-sm sm:text-base font-medium truncate">
//                       {section.title}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-3 text-slate-400">
//                     <button
//                       onClick={() => {
//                         setEditSectionId(section.id);
//                         setSectionName(section.title);
//                       }}
//                       className="hover:text-yellow-400"
//                     >
//                       <VscEdit />
//                     </button>
//                     <button
//                       onClick={() => deleteSection(section.id)}
//                       className="hover:text-red-400"
//                     >
//                       <VscTrash />
//                     </button>
//                     <VscChevronDown className="cursor-pointer hover:text-white" />
//                   </div>
//                 </div>

//                 {/* Lectures */}
//                 <div className="p-4 space-y-3">
//                   {section.subSections.length > 0 ? (
//                     section.subSections.map((sub, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg ml-2 sm:ml-6 border-l-2 border-yellow-400/30"
//                       >
//                         <div className="flex items-center gap-3">
//                           <VscPlayCircle className="text-yellow-400" />
//                           <span className="text-xs sm:text-sm">
//                             {sub.title}
//                           </span>
//                         </div>
//                         <button className="text-slate-500 hover:text-red-400">
//                           <VscTrash />
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-xs text-slate-500 italic ml-2 sm:ml-8">
//                       No lectures added yet.
//                     </p>
//                   )}

//                   <button className="flex items-center gap-2 text-yellow-400 text-sm font-semibold mt-3 ml-2 sm:ml-6 hover:text-yellow-300 transition">
//                     <div className="bg-yellow-400/10 p-1 rounded">
//                       <VscAdd />
//                     </div>
//                     Add Lecture / Sub-section
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl">
//               <p className="text-slate-500 text-sm">
//                 Your curriculum is empty. Start by creating a section.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Navigation */}
//       <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-slate-800">
//         <button
//           onClick={() => setStep(1)}
//           className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
//         >
//           <VscChevronLeft /> Back
//         </button>
//         <button
//           onClick={() => setStep(3)}
//           className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-500 transition"
//         >
//           Next Step <VscChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CourseBuilder;
