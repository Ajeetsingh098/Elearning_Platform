

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscAdd, VscEdit, VscTrash, VscCheck, VscHistory, VscPlayCircle } from "react-icons/vsc";
import { toast } from "react-hot-toast";


import { fetchInstructorCourses, deleteCourse } from "../../Services/operations/Course";

function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    try {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
      toast.error("Could not fetch courses");
    }
    setLoading(false);
  };

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    setLoading(true);
    const result = await deleteCourse({ courseId: courseId }, token);
    
    if (result) {
      toast.success("Course Deleted");
      setCourses(courses.filter((course) => course._id !== courseId));
    }
    setLoading(false);
  };



// const handleWatchCourse = (course) => {
//   const sectionId = course?.courseContent?.[0]?._id;
//   const subSectionId = course?.courseContent?.[0]?.subSections?.[0]?._id;

//   if (!sectionId || !subSectionId) {
//     toast.error("This course has no published content yet.");
//     return;
//   }

//   navigate(`/view-course/${course._id}/section/${sectionId}/sub-section/${subSectionId}`);
// };

const handleWatchCourse = (course) => {
  console.log("DEBUGGING COURSE DATA:", course);
  
 
  const sectionId = course?.courseContent?.[0]?._id;
  

  const subSectionId = course?.courseContent?.[0]?.subSections?.[0]?._id; 
                     

  if (!sectionId || !subSectionId) {
    console.error("IDs are missing!", { sectionId, subSectionId });
    toast.error("Course content data is missing from the server response.");
    return;
  }

  navigate(`/view-course/${course._id}/section/${sectionId}/sub-section/${subSectionId}`);
};






  return (
    <div className="bg-slate-950 min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your curriculum and watch your content</p>
          </div>
          <Link
            to="/dashboard/add-courses"
            className="flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/10"
          >
            <VscAdd size={20} /> Create New Course
          </Link>
        </div>

        {loading ? (
          <div className="grid h-[50vh] place-items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : courses?.length > 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Course</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div 
                          className="flex items-center gap-4 cursor-pointer"
                          onClick={() => navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSections?.[0]?._id}`)}
                        >
                          <div className="relative flex">
                            <img
                              src={course.thumbnail}
                              alt="thumbnail"
                              className="h-14 w-24 rounded-lg object-cover border border-slate-700 shadow-sm group-hover:opacity-50 transition-opacity"
                            />
                            <VscPlayCircle className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 text-yellow-400" size={24} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-100 group-hover:text-yellow-400 transition-colors">
                              {course.courseName}
                            </span>
                            <span className="text-xs text-slate-500 line-clamp-1">
                              {course.courseDescription}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-200 font-medium">
                        ₹{course.price}
                      </td>
                      <td className="px-6 py-5">
                        {course.status === "Published" ? (
                          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-tighter">
                            <VscCheck /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase tracking-tighter">
                            <VscHistory /> Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                        
                          {/* VIEW/WATCH BUTTON */}
                          <button
                            onClick={() => handleWatchCourse(course)}
                            className="p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500 text-blue-500 hover:text-white transition-all"
                            title="Watch Course"
                          >
                            <VscPlayCircle size={18} />
                          </button>
                          
                          <button
                            onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                            className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                            title="Edit Course"
                          >
                            <VscEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500 text-red-500 hover:text-white transition-all"
                            title="Delete Course"
                          >
                            <VscTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl border-dashed">
            <p className="text-slate-500">You haven't created any courses yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses;










// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { VscAdd, VscEdit, VscTrash, VscCheck, VscHistory } from "react-icons/vsc";
// import { toast } from "react-hot-toast";
// import { fetchInstructorCourses, deleteCourse } from "../../Services/operations/Course";

// function MyCourses() {
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const getCourses = async () => {
//     setLoading(true);
//     try {
//         const result = await fetchInstructorCourses(token);
//         if (result) {
//             setCourses(result);
//         }
//     } catch (error) {
//         console.error("Failed to fetch courses", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     getCourses();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleDelete = async (courseId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this course?");
//     if (!confirmDelete) return;

//     setLoading(true);
//     const result = await deleteCourse({ courseId: courseId }, token);
    
//     if (result) {
//         toast.success("Course Deleted");
//         // Refresh local state without a full page reload
//         setCourses(courses.filter((course) => course._id !== courseId));
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="bg-slate-950 min-h-screen text-white p-4 sm:p-8">
//       {/* Rest of your JSX remains the same */}
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
//           <div>
//             <h1 className="text-3xl font-bold">My Courses</h1>
//             <p className="text-slate-400 text-sm mt-1">Manage your curriculum and course status</p>
//           </div>
//           <Link
//             to="/dashboard/add-course"
//             className="flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/10"
//           >
//             <VscAdd size={20} /> Create New Course
//           </Link>
//         </div>

//         {loading ? (
//           <div className="grid h-[50vh] place-items-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
//           </div>
//         ) : courses?.length > 0 ? (
//           <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-slate-800 text-slate-400 text-sm uppercase tracking-wider">
//                     <th className="px-6 py-4 font-semibold">Course</th>
//                     <th className="px-6 py-4 font-semibold">Price</th>
//                     <th className="px-6 py-4 font-semibold">Status</th>
//                     <th className="px-6 py-4 font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-800/50">
//                   {courses.map((course) => (
//                     <tr key={course._id} className="hover:bg-slate-800/30 transition-colors group">
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-4">
//                           <img
//                             src={course.thumbnail}
//                             alt="thumbnail"
//                             className="h-14 w-24 rounded-lg object-cover border border-slate-700 shadow-sm"
//                           />
//                           <div className="flex flex-col">
//                             <span className="font-bold text-slate-100 group-hover:text-yellow-400 transition-colors">
//                               {course.courseName}
//                             </span>
//                             <span className="text-xs text-slate-500 line-clamp-1">
//                               {course.courseDescription}
//                             </span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5 text-slate-200 font-medium">
//                         ₹{course.price}
//                       </td>
//                       <td className="px-6 py-5">
//                         {course.status === "Published" ? (
//                           <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-tighter">
//                             <VscCheck /> Published
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase tracking-tighter">
//                             <VscHistory /> Draft
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-3">
//                           <button
//                             onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
//                             className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//                             title="Edit Course"
//                           >
//                             <VscEdit size={18} />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(course._id)}
//                             className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500 text-red-500 hover:text-white transition-all"
//                             title="Delete Course"
//                           >
//                             <VscTrash size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl border-dashed">
//             <p className="text-slate-500">You haven't created any courses yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyCourses;