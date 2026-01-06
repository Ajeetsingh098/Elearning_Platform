import React from 'react'
import ContactFormSection from '../Components/Core/Aboutpage/ContactFormSection';
import Footer from '../Components/common/Footer';
import * as Icons from "react-icons/hi2";
import ReviewSlider from '../Components/common/ReviewSlider';
import HighlightText from '../Components/Core/HomePage/HighlightText';
const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@atpoint.com",
  },
  {
    icon: "HiGlobeAmericas",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Mains Hostel MJP Rohilkhand University, Boys Hostel Near Dohra Moad , Bareilly-343006",
  },
  {
    icon: "HiPhone",
    heading: "Call us",
    description: "Mon-Fri from 8am to 5pm.",
    details: "+123 456 7890",
  },
]

function ContactUs() {
  return (
    <div className='bg-richblack-900 text-white'>
      <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 lg:flex-row'>

        {/* Contact Form */}
        <div className='lg:w-[60%]'>

          <ContactFormSection />
        </div>

        {/*  Contact Details */}
        <div className='lg:w-[40%]'>
          <div className='flex flex-col gap-6 rounded-2xl bg-richblack-800 p-4 lg:p-6'>
            {contactDetails.map((ele, i) => {
              const Icon = Icons[ele.icon]
              return (
                <div className='flex flex-col gap-0.5 p-3 text-sm text-richblack-200' key={i}>
                  <div className='flex flex-row items-center gap-3'>
                    <Icon size={25} className="text-richblack-5" />
                    <h1 className='text-lg font-semibold text-richblack-5'>
                      {ele.heading}
                    </h1>
                  </div>
                  <p className='font-medium'>{ele.description}</p>
                  <p className='font-semibold'>{ele.details}</p>
                </div>
              )
            })}
          </div>
        </div>


      </div>

      {/* Reviews Section  */}
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
  )
}

export default ContactUs