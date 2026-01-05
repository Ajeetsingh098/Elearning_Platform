



import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Internal Components
import AddCourseStep1 from "./AddCourseStep1";
import CourseBuilder from "./CourseBuilder";
import PublishSettings from "./PublishSettings";

// Services
import { editCourseDetails } from "../../Services/operations/Course";

function AddCourses() {
   
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

  
    const [courseData, setCourseData] = useState({
        courseName: "",
        courseDescription: "",
        whatYouWillLearn: [],
        price: "",
        tag: "",
        thumbnailImage: null,
        courseContent: [], 
        isPublic: false,
    });

    const steps = [
        { id: 1, title: "Course Information" },
        { id: 2, title: "Course Builder" },
        { id: 3, title: "Publish" },
    ];


 const handleFinalSubmit = async () => {
  
    if (!courseData?._id) {
        toast.error("Please complete Step 1 first");
        return;
    }

    setLoading(true);
    const formData = new FormData();
    
   
    formData.append("courseId", courseData._id);
    
    
    const finalStatus = courseData.isPublic ? "Published" : "Draft";
    formData.append("status", finalStatus);

    try {
       
        const result = await editCourseDetails(formData, token);
        if (result) {
            toast.success("Course Published!");
            navigate("/dashboard/my-courses");
            setCourseData(null); 
            setStep(1);
        }
    } catch (error) {
       console.error("FINAL PUBLISH ERROR:", error);
    } finally {
        setLoading(false);
    }





    
};

    return (
        <div className="bg-slate-950 text-white px-4 py-10 min-h-screen">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Add Course</h1>

                {/* --- Stepper Progress Bar --- */}
                <div className="relative flex w-full justify-between mb-12">
                    {steps.map((item) => (
                        <div key={item.id} className="flex flex-col items-center flex-1 relative">
                            {/* Circle Indicator */}
                            <div className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                step === item.id
                                    ? "border-yellow-400 bg-slate-900 text-yellow-400"
                                    : step > item.id
                                        ? "border-yellow-400 bg-yellow-400 text-slate-900"
                                        : "border-slate-700 bg-slate-800 text-slate-500"
                            }`}>
                                {step > item.id ? <FaCheck className="text-sm" /> : item.id}
                            </div>
                            
                            {/* Step Title */}
                            <p className={`mt-2 text-sm font-medium ${step >= item.id ? "text-slate-100" : "text-slate-500"}`}>
                                {item.title}
                            </p>

                            {/* Connecting Line */}
                            {item.id !== steps.length && (
                                <div className={`absolute left-[50%] top-5 z-0 h-0.5 w-full border-b-2 border-dashed transition-all duration-500 ${
                                    step > item.id ? "border-yellow-400" : "border-slate-700"
                                }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* --- Step Forms --- */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
                    {step === 1 && (
                        <AddCourseStep1
                            setStep={setStep}
                            courseData={courseData}
                            setCourseData={setCourseData}
                        />
                    )}
                    {step === 2 && (
                        <CourseBuilder
                            setStep={setStep}
                            courseData={courseData}
                            setCourseData={setCourseData}
                        />
                    )}
                    {step === 3 && (
                        <PublishSettings
                            setStep={setStep}
                            onSubmit={handleFinalSubmit}
                            courseData={courseData}
                            setCourseData={setCourseData}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddCourses;