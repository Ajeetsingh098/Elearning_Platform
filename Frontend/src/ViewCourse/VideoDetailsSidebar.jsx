
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    entireCourseData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData || courseSectionData.length === 0) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      if (currentSectionIndex === -1) return;

      // Robust check for subSection or subSections
      const subSecData = courseSectionData[currentSectionIndex]?.subSection ||
        courseSectionData[currentSectionIndex]?.subSections || [];

      const currentSubSectionIndex = subSecData.findIndex(
        (data) => data._id === subSectionId
      );

      const activeSubSectionId = subSecData[currentSubSectionIndex]?._id;

      setActiveStatus(courseSectionData[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, entireCourseData, location.pathname, sectionId, subSectionId]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-87.5 flex-col border-r border-r-slate-700 bg-slate-800">
      {/* Header Section */}
      <div className="mx-5 flex flex-col items-start justify-between gap-y-4 border-b border-slate-600 py-5 text-lg font-bold text-slate-200">
        <div className="flex w-full items-center justify-between">
          <div
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-8.75 w-8.75 items-center justify-center rounded-full bg-slate-100 p-1 text-slate-700 hover:scale-90 cursor-pointer transition-all duration-200"
            title="Back"
          >
            <IoIosArrowBack size={30} />
          </div>
          <button
            onClick={() => setReviewModal(true)}
            className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-md text-sm font-bold"
          >
            Add Review
          </button>
        </div>
        <div className="flex flex-col">
          <p className="line-clamp-1">{entireCourseData?.courseName}</p>
          <p className="text-sm font-semibold text-slate-400">
            {completedLectures?.length} / {totalNoOfLectures} Lectures Completed
          </p>
        </div>
      </div>

      {/* Sections and Subsections List */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto px-2">
        {courseSectionData?.map((section, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-slate-50"
            key={index}
            onClick={() => setActiveStatus(section?._id)}
          >
            {/* Section Header */}
            <div className="flex flex-row justify-between bg-slate-700 px-5 py-4 transition-all duration-500 rounded-lg">
              <div className="w-[70%] font-semibold">{section?.sectionName}</div>
              <div className="flex items-center gap-3">
                <span
                  className={`${activeStatus === section?._id ? "rotate-0" : "rotate-180"
                    } transition-all duration-500`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {/* Sub-sections Logic Updated */}
            {activeStatus === section?._id && (
              <div className="transition-all duration-500 ease-in-out">
                {(section?.subSection || section?.subSections || []).map((topic, i) => (
                  <div
                    className={`flex gap-3 px-5 py-3 mt-1 rounded-md transition-colors ${videoBarActive === topic._id
                        ? "bg-yellow-400 font-semibold text-slate-900"
                        : "hover:bg-slate-900 text-white"
                      }`}
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      const sID = typeof topic === "string" ? topic : topic?._id;
                      if (sID) {
                        navigate(
                          `/view-course/${entireCourseData?._id}/section/${section?._id}/sub-section/${sID}`
                        );
                        setVideoBarActive(sID);
                      } else {
                        console.error("Sub-section ID is missing!", topic);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(topic?._id)}
                      readOnly
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}







// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import { BsChevronDown } from "react-icons/bs";

// export default function VideoDetailsSidebar({ setReviewModal }) {
//   const [activeStatus, setActiveStatus] = useState("");
//   const [videoBarActive, setVideoBarActive] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { sectionId, subSectionId } = useParams();

//   // Get data from Redux slice
// const {
//   courseSectionData,
//   entireCourseData,
//   totalNoOfLectures,
//   completedLectures,
// } = useSelector((state) => state.viewCourse);

// useEffect(() => {
//   (() => {
//     // If no sections exist yet (like in your current DB state), stop here
//     if (!courseSectionData || courseSectionData.length === 0) return;

//     // Find current section index
//     const currentSectionIndex = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     );

//     // If sectionId isn't in URL or not found, don't proceed to find subsections
//     if (currentSectionIndex === -1) return;

//     // Find current sub-section index
//     const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
//       (data) => data._id === subSectionId
//     );

//     const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id;

//     // Set active states
//     setActiveStatus(courseSectionData[currentSectionIndex]?._id);
//     setVideoBarActive(activeSubSectionId);
//   })();
//   // Make sure to use the correct variable name here too
// }, [courseSectionData, entireCourseData, location.pathname, sectionId, subSectionId]);




//   return (
//     <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-87.5 flex-col border-r border-r-slate-700 bg-slate-800">
//       {/* 1. Header with Buttons */}
//       <div className="mx-5 flex flex-col items-start justify-between gap-y-4 border-b border-slate-600 py-5 text-lg font-bold text-slate-200">
//         <div className="flex w-full items-center justify-between">
//           <div
//             onClick={() => navigate(`/dashboard/enrolled-courses`)}
//             className="flex h-8.75 w-8.75 items-center justify-center rounded-full bg-slate-100 p-1 text-slate-700 hover:scale-90 cursor-pointer transition-all duration-200"
//             title="Back"
//           >
//             <IoIosArrowBack size={30} />
//           </div>
//           <button
//             onClick={() => setReviewModal(true)}
//             className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-md text-sm font-bold"
//           >
//             Add Review
//           </button>
//         </div>
//         <div className="flex flex-col">
//           <p>{entireCourseData?.courseName}</p>
//           <p className="text-sm font-semibold text-slate-400">
//             {completedLectures?.length} / {totalNoOfLectures} Lectures Completed
//           </p>
//         </div>
//       </div>

//       {/* 2. Sections and Subsections List */}
//       <div className="h-[calc(100vh - 5rem)] overflow-y-auto px-2">
//         {courseSectionData.map((section, index) => (
//           <div
//             className="mt-2 cursor-pointer text-sm text-slate-50"
//             key={index}
//             onClick={() => setActiveStatus(section?._id)}
//           >
//             {/* Section Header */}
//             <div className="flex flex-row justify-between bg-slate-700 px-5 py-4 transition-all duration-500">
//               <div className="w-[70%] font-semibold">{section?.sectionName}</div>
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`${
//                     activeStatus === section?._id ? "rotate-0" : "rotate-180"
//                   } transition-all duration-500`}
//                 >
//                   <BsChevronDown />
//                 </span>
//               </div>
//             </div>

//             {/* Sub-sections (Videos) */}
//             {activeStatus === section?._id && (
//               <div className="transition-[height] duration-500 ease-in-out">
//                 {section.subSection.map((topic, i) => (
//                   <div
//                     className={`flex gap-3 px-5 py-2 ${
//                       videoBarActive === topic._id
//                         ? "bg-yellow-400 font-semibold text-slate-900"
//                         : "hover:bg-slate-900 text-white"
//                     }`}
//                     key={i}
//                     onClick={() => {
//                       navigate(
//                         `/view-course/${entireCourseData?._id}/section/${section?._id}/sub-section/${topic?._id}`
//                       );
//                       setVideoBarActive(topic._id);
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={completedLectures.includes(topic?._id)}
//                       onChange={() => {}}
//                     />
//                     <span>{topic.title}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
