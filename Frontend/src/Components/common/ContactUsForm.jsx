
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from '../../Data/CountryCode.json'
import toast from 'react-hot-toast'

function ContactUsForm() {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

       const submitContactForm = async (data,res) => {
       
        // console.log("Form Data: ", data)

        try {
            setLoading(true)
          
               await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Message Sent Successfully")
            setLoading(false);
            
        } catch (error) {
            console.log("Error: ", error.message)
             toast.error("Something went wrong")
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "", firstName: "", lastName: "",
                message: "", phoneNo: "", countrycode: "+91"
            })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <form
            className="flex flex-col gap-4 outline-none"
            onSubmit={handleSubmit(submitContactForm)}
        >
            {/* Name Row */}
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex flex-col gap-1 lg:w-[48%]">
                    <label htmlFor="firstName" className="text-[13px] text-richblack-5 ml-1">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First name"
                        className="rounded-lg bg-richblack-800 p-2.5 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all duration-200"
                        {...register("firstName", { required: true })}
                    />
                      {errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1 lg:w-[48%]">
                    <label htmlFor="lastName" className="text-[13px] text-richblack-5 ml-1">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                        className="rounded-lg bg-richblack-800 p-2.5 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all duration-200"
                        {...register("lastName")}
                    />
                </div>
            </div>

            {/* Email and Phone Row */}
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex flex-col gap-1 lg:w-[48%]">
                    <label htmlFor="email" className="text-[13px] text-richblack-5 ml-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email address"
                        className="rounded-lg bg-richblack-800 p-2.5 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all duration-200"
                        {...register("email", { required: true })}
                    />
                     {errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your email address.
                    </span>
                )}
                </div>

                <div className="flex flex-col gap-1 lg:w-[48%]">
                    <label htmlFor="phonenumber" className="text-[13px] text-richblack-5 ml-1">Phone Number</label>
                    <div className="flex flex-row gap-2">
                        <select
                            className="w-17.5 rounded-lg bg-richblack-800 p-2.5 text-richblack-5 border border-richblack-700 focus:border-yellow-50 outline-none cursor-pointer text-sm"
                            {...register("countrycode", { required: true })}
                        >
                            {CountryCode.map((element, index) => (
                                <option
                                 key={index} 
                                 value={element.code}
                                  style={{ backgroundColor: "#161D29" }}>
                                    {element.code} - {element.country}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="12345 67890"
                            className="w-[calc(100%-80px)] rounded-lg bg-richblack-800 p-2.5 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                             {...register("phoneNo", {
                                required: { value: true, message: "Please enter your Phone Number." },
                                maxLength: { value: 12, message: "Invalid Phone Number" },
                                minLength: { value: 10, message: "Invalid Phone Number" },
                            })}
                        />
                    </div>
                </div>
                              {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>
            

            {/* Message Box */}
            <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-[13px] text-richblack-5 ml-1">Message</label>
                <textarea
                    id="message"
                    rows="3" 
                    placeholder="Enter your message here..."
                    className="rounded-lg bg-richblack-800 p-2.5 text-richblack-5 border border-richblack-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 outline-none transition-all duration-200 resize-none"
                    {...register("message", { required: true })}
                />
                  {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your message.
                    </span>
                )}
            </div>

            {/* Submit Button */}
            <button
                disabled={loading}
                type="submit"
                className={`mt-2 cursor-pointer rounded-lg bg-yellow-50 py-3 
                text-center text-[16px] font-bold text-black transition-all duration-300 hover:scale-[0.98]
                 hover:bg-yellow-100 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] disabled:bg-richblack-500`}
            >
                {loading ? "Sending..." : "Send Message"}
            </button>
        </form>
    )
}

export default ContactUsForm;





// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import CountryCode from '../../Data/CountryCode.json'
// import toast from 'react-hot-toast'

// function ContactUsForm() {
//     const [loading, setLoading] = useState(false)
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors, isSubmitSuccessful },
//     } = useForm()

