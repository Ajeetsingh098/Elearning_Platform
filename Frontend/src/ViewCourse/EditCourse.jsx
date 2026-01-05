import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getFullDetailsOfCourse, editCourseDetails} from "../Services/operations/Course";
import AddCourseStep1 from "../Components/ProfileSection/AddCourseStep1";
import CourseBuilder from "../Components/ProfileSection/CourseBuilder";
import PublishSettings from "../Components/ProfileSection/PublishSettings";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-hot-toast";

export default function EditCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);

useEffect(() => {
    const getDetails = async () => {
        setLoading(true);
       
        const result = await getFullDetailsOfCourse(courseId, token);
        
        if (result) {
           
            setCourse(result?.courseDetails || result); 
        }
        setLoading(false);
    };
    getDetails();
}, [courseId, token]);

  const handleFinalSubmit = async () => {
    setBtnLoading(true);
    const formData = new FormData();
    
    formData.append("courseId", course._id);
    formData.append("status", course.isPublic ? "Published" : "Draft");

   
    if (course.thumbnailImage instanceof File) {
      formData.append("thumbnailImage", course.thumbnailImage);
    }

    try {
      const result = await editCourseDetails(formData, token);
      if (result) {
        toast.success("Course Updated Successfully");
        navigate("/dashboard/my-courses");
      }
    } catch (error) {
      console.error("EDIT COURSE ERROR", error);
      toast.error("Could not update course");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid h-screen place-items-center bg-slate-950">
        <VscLoading className="animate-spin text-4xl text-yellow-400" />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Course</h1>
        
        {course ? (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
            {step === 1 && (
              <AddCourseStep1 
                editCourse={true} 
                courseData={course} 
                setCourseData={setCourse} 
                setStep={setStep} 
              />
            )}
            {step === 2 && (
              <CourseBuilder 
                courseData={course} 
                setCourseData={setCourse} 
                setStep={setStep} 
              />
            )}
            {step === 3 && (
              <PublishSettings 
                courseData={course} 
                setCourseData={setCourse} 
                setStep={setStep} 
                onSubmit={handleFinalSubmit}
                loading={btnLoading}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-slate-400">Course not found</p>
          </div>
        )}
      </div>
    </div>
  );
}