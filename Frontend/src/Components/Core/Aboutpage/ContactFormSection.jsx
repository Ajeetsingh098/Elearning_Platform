
import ContactUsForm from '../../common/ContactUsForm'
import React from "react";

const ContactFormSection = () => {
  return (
    <div className="mx-auto w-full  ">
   
      <div className="rounded-2xl border border-richblack-700 bg-richblack-900 p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ">

       
        <div className="flex flex-col gap-2 mb-8 text-center">
          <h1 className="text-3xl font-semibold text-richblack-5">
            {/* Let's team up <br /> */}
            <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
               Get in Touch
            </span>
          </h1>
          <p className="text-richblack-300 text-sm md:text-base">
            We'd love to here from you, Please fill out this form.
          </p>
        </div>

        <div className="mt-5">
         <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;





// import ContactUsForm from '../../common/ContactUsForm'

// import React from "react";


// const ContactFormSection = () => {
//   return (
//     <div className="mx-auto flex flex-col items-center justify-center">
//       {/* Container with a modern card look */}
//       <div className="w-full rounded-3xl border border-richblack-700 bg-richblack-900 p-8 lg:p-14 shadow-[0_20px_50px_rgba(8,112,184,0.1)] hover:shadow-[0_20px_50px_rgba(8,112,184,0.2)] transition-all duration-500">
//         <div className="flex flex-col gap-3 mb-10 text-center">
//           <h1 className="text-4xl font-semibold text-richblack-5">
//             Got a Idea? We've got the skills. <br />
//             <span className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
//                Let's team up
//             </span>
//           </h1>
//           <p className="text-richblack-300">
//             Tell us more about yourself and what you're got in mind.
//           </p>
//         </div>

//         <div className="mt-7">
//           <ContactUsForm />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactFormSection;