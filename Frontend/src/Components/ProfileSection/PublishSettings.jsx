

import React, { useState, useEffect } from "react";
import { VscInfo, VscChevronLeft } from "react-icons/vsc";
import { MdCheckCircle } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function PublishSettings({ setStep, courseData, setCourseData, onSubmit, loading }) {
    // 1. Local state for the checkbox
    console.log("Current Course Data at Step 3:", courseData);
    const [isPublic, setIsPublic] = useState(courseData?.isPublic || false);


    useEffect(() => {
        setCourseData(prev => ({ ...prev, isPublic }));
    }, [isPublic, setCourseData]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                    <span className="bg-yellow-400 text-slate-900 h-6 w-6 rounded-full flex items-center justify-center text-xs">3</span>
                    Publish Settings
                </h2>

                {/* Course Summary Preview */}
                <div className="mb-8 p-6 bg-slate-800/40 border border-slate-700 rounded-xl space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Review Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p className="text-slate-300 text-sm">Title: <span className="text-white font-medium">{courseData?.courseName}</span></p>
                        <p className="text-slate-300 text-sm">Price: <span className="text-white font-medium">₹{courseData?.price}</span></p>
                        <p className="text-slate-300 text-sm">Sections: <span className="text-white font-medium">{courseData?.courseContent?.length || 0}</span></p>
                        {/* Visual indicator for thumbnail */}
                        <p className="text-slate-300 text-sm">Thumbnail:
                            <span className={courseData?.thumbnail ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
                                {courseData?.thumbnail ? " ✓ Uploaded" : " ✗ Missing"}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Checkbox Section */}
                <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer group p-4 bg-slate-800/20 rounded-xl border border-transparent hover:border-yellow-400/30 transition-all">
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={() => setIsPublic(!isPublic)}
                            className="w-6 h-6 rounded border-slate-700 bg-slate-800 text-yellow-400 accent-yellow-400 cursor-pointer"
                        />
                        <div className="flex flex-col">
                            <span className="text-slate-100 font-medium group-hover:text-yellow-400 transition">
                                Make this course public
                            </span>
                            <span className="text-slate-500 text-xs">
                                Once published, students can discover and enroll in this course.
                            </span>
                        </div>
                    </label>
                </div>

                <div className="mt-8 p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-xl flex gap-3">
                    <VscInfo className="text-yellow-400 text-xl shrink-0" />
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Ensure all sections have lectures before publishing. You can always edit content later from your dashboard.
                    </p>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end items-center gap-4 pt-4">
                <button
                    disabled={loading}
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition disabled:opacity-50 font-medium"
                >
                    <VscChevronLeft /> Back
                </button>

                <button
                    disabled={loading}
                    // onClick={onSubmit}
                    onClick={() => {
                        console.log("Submit clicked. Thumbnail is:", courseData?.thumbnail);
                        onSubmit({ ...courseData, isPublic });
                    }}

                    className="bg-yellow-400 text-slate-900 font-bold px-10 py-3 rounded-xl hover:bg-yellow-500 transition shadow-xl shadow-yellow-400/20 flex items-center gap-2 disabled:bg-slate-600"
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                    ) : (
                        <MdCheckCircle className="text-lg" />
                    )}
                    {loading ? "Publishing..." : "Finalize & Publish"}
                </button>
            </div>
        </div>
    );
}

export default PublishSettings;

















// import React, { useState, useEffect } from "react";
// import { VscInfo, VscChevronLeft } from "react-icons/vsc";
// import { MdCheckCircle } from "react-icons/md";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";

// function PublishSettings({ setStep, courseData, setCourseData, onSubmit, loading }) {
//     const [isPublic, setIsPublic] = useState(courseData?.isPublic || false);

//     // Sync the local checkbox state to the main course data object
//     useEffect(() => {
//         setCourseData(prev => ({ ...prev, isPublic }));
//     }, [isPublic, setCourseData]);

//     return (
//         <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
//             <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
//                 <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
//                     <span className="bg-yellow-400 text-slate-900 h-6 w-6 rounded-full flex items-center justify-center text-xs">3</span>
//                     Publish Settings
//                 </h2>

//                 {/* Course Summary Preview */}
//                 <div className="mb-8 p-6 bg-slate-800/40 border border-slate-700 rounded-xl space-y-3">
//                     <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Review Summary</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <p className="text-slate-300 text-sm">Title: <span className="text-white font-medium">{courseData.courseName}</span></p>
//                         <p className="text-slate-300 text-sm">Price: <span className="text-white font-medium">₹{courseData.price}</span></p>
//                         <p className="text-slate-300 text-sm">Sections: <span className="text-white font-medium">{courseData.sections?.length || 0}</span></p>
//                     </div>
//                 </div>

//                 {/* Checkbox Section */}
//                 <div className="space-y-4">
//                     <label className="flex items-center gap-4 cursor-pointer group p-4 bg-slate-800/20 rounded-xl border border-transparent hover:border-yellow-400/30 transition-all">
//                         <input
//                             type="checkbox"
//                             checked={isPublic}
//                             onChange={() => setIsPublic(!isPublic)}
//                             className="w-6 h-6 rounded border-slate-700 bg-slate-800 text-yellow-400 focus:ring-yellow-400/50 transition cursor-pointer accent-yellow-400"
//                         />
//                         <div className="flex flex-col">
//                             <span className="text-slate-100 font-medium group-hover:text-yellow-400 transition">
//                                 Make this course public
//                             </span>
//                             <span className="text-slate-500 text-xs">
//                                 Once checked, this course will be live on the student marketplace.
//                             </span>
//                         </div>
//                     </label>
//                 </div>

//                 {/* Information Box */}
//                 <div className="mt-8 p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-xl flex gap-3">
//                     <VscInfo className="text-yellow-400 text-xl shrink-0" />
//                     <p className="text-sm text-slate-400 leading-relaxed">
//                         By publishing, you agree to our Instructor Terms. Ensure your curriculum contains all promised videos and materials before finalizing.
//                     </p>
//                 </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-end items-center gap-4 pt-4">
//                 <button
//                     disabled={loading}
//                     onClick={() => setStep(2)}
//                     className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//                 >
//                     <VscChevronLeft /> Back
//                 </button>

//                 <button
//                     disabled={loading}
//                     onClick={onSubmit}
//                     className="bg-yellow-400 text-slate-900 font-bold px-10 py-3 rounded-xl hover:bg-yellow-500 transition shadow-xl shadow-yellow-400/20 flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-wait"
//                 >
//                     {loading ? (
//                         <AiOutlineLoading3Quarters className="animate-spin text-lg" />
//                     ) : (
//                         <MdCheckCircle className="text-lg" />
//                     )}
//                     {loading ? "Publishing..." : "Finalize & Publish"}
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default PublishSettings;











// import React, { useState } from "react";
// import { VscInfo } from "react-icons/vsc";
// import { MdCheckCircle } from "react-icons/md";

// function PublishSettings({ setStep, courseData, setCourseData, onSubmit }) {
//     const [isPublic, setIsPublic] = useState(courseData?.isPublic || false);


//     React.useEffect(() => {
//         setCourseData(prev => ({ ...prev, isPublic }));
//     }, [isPublic, setCourseData]);

//     return (
//         <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//             <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
//                 <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
//                     Publish Settings
//                 </h2>

//                 {/* Checkbox Section */}
//                 <div className="space-y-4">
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                         <input
//                             type="checkbox"
//                             checked={isPublic}
//                             onChange={() => setIsPublic(!isPublic)}
//                             className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-yellow-400 focus:ring-yellow-400/50 transition cursor-pointer"
//                         />
//                         <span className="text-slate-300 group-hover:text-white transition">
//                             Make this course public once published
//                         </span>
//                     </label>
//                 </div>

//                 {/* Information Box */}
//                 <div className="mt-8 p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-xl flex gap-3">
//                     <VscInfo className="text-yellow-400 text-xl shrink-0" />
//                     <p className="text-sm text-slate-400 leading-relaxed">
//                         By publishing this course, it will be visible to all students on the platform.
//                         Ensure your curriculum is complete and thumbnails are high quality.
//                     </p>
//                 </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-end gap-4">
//                 <button
//                     onClick={() => setStep(2)}
//                     className="px-8 py-3 cursor-pointer rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700 transition"
//                 >
//                     Back
//                 </button>

//                 <button
//                     onClick={() => {

//                         // if (!courseData?.courseContent?.length) {
//                         //     console.log("at least one section before")
//                         //     alert("Add at least one section before publishing!");
//                         //     return;
//                         // }
//                         onSubmit();
//                     }}
//                     className="bg-yellow-400 text-slate-900 font-bold px-10 py-3 rounded-xl hover:bg-yellow-500 transition shadow-lg shadow-yellow-400/30 flex items-center gap-2"
//                 >
//                     <MdCheckCircle className="text-lg cursor-pointer" /> Finalize & Publish
//                 </button>


//             </div>
//         </div>
//     );
// }

// export default PublishSettings;