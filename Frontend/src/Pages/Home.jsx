

// import React from "react";
// import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";

// import HighlightText from "../Components/Core/HomePage/HighlightText";
// import CTAButton from "../Components/Core/HomePage/Button";
// import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
// import TimeLineSection from "../Components/Core/HomePage/TimeLineSection";
// import LearningComponent from "../Components/Core/HomePage/LearningComponent";
// import InstructorSection from "../Components/Core/HomePage/InstructorSection";
// import Footer from "../Components/common/Footer";

// import HomepageVideo from "../assets/HomepageVideo.mp4";

// function Home() {
//   return (
//     <div className="w-full bg-slate-900">
//       {/* ================= HERO SECTION ================= */}
//       <section className="relative mx-auto flex flex-col items-center w-11/12 max-w-7xl text-white">
//         {/* Become Instructor */}
//         <Link to="/signup" className="mt-16">
//           <div className="px-6 py-2 rounded-full bg-slate-700/60 backdrop-blur-md text-slate-200 font-medium hover:bg-slate-700 transition-all duration-300">
//             <div className="flex items-center gap-2">
//               Become an Instructor
//               <FaArrowRight />
//             </div>
//           </div>
//         </Link>

//         {/* Heading */}
//         <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold mt-8 leading-tight">
//           Empower Your Future With Our Courses by
//           <HighlightText text=" Coding Skills" />
//         </h1>

//         {/* Subheading */}
//         <p className="mt-5 max-w-2xl text-center text-base md:text-lg text-slate-400">
//           Learn coding at your own pace from anywhere in the world with industry-ready courses.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row gap-5 mt-10">
//           <CTAButton active={true} linkto="/signup">
//             Learn More
//           </CTAButton>
//           <CTAButton active={false} linkto="/login">
//             Book a Demo
//           </CTAButton>
//         </div>

//         {/* Video */}
//         <div className="mt-14 w-full max-w-4xl shadow-xl rounded-xl overflow-hidden">
//           <video
//             src={HomepageVideo}
//             muted
//             loop
//             autoPlay
//             playsInline
//             className="w-full object-cover"
//           />
//         </div>

//         {/* ================= CODE BLOCK SECTION 1 ================= */}
//         <div className="w-full max-w-7xl mt-20">
//           <CodeBlocks
//             position="lg:flex-row"
//             heading={
//               <div className="text-2xl lg:text-3xl font-semibold">
//                 Unlock Your <HighlightText text="Coding Potential" /> with Our Courses
//               </div>
//             }
//             subheading="Our courses are designed and taught by industry experts with years of real-world experience. Learn the skills that matter."
//             ctabtn1={{ btnText: "Try it Yourself", linkto: "/signup", active: true }}
//             ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
//             codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n</head>`}
//             codeColor="text-yellow-200"
//           />
//         </div>

//         {/* ================= CODE BLOCK SECTION 2 ================= */}
//         <div className="w-full max-w-7xl mt-20">
//           <CodeBlocks
//             position="lg:flex-row-reverse"
//             heading={
//               <div className="text-2xl lg:text-3xl font-semibold">
//                 Build Skills <HighlightText text="That Companies Need" />
//               </div>
//             }
//             subheading="Practice real-world coding problems and become job-ready with guided mentorship."
//             ctabtn1={{ btnText: "Start Learning", linkto: "/signup", active: true }}
//             ctabtn2={{ btnText: "Know More", linkto: "/login", active: false }}
//             codeblock={`function helloWorld() {\n  console.log("Hello World");\n}`}
//             codeColor="text-yellow-200"
//           />
//         </div>
//       </section>

//       {/* ================= WHITE SECTION ================= */}
//       <section className="bg-white text-slate-700 mt-24">
//         <div className="w-11/12 max-w-7xl mx-auto py-20 flex flex-col gap-16">
//           <div className="flex flex-col lg:flex-row gap-10 items-center">
//             <div className="text-3xl md:text-4xl font-semibold leading-snug lg:w-1/2">
//               Get the Skills You Need for a
//               <HighlightText text=" Job in Demand" />
//             </div>
//             <div className="lg:w-1/2 flex flex-col gap-6">
//               <p className="text-base leading-relaxed">
//                 Modern companies demand practical knowledge. Learn real-world skills and become a competitive developer.
//               </p>
//               <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
//             </div>
//           </div>

