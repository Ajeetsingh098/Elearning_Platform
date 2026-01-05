
import React from "react";

import Logo1 from "../../../assets/Logo1.png";
import Logo2 from "../../../assets/Logo2.png";
import Logo3 from "../../../assets/Logo3.png";
import Logo4 from "../../../assets/Logo4.png";
import Logo5 from "../../../assets/Logo5.png";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success of the company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Taking ownership and delivering results",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "Adapting quickly to changing environments",
  },
  {
    logo: Logo4,
    heading: "Problem Solving",
    description: "Finding effective solutions efficiently",
  },
];

function TimeLineSection() {
  return (
    <section className="w-11/12 max-w-6xl mx-auto py-20">
      <div className="flex flex-col lg:flex-row items-center gap-12">

        {/* LEFT – Timeline */}
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 items-start p-4 rounded-xl bg-slate-900 hover:bg-slate-800 transition"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                <img
                  src={item.logo}
                  alt={item.heading}
                  className="w-6 h-6 object-contain"
                />
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold">
                  {item.heading}
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT – Image */}
        <div className="relative w-full lg:w-1/2">
          <img
            src={Logo5}
            alt="Office Work"
            loading="lazy"
            className="w-full rounded-xl object-cover shadow-lg"
          />

          {/* Stats Overlay */}
          <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 bg-green-800 rounded-xl flex text-white shadow-xl overflow-hidden">

            <div className="flex items-center gap-4 px-6 py-4 border-r border-green-700">
              <h1 className="text-3xl font-bold">10+</h1>
              <p className="text-sm text-green-200">
                Years of <br /> Experience
              </p>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <h1 className="text-3xl font-bold">250+</h1>
              <p className="text-sm text-green-200">
                Types of <br /> Courses
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default TimeLineSection;



// import React from 'react'

// import Logo1 from "../../../assets/Logo1.png"
// import Logo2 from "../../../assets/Logo2.png"
// import Logo3 from "../../../assets/Logo3.png"
// import Logo4 from "../../../assets/Logo4.png"
// import Logo5 from "../../../assets/Logo5.png"

// const timeline = [
//     {
//         logo: Logo1,
//         heading: "Leadership",
//         Description: "Fully committed to the success company"
//     },
//     {
//         logo: Logo2,
//         heading: "Responsbility",
//         Description: "Fully committed to the success company"
//     },
//     {
//         logo: Logo3,
//         heading: "Flexbility",
//         Description: "Fully committed to the success company"
//     },
//     {
//         logo: Logo4,
//         heading: "solve the Problem",
//         Description: "Fully committed to the success company"
//     },
// ]

// function TimeLineSection() {
//     return (
//         <div>
//             <div className='flex flex-row gap-15 items-center'>
//                 <div className='w-45% flex flex-col gap-5'>
//                     {
//                         timeline.map((element, index) => {
//                             return (
//                                 <div className='flex flex-row gap-6 ' key={index}>
//                                     <div className='w-12 h-12 bg-white flex items-center'>
//                                         <img src={element.logo} alt="image" />
//                                     </div>
//                                     <div>
//                                         <h2 className='font-semibold text-18px '>{element.heading}</h2>
//                                         <p className='text-base'>{element.Description}</p>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 <div className='relative shadow-blue-300  '>
//                     <img src={Logo5} alt="officeworkImage"
                    
//                       width={710} height={200} loading='lazy'
//                     // width="100%"
//                         className='shadow-white object-cover h-max '
//                     />

//                     <div className='absolute bg-green-800 flex flex-row text-white py-1 uppercase
//                      left-[50%] translate-x-[-50%] translate-y-[-50%]
//                     '>
//                         <div className='flex flex-row gap-5 items-center border-r border-green-800 px-7'>
//                             <h1 className='font-bold text-4xl'>10</h1>
//                             <h2 className='text-small text-green-500'>Year of Experiance</h2>
//                         </div>
//                         <div className='flex gap-5 items-center px-7'>
//                             <h1 className='font-bold text-4xl'>250</h1>
//                             <h2 className='text-small text-green-500'>YType of Courses</h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TimeLineSection
