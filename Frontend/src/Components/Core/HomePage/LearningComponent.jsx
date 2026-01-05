
import React from "react";
import HighlightText from "./HighlightText";
import Logo6 from "../../../assets/Logo6.png";
import Logo7 from "../../../assets/Logo7.png";
import CTAButton from "./Button";

function LearningComponent() {
  return (
    <section className="w-11/12 max-w-6xl mx-auto mt-16 mb-16">
      <div className="flex flex-col items-center gap-6 text-center">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Your Swiss Knife for{" "}
          <HighlightText text="Learning any language" />
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl">
          Using Spin makes learning multiple languages easy and effective.
          Track progress, compare skills, and grow faster with structured paths.
        </p>

        {/* Images */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full">
          <img
            src={Logo7}
            alt="Compare Learning"
            loading="lazy"
            className="w-60 sm:w-70 lg:w-[320px] object-contain"
          />

          <img
            src={Logo6}
            alt="Track Progress"
            loading="lazy"
            className="w-60 sm:w-70 lg:w-[320px] object-contain"
          />
        </div>

        {/* CTA */}
        <div className="mt-8">
          <CTAButton active={true} linkto="/signup">
            <span className="px-2">Learn More</span>
          </CTAButton>
        </div>

      </div>
    </section>
  );
}

export default LearningComponent;







// import React from 'react'
// import HighlightText from './HighlightText'
// import Logo6 from "../../../assets/Logo6.png"
// import Logo7 from "../../../assets/Logo7.png"
// import Logo8 from "../../../assets/Logo8.png"
// import CTAButton from './Button'
// function LearningComponent() {
//     return (
//         <div className='mt-18 mb-8 w-11/12'>

//             <div className='flex flex-col gap-5 items-center'>
//                 <div className='text-4xl text-center'>
//                     Your Swiss Knife for
//                     <HighlightText text={"Learning any language"}></HighlightText>
//                 </div>
//                 <div className='text-center text-slate-600 mx-auto text-base mt-3 font-medium w-[50%]'>
//                     using spin making learning multiple language easy  using spin making learning multiple language easy
//                 </div>
//                 <div className='flex flex-row items-center justify-center gap-3 mt-5 w-11/12'>
//                     <img src={Logo7} alt="Compare image"
//                      width={310} height={200} loading='lazy'
//                     className='object-contain '/>

//                      {/* <img src={Logo8} alt="Compare image"  width="50%" height="50%"
//                     className='object-contain'/> */}

//                      <img src={Logo6} alt="Know Your Progress" 
//                        width={310} height={200} loading='lazy'
//                     className='object-contain'/>
//                 </div>
//                 <CTAButton active={true} linkto={"/signup"}>
//            <div className='w-fit'>
//            Learn More
//            </div>
//                 </CTAButton>
//             </div>

//         </div>
//     )
// }

// export default LearningComponent
