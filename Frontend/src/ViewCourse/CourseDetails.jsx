import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCourseDetails } from "../Services/operations/Course"
// import { buyCourse } from "../Services/operations/studentFeaturesAPI"
import { addToCart } from "../Slices/cartSlice"
import toast from "react-hot-toast"

const CourseDetails = () => {
  const { courseId } = useParams() 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [courseData, setCourseData] = useState(null)

  useEffect(() => {
    const getFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId)
        setCourseData(result)
      } catch (error) {
        console.error("Could not fetch course details")
      }
    }
    getFullDetails()
  }, [courseId])

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
    } else {
      navigate("/login")
    }
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === "Instructor") {
        toast.error("You are an Instructor. You can't buy a course.")
        return
    }
    if (token) {
        dispatch(addToCart(courseData))
        return
    }
    navigate("/login")
  }

  if (!courseData) return <div className="spinner"></div>

 
  const firstVideoUrl = courseData?.courseContent?.[0]?.subSections?.[0]?.videoUrl

  return (
    <div className="bg-slate-900 text-white min-h-screen pt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 p-6">
        
        {/*  Course Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{courseData.courseName}</h1>
          <p className="text-slate-400 mt-4 text-lg">{courseData.courseDescription}</p>
          
          {/* --- FIRST VIDEO PREVIEW --- */}
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-700 bg-black shadow-2xl">
            {firstVideoUrl ? (
                <video 
                    src={firstVideoUrl} 
                    controls 
                    className="w-full max-h-100 object-contain"
                    poster={courseData.thumbnail}
                />
            ) : (
              <div className="relative">
            <img src={courseData?.thumbnail} className="w-full opacity-50" />
            <p className="absolute inset-0 flex items-center justify-center text-slate-400">
                Preview not available
            </p>
        </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold border-b border-slate-700 pb-2">Curriculum</h2>
            {courseData.courseContent?.map((section) => (
              <div key={section._id} className="mt-4 bg-slate-800 p-4 rounded-lg">
                <p className="font-bold text-yellow-400">{section.sectionName}</p>
                {section.subSections?.map((sub) => (
                  <p key={sub._id} className="text-slate-300 ml-4 mt-1 flex items-center gap-2">
                    <span className="text-xs">🎥</span> {sub.title}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/*  Purchase Card */}
        <div className="w-full md:w-80 bg-slate-800 p-6 rounded-2xl h-fit sticky top-24 border border-slate-700 shadow-xl">
          <img src={courseData.thumbnail} alt="course" className="rounded-xl w-full" />
          <p className="text-3xl font-bold mt-4">₹{courseData.price}</p>
          
          <button 
            onClick={handleBuyCourse}
            className="w-full bg-yellow-400 cursor-pointer text-black font-bold py-3 rounded-xl mt-6 hover:bg-yellow-300 transition-all"
          >
            Buy Now
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="w-full border cursor-pointer border-slate-600 py-3 rounded-xl mt-3 hover:bg-slate-700 transition-all font-semibold"
          >
            Add to Cart
          </button>
          
          <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest">
            Full Lifetime Access
          </p>
        </div>

      </div>
    </div>
  )
}

export default CourseDetails




// import React, { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchCourseDetails } from "../Services/operations/Course"
// // import { buyCourse } from "../Services/operations/studentFeaturesAPI"
// import RatingStars from "../utils/RatingStars"

// const CourseDetails = () => {
//   const { courseId } = useParams() 
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)

//   const [courseData, setCourseData] = useState(null)

//   useEffect(() => {
//     const getFullDetails = async () => {
//       try {
//         const result = await fetchCourseDetails(courseId)
//         console.log("Course Data fetched: ", result)
//         setCourseData(result)
//       } catch (error) {
//         console.error("Could not fetch course details")
//       }
//     }
//     getFullDetails()
//   }, [courseId])

//   const handleBuyCourse = () => {
//     if (token) {
//       buyCourse(token, [courseId], user, navigate, dispatch)
//     } else {
//       navigate("/login")
//     }
//   }

//   if (!courseData) return <div className="spinner"></div>

//   return (
//     <div className="bg-slate-900 text-white min-h-screen pt-20">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 p-6">
        
//         {/* Course Info */}
//         <div className="flex-1">
//           <h1 className="text-4xl font-bold">{courseData.courseName}</h1>
//           <p className="text-slate-400 mt-4 text-lg">{courseData.courseDescription}</p>
          
//           <div className="mt-8">
//             <h2 className="text-2xl font-bold border-b border-slate-700 pb-2">Curriculum</h2>
//             {courseData.courseContent?.map((section) => (
//               <div key={section._id} className="mt-4 bg-slate-800 p-4 rounded-lg">
//                 <p className="font-bold text-yellow-400">{section.sectionName}</p>
//                 {section.subSections?.map((sub) => (
//                   <p key={sub._id} className="text-slate-300 ml-4 mt-1">🎥 {sub.title}</p>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Purchase Card */}
//         <div className="w-full md:w-87.5 bg-slate-800 p-6 rounded-2xl h-fit sticky top-24 border border-slate-700 shadow-xl">
//           <img src={courseData.thumbnail} alt="course" className="rounded-xl w-full" />
//           <p className="text-3xl font-bold mt-4">₹{courseData.price}</p>
//           <button 
//             onClick={handleBuyCourse}
//             className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl mt-6 hover:bg-yellow-300 transition-all"
//           >
//             Buy Now
//           </button>
//           <button className="w-full border border-slate-600 py-3 rounded-xl mt-3 hover:bg-slate-700 transition-all">
//             Add to Cart
//           </button>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default CourseDetails