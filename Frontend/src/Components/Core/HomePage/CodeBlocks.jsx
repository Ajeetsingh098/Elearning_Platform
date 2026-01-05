

import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGrandient,
  codeColor,
}) {
  return (
    <div
      className={`flex ${position} flex-col lg:flex-row my-16 items-center gap-10 w-full`}
    >
      {/* ================= LEFT SECTION ================= */}
      <div className="w-full lg:w-1/2 flex flex-col gap-5 text-center lg:text-left">
        {heading}

        <p className="text-slate-400 text-sm sm:text-base font-medium">
          {subheading}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mt-6">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* ================= RIGHT CODE SECTION ================= */}
      <div className="w-full lg:w-1/2">
        <div
          className={`relative flex rounded-xl border border-slate-700 bg-slate-900 shadow-xl`}
        >
          {/* Line Numbers */}
          <div className="flex flex-col items-center px-3 py-4 text-xs sm:text-sm font-semibold text-slate-500 select-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* Code Animation */}
          <div
            className={`flex-1 px-4 py-4 text-xs sm:text-sm font-mono ${codeColor}`}
          >
            <TypeAnimation
              sequence={[codeblock, 2000, ""]}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;










// import React from 'react'
// import CTAButton from '../HomePage/Button'
// import HighlightText from './HighlightText'
// import { FaArrowRight } from "react-icons/fa";
// import { TypeAnimation } from 'react-type-animation';
// function CodeBlocks({
//    position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGrandient,codeColor
// }) {
//   return (
//     <div className={`flex ${position} my-20 items-center gap-8 w-full`}>
//         {/* section 1 */}
//         <div className='w-full lg:w-1/2 flex flex-col gap-5'>
//             {heading}
//             <div className='text-slate-500 font-bold'>
//                 {subheading}
//             </div>

//             <div className='flex gap-7 mt-6'>

//               <CTAButton active={ctabtn1.active} linkto={ctabtn2.linkto}>
//                 <div className='flex gap-2 items-center'>
//                  {ctabtn1.btnText}
//                  <FaArrowRight></FaArrowRight>
//                 </div>
//               </CTAButton>
              
//               <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
               
//                  {ctabtn2.btnText}
            
//               </CTAButton>

//             </div>
//         </div>
//        {/* section 2 */}
//        <div className='h-fit flex flex-row text-10[px] w-full  lg:w-1/2 py-4 bg-black rounded-lg'>
//         {/* bg gradient */}
//         <div className='text-center flex flex-col w-[10%] font-bold font-inter text-slate-600'>
//             <p>1</p>
//             <p>2</p>
//             <p>3</p>
//             <p>4</p>
//             <p>5</p>
//             <p>6</p>
//             <p>7</p>
//             <p>8</p>
//             <p>9</p>
//             <p>10</p>
//         </div>
//         <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} p-2`}>
//             <TypeAnimation 
//             sequence={[codeblock,2000,""]}
//             repeat={Infinity}
//             cursor={true}
//             style={
//                 {
//                     whiteSpace:"pre-line",
//                     display:"block"
//                 }
//             }
//             omitDeletionAnimation={true}
//             >

//             </TypeAnimation>
//         </div>

//        </div>
//     </div>
//   )
// }

// export default CodeBlocks
