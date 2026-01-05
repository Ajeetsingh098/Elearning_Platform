import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../slices/viewCourseSlice";

const VideoDetails = () => {
  const { sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  const { courseSectionData, completedLectures } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (!courseSectionData || courseSectionData.length === 0) return;
      
      const section = courseSectionData.find((sec) => sec._id === sectionId);
      const subSection = section?.subSections.find((sub) => sub._id === subSectionId);
      
      setVideoData(subSection);
      setVideoEnded(false);
    };
    setVideoSpecificDetails();
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

 const handleMarkAsCompleted = () => {
    if (subSectionId) {
        dispatch(updateCompletedLectures(subSectionId));
       
    }
};

  return (
    <div className="flex flex-col gap-5 text-white mt-5 p-4">
      {!videoData ? (
        <div className="text-center text-2xl font-semibold py-10 text-slate-500">
          Select a lecture to start watching
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          {/* Video Container */}
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-full"
              src={videoData?.videoUrl}
              onEnded={() => setVideoEnded(true)}
              controls
              playsInline
            >
              Your browser does not support the video tag.
            </video>

            {/* End Screen Overlay */}
            {videoEnded && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 transition-all">
                <div className="flex flex-col gap-4 text-center">
                  <h2 className="text-xl font-bold mb-2">Lecture Finished!</h2>
                  
                  {!completedLectures.includes(subSectionId) && (
                    <button
                      onClick={handleMarkAsCompleted}
                      className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform"
                    >
                      Mark As Completed
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setVideoEnded(false);
                    }}
                    className="bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                  >
                    Rewatch
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Title & Description Area */}
          <div className="mt-8 border-t border-slate-800 pt-6">
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
              {videoData?.title}
            </h1>
            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <p className="text-slate-400 leading-relaxed">
                {videoData?.description || "No description provided for this lecture."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;