//           <TimeLineSection />
//           <LearningComponent />
//         </div>
//       </section>

//       {/* ================= INSTRUCTOR SECTION ================= */}
//       <section className="bg-slate-900 py-20 text-white">
//         <div className="w-11/12 max-w-7xl mx-auto flex flex-col gap-14">
//           <InstructorSection />

//           <h2 className="text-center text-2xl font-semibold">Reviews From Our Learners</h2>
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <Footer />
//     </div>
//   );
// }

// export default Home;




import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import HighlightText from "../Components/Core/HomePage/HighlightText";
import CTAButton from "../Components/Core/HomePage/Button";
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import TimeLineSection from "../Components/Core/HomePage/TimeLineSection";
import LearningComponent from "../Components/Core/HomePage/LearningComponent";
import InstructorSection from "../Components/Core/HomePage/InstructorSection";
import ReviewSlider from "../Components/common/ReviewSlider";
import Footer from "../Components/common/Footer";

import HomepageVideo from "../assets/HomepageVideo.mp4";

function Home() {
  return (
    <div className="w-full bg-slate-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative mx-auto flex flex-col items-center w-11/12 max-w-7xl text-white">
        <Link to="/signup" className="mt-16 group">
          <div className="px-6 py-2 rounded-full bg-slate-700/60 backdrop-blur-md text-slate-200 font-medium group-hover:bg-slate-700 transition-all duration-300 border border-slate-600 group-hover:border-slate-500">
            <div className="flex items-center gap-2">
              Become an Instructor
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold mt-8 leading-tight">
          Empower Your Future With Our Courses by
          <HighlightText text=" Coding Skills" />
        </h1>

        <p className="mt-5 max-w-2xl text-center text-base md:text-lg text-slate-400">
          Learn coding at your own pace from anywhere in the world with industry-ready courses.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 mt-10">
          <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
          <CTAButton active={false} linkto="/login">Book a Demo</CTAButton>
        </div>

        {/* Video with Glow Effect */}
        <div className="mt-14 w-full max-w-4xl relative">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25"></div>
          <div className="relative shadow-2xl rounded-xl overflow-hidden border border-slate-700">
            <video src={HomepageVideo} muted loop autoPlay playsInline className="w-full object-cover" />
          </div>
        </div>

        {/* CODE BLOCKS remain the same... */}
        <div className="w-full max-w-7xl mt-20">
          <CodeBlocks
            position="lg:flex-row"
            heading={
              <div className="text-2xl lg:text-3xl font-semibold">
                Unlock Your <HighlightText text="Coding Potential" /> with Our Courses
              </div>
            }
            subheading="Our courses are designed and taught by industry experts with years of real-world experience."
            ctabtn1={{ btnText: "Try it Yourself", linkto: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n</head>`}
            codeColor="text-yellow-200"
          />
        </div>
      </section>

      {/* ================= WHITE SECTION ================= */}
      <section className="bg-white text-slate-700 mt-24">
        <div className="w-11/12 max-w-7xl mx-auto py-20 flex flex-col gap-16">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="text-3xl md:text-4xl font-semibold leading-snug lg:w-1/2">
              Get the Skills You Need for a <HighlightText text=" Job in Demand" />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-6">
              <p className="text-base">Modern companies demand practical knowledge. Learn real-world skills and become a competitive developer.</p>
              <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
            </div>
          </div>
          <TimeLineSection />
          <LearningComponent />
        </div>
      </section>

     
      {/* ================= REVIEWS SECTION ================= */}
      <section className="bg-slate-900 py-20 text-white overflow-hidden">
        <div className="w-11/12 max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12">
            What Our <HighlightText text="Students Say" />
          </h2>
          <div className="w-full">
            <ReviewSlider />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;