//     const submitContactForm = async (data,res) => {
//         console.log("Form Data: ", data)
//         try {
//             setLoading(true)
//             // Example API Call:
//             // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
//             // res.status("OK")
//             toast.success("Message Sent Successfully")
//             setLoading(false)
//         } catch (error) {
//             console.log("Error: ", error.message)
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         if (isSubmitSuccessful) {
//             reset({
//                 email: "",
//                 firstName: "",
//                 lastName: "",
//                 message: "",
//                 phoneNo: "",
//             })
//         }
//     }, [isSubmitSuccessful, reset])

//     return (
//         <form
//             className="flex flex-col gap-7"
//             onSubmit={handleSubmit(submitContactForm)}
//         >
//             <div className="flex flex-col gap-5 lg:flex-row">
//                 {/* First Name */}
//                 <div className="flex flex-col gap-2 lg:w-[48%]">
//                     <label htmlFor="firstName" className="text-sm text-richblack-5">
//                         First Name
//                     </label>
//                     <input
//                         type="text"
//                         id="firstName"
//                         placeholder="Enter first name"
//                         className="rounded-lg bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.5)] focus:outline-none"
//                         {...register("firstName", { required: true })}
//                     />
//                     {errors.firstName && (
//                         <span className="-mt-1 text-[12px] text-yellow-100">
//                             Please enter your name.
//                         </span>
//                     )}
//                 </div>

//                 {/* Last Name */}
//                 <div className="flex flex-col gap-2 lg:w-[48%]">
//                     <label htmlFor="lastName" className="text-sm text-richblack-5">
//                         Last Name
//                     </label>
//                     <input
//                         type="text"
//                         id="lastName"
//                         placeholder="Enter last name"
//                         className="rounded-lg bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.5)] focus:outline-none"
//                         {...register("lastName")}
//                     />
//                 </div>
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-2">
//                 <label htmlFor="email" className="text-sm text-richblack-5">
//                     Email Address
//                 </label>
//                 <input
//                     type="email"
//                     id="email"
//                     placeholder="Enter email address"
//                     className="rounded-lg bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.5)] focus:outline-none"
//                     {...register("email", { required: true })}
//                 />
//                 {errors.email && (
//                     <span className="-mt-1 text-[12px] text-yellow-100">
//                         Please enter your email address.
//                     </span>
//                 )}
//             </div>

//             {/* Phone Number */}
//             <div className="flex flex-col gap-2">
//                 <label htmlFor="phonenumber" className="text-sm text-richblack-5">
//                     Phone Number
//                 </label>

//                 <div className="flex flex-row gap-5">
//                     {/* Country Code Dropdown */}
//                     <div className="flex w-21.25 flex-col gap-2">
//                         <select
//                             id="countrycode"
//                             className="rounded-lg bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.5)] focus:outline-none cursor-pointer"
//                             {...register("countrycode", { required: true })}
//                         >
//                             {CountryCode.map((element, index) => (
//                                 <option
//                                     key={index}
//                                     value={element.code}
//                                     // This style forces the dropdown list to stay dark so you can see the text
//                                     style={{ backgroundColor: "#161D29", color: "#F1F2FF" }}
//                                 >
//                                     {element.code} - {element.country}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Phone Number Input */}
//                     <div className="flex w-[calc(100%-105px)] flex-col gap-2">
//                         <input
//                             type="number"
//                             id="phonenumber"
//                             placeholder="12345 67890"
//                             className="rounded-lg bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.5)] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                             {...register("phoneNo", {
//                                 required: { value: true, message: "Please enter your Phone Number." },
//                                 maxLength: { value: 12, message: "Invalid Phone Number" },
//                                 minLength: { value: 10, message: "Invalid Phone Number" },
//                             })}
//                         />
//                     </div>
//                 </div>
//                 {errors.phoneNo && (
//                     <span className="-mt-1 text-[12px] text-yellow-100">
//                         {errors.phoneNo.message}
//                     </span>
//                 )}
//             </div>

//             {/* Message Box */}
//             <div className="flex flex-col gap-2">
//                 <label htmlFor="message" className="text-sm text-richblack-5">
//                     Message
//                 </label>
//                 <textarea
//                     id="message"
//                     cols="30"
//                     rows="7"
//                     placeholder="Enter your message here"
//                     className="rounded-lg bg-richblack-800 p-3 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.5)] focus:outline-none"
//                     {...register("message", { required: true })}
//                 />
//                 {errors.message && (
//                     <span className="-mt-1 text-[12px] text-yellow-100">
//                         Please enter your message.
//                     </span>
//                 )}
//             </div>

//             <button
//                 disabled={loading}
//                 type="submit"
//                 className={` cursor-pointer rounded-md bg-yellow-50 px-6 py-3 text-center text-[16px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
//                 ${!loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"} disabled:bg-richblack-500`}
//             >
//                 {loading ? "Sending..." : "Send Message"}
                
//             </button>
//         </form>
//     )
// }

// export default ContactUsForm;