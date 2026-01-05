
import React from "react";
import Logo9 from "../../../assets/Logo9.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-20">
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-12">

        {/* LEFT – Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Become an{" "}
            <HighlightText text={"Instructor"} />
          </h2>

          <p className="text-slate-400 text-base max-w-md mx-auto lg:mx-0">
            Share your knowledge with learners around the world and build
            your teaching career with us.
          </p>

          <div className="flex justify-center lg:justify-start">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>

        {/* RIGHT – Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={Logo9}
            alt="Instructor"
            loading="lazy"
            className="w-full max-w-md rounded-xl shadow-lg object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default InstructorSection;



// import React from 'react'
// import Logo9 from "../../../assets/Logo9.png"
// import HighlightText from './HighlightText'
// import CTAButton from './Button'
// import { FaArrowRight } from 'react-icons/fa'


// function InstructorSection() {
//   return (
//     <div className='mt-10 '>
//       <div className='flex flex-row gap-7 items-center'>
//  <div className='w-full'>
//     <img src={Logo9} 
//      width={510} height={200} loading='lazy'
//     alt="InstructorImage" 
//      className='shadow-white'
//     />

//  </div>
//  <div className='w-[50%] flex flex-col gap-6'>
//        <div className='text-4xl font-bold'>
//         Become an
//         <HighlightText text={"Instructor"}></HighlightText>
//        </div>
//        <p className='font-medium text-[16px] w-[80%] text-slate-600'>
//             Instructor from arround the world  Instructor from arround the world 
//        </p>
//        <div >
//           <CTAButton active={true} linkto={"/signup"}>
//                 <div className='flex flex-row gap-2 items-center'>
//                     Start learning today
//                     <FaArrowRight></FaArrowRight>
//                 </div>
//        </CTAButton>
//        </div>
     
//  </div>
//       </div>
//     </div>
//   )
// }

// export default InstructorSection
