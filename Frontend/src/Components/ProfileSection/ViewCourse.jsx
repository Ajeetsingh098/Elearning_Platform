




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../Services/operations/Course";
import { 
    setCompletedLectures, 
    setCourseSectionData, 
    setEntireCourseData, 
    setTotalNoOfLectures 
} from "../../Slices/viewCourseSlice";
import VideoDetailsSidebar from "../../ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../../ViewCourse/CourseReviewModal";

export default function ViewCourse() {
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { entireCourseData } = useSelector((state) => state.viewCourse);
    const dispatch = useDispatch();
    const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await getFullDetailsOfCourse(courseId, token);
                const details = response?.courseDetails || response?.data?.courseDetails;
                const completedVideos = response?.completedVideos || response?.data?.completedVideos || [];

                if (details) {
                    dispatch(setCourseSectionData(details.courseContent || []));
                    dispatch(setEntireCourseData(details));
                    dispatch(setCompletedLectures(completedVideos));
                    
                    let lectures = 0;
                    details.courseContent?.forEach((sec) => {
                        const subSecs = sec.subSection || sec.subSections || [];
                        lectures += subSecs.length;
                    });
                    dispatch(setTotalNoOfLectures(lectures));
                }
            } catch (error) {
                console.error("Could not fetch course details:", error);
            }
        };

        if (courseId && token) {
            fetchCourseData();
        }
    }, [courseId, token, dispatch]);

   
    if (!entireCourseData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-400"></div>
            </div>
        );
    }

    return (
        <>
           
            <div className="relative flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)] bg-slate-900">
                
               
                <div className="w-full lg:w-[320px] lg:max-w-87.5 border-b lg:border-b-0 lg:border-r border-slate-800">
                    <VideoDetailsSidebar setReviewModal={setReviewModal} />
                </div>

               
                <div className="flex-1 h-full overflow-auto">
                    <div className="mx-auto w-11/12 max-w-250 py-6 lg:py-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
    );
}





