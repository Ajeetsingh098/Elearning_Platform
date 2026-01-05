

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { VscChevronRight, VscAdd, VscClose, VscLoading } from "react-icons/vsc";
import Upload from "../../Course/Upload";
import ChipInput from "./ChipInput";
import { getAllTags, createCourse ,editCourseDetails} from "../../Services/operations/Course";
import { toast } from "react-hot-toast";

function AddCourseStep1({ setStep, courseData, setCourseData }) {
  const { token } = useSelector((state) => state.auth);
  const [learnItem, setLearnItem] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to update central state
  const updateCourseData = (name, value) => {
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch Categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllTags();
        const result = response?.data?.data || response?.data || response;
        if (Array.isArray(result)) setCategories(result);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddLearnItem = () => {
    if (learnItem.trim()) {
      const list = courseData.whatYouWillLearn || [];
      updateCourseData("whatYouWillLearn", [...list, learnItem]);
      setLearnItem("");
    }
  };

  const handleRemoveLearnItem = (index) => {
    const updated = [...(courseData.whatYouWillLearn || [])];
    updated.splice(index, 1);
    updateCourseData("whatYouWillLearn", updated);
  };




  // ================= API SUBMISSION LOGIC =================
  const handleNextStep = async () => {
    const { 
      courseName, 
      courseDescription, 
      price, 
      tag, 
      thumbnailImage, 
      whatYouWillLearn 
    } = courseData;

    // Validation
    if (!courseName?.trim()) return toast.error("Course name is required");
    if (!courseDescription?.trim()) return toast.error("Description is required");
    if (!price) return toast.error("Price is required");
    if (!tag) return toast.error("Please select a category");
    if (!thumbnailImage) return toast.error("Thumbnail image is required");
    if (!whatYouWillLearn?.length) return toast.error("Add at least one benefit");

    // Prepare FormData for the Backend
     setLoading(true);
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("courseDescription", courseDescription);
    formData.append("price", Number(price));
    formData.append("tag", courseData.tag._id || courseData.tag); 
    formData.append("thumbnailImage", thumbnailImage);
    formData.append("whatYouWillLearn", JSON.stringify(whatYouWillLearn));
    formData.append("status", "Draft");
   
    // if (thumbnailImage instanceof File) {
    //     formData.append("thumbnailImage", thumbnailImage);
    // }
   
    try {
        let result;
        
       
        if (courseData._id) {
            formData.append("courseId", courseData._id);
            result = await editCourseDetails(formData, token);
            if(result) toast.success("Course updated successfully");
        } else {
          
            result = await createCourse(formData, token);
            if(result)
               toast.success("Course created successfully");
        }
      
        if (result) {
           
            setCourseData(result); 
            setStep(2);
        }
    } catch (error) {
        console.error("STEP 1 ERROR:", error);
    } finally {
        setLoading(false);
    }


  };

  return (
    <div className="space-y-8 p-6 bg-slate-900 border border-slate-800 rounded-xl">
      
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-slate-300 text-sm">Course Title <span className="text-pink-500">*</span></label>
        <input
          type="text"
          value={courseData.courseName || ""}
          onChange={(e) => updateCourseData("courseName", e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white outline-none focus:border-yellow-400"
          placeholder="e.g. Gama 2.0"
        />
      </div>

      {/* Course Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-slate-300 text-sm">Description <span className="text-pink-500">*</span></label>
        <textarea
          rows="4"
          value={courseData.courseDescription || ""}
          onChange={(e) => updateCourseData("courseDescription", e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white outline-none focus:border-yellow-400"
          placeholder="Enter description"
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col space-y-2">
        <label className="text-slate-300 text-sm">Category <span className="text-pink-500">*</span></label>
        <select
          value={courseData.tag || ""}
          onChange={(e) => updateCourseData("tag", e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white cursor-pointer"
        >
          <option value="" disabled>Choose a Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Tag Keywords */}
      <ChipInput 
        label="Tags" 
        name="tagKeywords" 
        placeholder="Enter tags and press Enter" 
        courseData={courseData} 
        setCourseData={setCourseData} 
      />

      {/* Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-slate-300 text-sm">Price (INR) <span className="text-pink-500">*</span></label>
        <input
          type="number"
          value={courseData.price || ""}
          onChange={(e) => updateCourseData("price", e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white outline-none"
          placeholder="497"
        />
      </div>

      {/* Thumbnail */}
      <Upload
        label="Course Thumbnail"
        name="thumbnailImage"
        
        setValue={(file) => updateCourseData("thumbnailImage", file)}
      />

      {/* What You Will Learn */}
      <div className="flex flex-col space-y-2">
        <label className="text-slate-300 text-sm">What You Will Learn <span className="text-pink-500">*</span></label>
        <div className="flex gap-2">
          <input
            type="text"
            value={learnItem}
            onChange={(e) => setLearnItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLearnItem())}
            className="flex-1 bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-white"
            placeholder="Add benefits..."
          />
          <button type="button" onClick={handleAddLearnItem} className="bg-yellow-400 text-slate-900 px-4 rounded-lg">
            <VscAdd size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {courseData.whatYouWillLearn?.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full text-yellow-400 text-sm">
              <span>{item}</span>
              <button type="button" onClick={() => handleRemoveLearnItem(index)}><VscClose /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-6 border-t border-slate-800">
        <button
          onClick={handleNextStep}
          disabled={loading}
          className="flex items-center gap-2 bg-yellow-400 text-slate-900 px-8 py-3 rounded-xl font-bold disabled:bg-slate-600 transition-all"
        >
          {loading ? <VscLoading className="animate-spin" /> : <>Next Step <VscChevronRight size={20} /></>}
        </button>
      </div>
    </div>
  );
}

export default AddCourseStep1;

















// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { VscChevronRight, VscAdd, VscClose, VscLoading } from "react-icons/vsc";
// import Upload from "../../Course/Upload";
// import ChipInput from "./ChipInput";
// import { createCourse, getAllTags } from "../../Services/operations/Course";
// import { toast } from "react-hot-toast";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const { token } = useSelector((state) => state.auth);

//   const [learnItem, setLearnItem] = useState("");
//   const [categories, setCategories] = useState([]); // ✅ FIX
//   const [loading, setLoading] = useState(false);

//   // ---------- FETCH CATEGORIES ----------
// useEffect(() => {
//   const fetchCategories = async () => {
//     try {
//       const res = await getAllTags();
//       // Since your log showed (3) [{...}, {...}, {...}]
//       // res is likely the array itself or res.data is the array
//       const data = Array.isArray(res) ? res : res?.data || [];
//       setCategories(data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };
//   fetchCategories();
// }, []);



//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ---------- WHAT YOU WILL LEARN ----------
//   const handleAddLearnItem = () => {
//     if (!learnItem.trim()) return;

//     const list = courseData.whatYouWillLearn || [];
//     if (list.includes(learnItem.trim())) {
//       toast.error("Item already added");
//       return;
//     }

//     updateCourseData("whatYouWillLearn", [...list, learnItem.trim()]);
//     setLearnItem("");
//   };

//   const handleRemoveLearnItem = (index) => {
//     const updated = [...courseData.whatYouWillLearn];
//     updated.splice(index, 1);
//     updateCourseData("whatYouWillLearn", updated);
//   };

//   // ---------- SUBMIT ----------
//   const handleNextStep = async () => {
//     const {
//       courseName,
//       courseDescription,
//       price,
//       categoryName,
//       thumbnailImage,
//       whatYouWillLearn,
//     } = courseData;

//     // VALIDATION
//     if (!courseName?.trim()) return toast.error("Course name is required");
//     if (!courseDescription?.trim()) return toast.error("Description is required");
//     if (!price || isNaN(price) || price <= 0)
//       return toast.error("Enter valid price");
//     if (!categoryName?.trim())
//       return toast.error("Please select a category");
//     if (!thumbnailImage)
//       return toast.error("Thumbnail image is required");
//     if (!whatYouWillLearn?.length)
//       return toast.error("Add at least one benefit");

//     setLoading(true);

//    // Inside handleNextStep
// const formData = new FormData();
// formData.append("courseName", courseData.courseName.trim());
//   formData.append("courseDescription", courseData.courseDescription.trim());
//   formData.append("price", Number(courseData.price));
  
//   // Backend code uses: const { categoryName } = req.body;
//   // So we pass the ID here
//   formData.append("categoryName", courseData.categoryName); 
  
//   formData.append("thumbnailImage", courseData.thumbnailImage);
//   formData.append("whatYouWillLearn", JSON.stringify(courseData.whatYouWillLearn));
//   formData.append("status", "Draft");

//    // Inside handleNextStep
// try {
//   const res = await createCourse(formData, token);
  
//   // CHECK IF RES EXISTS before proceeding
//   if (res) {
//     setCourseData(res);
   
//     setStep(2);
//   } else {
//     // If res is null, the operation already showed an error toast
//     console.error("Backend returned null - Check Server Logs");
//   }
// } catch (error) {
//   console.error("Component Level Error:", error);
// }
    
//     finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-8 p-6 bg-slate-900 border border-slate-800 rounded-xl">

//       {/* TITLE */}
//       <input
//         placeholder="Course Title"
//         value={courseData.courseName || ""}
//         onChange={(e) => updateCourseData("courseName", e.target.value)}
//         className="w-full p-3 bg-slate-800 text-white rounded-lg"
//       />

//       {/* DESCRIPTION */}
//       <textarea
//         placeholder="Course Description"
//         value={courseData.courseDescription || ""}
//         onChange={(e) =>
//           updateCourseData("courseDescription", e.target.value)
//         }
//         className="w-full p-3 bg-slate-800 text-white rounded-lg"
//       />

//       {/* CATEGORY */}
//    <select
//   value={courseData.categoryName || ""}
//   onChange={(e) => updateCourseData("categoryName", e.target.value)}
//   className="..."
// >
//   <option value="">Select Category</option>
//   {categories.map((cat) => (
//     <option key={cat._id} value={cat._id}> {/* Send ID */}
//       {cat.name}
//     </option>
//   ))}
// </select>


//       {/* PRICE */}
//       <input
//         type="number"
//         placeholder="Price"
//         value={courseData.price || ""}
//         onChange={(e) => updateCourseData("price", e.target.value)}
//         className="w-full p-3 bg-slate-800 text-white rounded-lg"
//       />

//       {/* THUMBNAIL */}
//       <Upload
//         label="Course Thumbnail"
//         setValue={(file) => updateCourseData("thumbnailImage", file)}
//       />

//       {/* WHAT YOU WILL LEARN */}
//       <div>
//         <div className="flex gap-2">
//           <input
//             value={learnItem}
//             onChange={(e) => setLearnItem(e.target.value)}
//             className="flex-1 p-2 bg-slate-800 text-white rounded-lg"
//             placeholder="Add benefit"
//           />
//           <button onClick={handleAddLearnItem}>
//             <VscAdd />
//           </button>
//         </div>

//         <div className="flex flex-wrap gap-2 mt-2">
//           {courseData.whatYouWillLearn?.map((item, i) => (
//             <span key={i} className="bg-yellow-400 px-3 py-1 rounded-full">
//               {item}
//               <VscClose onClick={() => handleRemoveLearnItem(i)} />
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* NEXT */}
//       <button
//         onClick={handleNextStep}
//         disabled={loading}
//         className="bg-yellow-400 px-6 py-3 rounded-xl font-bold"
//       >
//         {loading ? <VscLoading className="animate-spin" /> : "Next Step"}
//       </button>
//     </div>
//   );
// }

// export default AddCourseStep1;




// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { VscChevronRight, VscAdd, VscClose, VscLoading } from "react-icons/vsc";
// import Upload from "../../Course/Upload";
// import ChipInput from "./ChipInput";
// import { createCourse } from "../../Services/operations/Course";
// import { toast } from "react-hot-toast";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const { token } = useSelector((state) => state.auth);
//   const [learnItem, setLearnItem] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Helper to update local and parent state
//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddLearnItem = () => {
//   if (!learnItem.trim()) return;

//   const list = courseData.whatYouWillLearn || [];
//   if (list.includes(learnItem.trim())) {
//     toast.error("Item already added");
//     return;
//   }

//   updateCourseData("whatYouWillLearn", [...list, learnItem.trim()]);
//   setLearnItem("");
// };


//   const handleRemoveLearnItem = (index) => {
//     const updated = [...(courseData.whatYouWillLearn || [])];
//     updated.splice(index, 1);
//     updateCourseData("whatYouWillLearn", updated);
//   };
    

//   // ================= API SUBMISSION LOGIC =================
//   const handleNextStep = async () => {
//     const { 
//       courseName, 
//       courseDescription, 
//       price, 
//       categoryName, 
//       thumbnailImage, 
//       whatYouWillLearn 
//     } = courseData;
   
//     // Test this in your handleNextStep before the try block:
// console.log("SENDING CATEGORY:", categoryName);
//     // Validation
//     if (!courseName?.trim()) return toast.error("Course name is required");
//     if (!courseDescription?.trim()) return toast.error("Description is required");
//   if (!price || isNaN(price) || Number(price) <= 0) {
//   return toast.error("Enter a valid price");
// }
//     if (!categoryName?.trim()) return toast.error("Please enter a category");
//     if (!thumbnailImage) return toast.error("Thumbnail image is required");
//     if (!whatYouWillLearn?.length) return toast.error("Add at least one benefit");

//     setLoading(true);
    
//     // Prepare FormData
// //     const formData = new FormData();
// //    formData.append("courseName", courseName.trim());
// // formData.append("courseDescription", courseDescription.trim());
// // formData.append("categoryName", categoryName.trim());

// //     formData.append("price", Number(price));
// //     // Sending Name instead of ID. Backend will "Find or Create"
   
// //     formData.append("thumbnailImage", thumbnailImage);
// //     formData.append("whatYouWillLearn", JSON.stringify(whatYouWillLearn));
// //     formData.append("status", "Draft");

// //     try {
// //       const result = await createCourse(formData, token);
// //       if (result) {
// //         setCourseData(result); 
// //         setStep(2);
// //         toast.success("Course Info Saved");
// //       }
// //     } catch (error) {
// //       console.error("CREATE COURSE API ERROR:", error);
// //     toast.error(error?.response?.data?.message || "Failed to save course info");

//    if (!courseData.categoryName.trim()) {
//     toast.error("Please select a category");
//     return;
//   }

//   const formData = new FormData();

//   formData.append("courseName", courseData.courseName);
//   formData.append("courseDescription", courseData.courseDescription);
//   formData.append(
//     "whatYouWillLearn",
//     JSON.stringify(courseData.whatYouWillLearn)
//   );
//   formData.append("price", courseData.price);
//   formData.append("categoryName", courseData.categoryName.trim());
//   formData.append("thumbnailImage", courseData.thumbnailImage);

//   try {
//     await createCourse(formData, token);
//     toast.success("Course created successfully");
//     setStep(2);
//   } catch (error) {
//     console.error("CREATE COURSE ERROR:", error);
//     toast.error("Failed to create course");





//     } finally {
//       setLoading(false);
//     }
//   };





//   return (
//     <div className="space-y-8 p-6 bg-slate-900 border border-slate-800 rounded-xl">
      
//       {/* Course Title */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm">Course Title <span className="text-pink-500">*</span></label>
//         <input
//           type="text"
//           value={courseData.courseName || ""}
//           onChange={(e) => updateCourseData("courseName", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white outline-none focus:border-yellow-400"
//           placeholder="e.g. Full Stack Web Development"
//         />
//       </div>

//       {/* Course Description */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm">Description <span className="text-pink-500">*</span></label>
//         <textarea
//           rows="4"
//           value={courseData.courseDescription || ""}
//           onChange={(e) => updateCourseData("courseDescription", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white outline-none focus:border-yellow-400"
//           placeholder="Enter course description"
//         />
//       </div>

//       {/* Category Input (Create on the fly) */}
//       {/* <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm">Category <span className="text-pink-500">*</span></label>
//         <input
//           type="text"
//           value={courseData.categoryName || ""}
//           onChange={(e) => updateCourseData("categoryName", e.target.value)}
//           placeholder="e.g. Web Development (New categories will be created automatically)"
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white outline-none focus:border-yellow-400"
//         />

        
//       </div> */}
       

//        <select
//   value={courseData.categoryName}
//   onChange={(e) =>
//     setCourseData({ ...courseData, categoryName: e.target.value })
//   }
// >
//   <option value="">Select Category</option>
//   {categories.map((cat) => (
//     <option key={cat._id} value={cat.name}>
//       {cat.name}
//     </option>
//   ))}
// </select>




//       {/* Tag Keywords (Chip Input) */}
//       <ChipInput 
//         label="Tags" 
//         name="tagKeywords" 
//         placeholder="Enter tags and press Enter" 
//         courseData={courseData} 
//         setCourseData={setCourseData} 
//       />

//       {/* Price */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm">Price (INR) <span className="text-pink-500">*</span></label>
//         <input
//           type="number"
//           value={courseData.price || ""}
//           onChange={(e) => updateCourseData("price", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white outline-none focus:border-yellow-400"
//           placeholder="499"
//         />
//       </div>

//       {/* Thumbnail */}
//       <Upload
//         label="Course Thumbnail"
//         name="thumbnailImage"
//         setValue={(file) => updateCourseData("thumbnailImage", file)}
//       />

//       {/* What You Will Learn */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm">What You Will Learn <span className="text-pink-500">*</span></label>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={learnItem}
//             onChange={(e) => setLearnItem(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLearnItem())}
//             className="flex-1 bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-white outline-none focus:border-yellow-400"
//             placeholder="Add benefit..."
//           />
//           <button type="button" onClick={handleAddLearnItem} className="bg-yellow-400 text-slate-900 px-4 rounded-lg hover:bg-yellow-300 transition-colors">
//             <VscAdd size={20} />
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2 mt-3">
//           {courseData.whatYouWillLearn?.map((item, index) => (
//             <div key={index} className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full text-yellow-400 text-sm">
//               <span>{item}</span>
//               <button type="button" onClick={() => handleRemoveLearnItem(index)} className="hover:text-white transition-colors"><VscClose /></button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-end pt-6 border-t border-slate-800">
//         <button
//           onClick={handleNextStep}
//           disabled={loading}
//           className="flex items-center gap-2 bg-yellow-400 text-slate-900 px-10 py-3 rounded-xl font-bold disabled:bg-slate-600 transition-all hover:bg-yellow-300"
//         >
//           {loading ? (
//             <>Saving... <VscLoading className="animate-spin" /></>
//           ) : (
//             <>Next Step <VscChevronRight size={20} /></>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddCourseStep1;


























// import React, { useState, useEffect } from "react";
// import { VscChevronRight, VscAdd, VscClose } from "react-icons/vsc";
// import Upload from "../../Course/Upload";
// import ChipInput from "./ChipInput"; // Use the component we refined
// import { getAllTags } from "../../Services/operations/Course";
// import { toast } from "react-hot-toast";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const [learnItem, setLearnItem] = useState("");
//   const [categories, setCategories] = useState([]); 
//   const [loading, setLoading] = useState(false);

//   // Helper to update central state
//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Fetch Categories for the Catalog dropdown
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await getAllTags();
//         // Defensive check: handle nested data or raw arrays
//         const result = response?.data?.data || response?.data || response;
        
//         if (Array.isArray(result)) {
//           setCategories(result);
//         } else {
//           setCategories([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//         toast.error("Could not load categories");
//       }
//       setLoading(false);
//     };
//     fetchCategories();
//   }, []);

//   const handleAddLearnItem = () => {
//     if (learnItem.trim()) {
//       const list = courseData.whatYouWillLearn || [];
//       updateCourseData("whatYouWillLearn", [...list, learnItem]);
//       setLearnItem("");
//     }
//   };

//   const handleRemoveLearnItem = (index) => {
//     const updated = [...(courseData.whatYouWillLearn || [])];
//     updated.splice(index, 1);
//     updateCourseData("whatYouWillLearn", updated);
//   };

//   const handleNextStep = () => {
//     const { courseName, courseDescription, price, tag, thumbnailImage, whatYouWillLearn, tagKeywords } = courseData;

//     if (!courseName?.trim()) return toast.error("Course name is required");
//     if (!courseDescription?.trim()) return toast.error("Description is required");
//     if (!price || isNaN(price)) return toast.error("Valid price is required");
//     if (!tag) return toast.error("Please select a catalog category");
//     if (!thumbnailImage) return toast.error("Thumbnail image is required");
//     if (!whatYouWillLearn?.length) return toast.error("Add at least one benefit");

//     setStep(2);
//   };

//   return (
//     <div className="space-y-8 p-6 bg-slate-900 border border-slate-800 rounded-xl animate-in fade-in duration-500">
      
//       {/* 1. Course Name */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm font-medium">Course Title <span className="text-pink-500">*</span></label>
//         <input
//           type="text"
//           value={courseData.courseName || ""}
//           onChange={(e) => updateCourseData("courseName", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white focus:border-yellow-400 outline-none transition-all"
//           placeholder="e.g. Full Stack Web Development"
//         />
//       </div>

//       {/* 2. Course Description */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm font-medium">Description <span className="text-pink-500">*</span></label>
//         <textarea
//           rows="4"
//           value={courseData.courseDescription || ""}
//           onChange={(e) => updateCourseData("courseDescription", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white focus:border-yellow-400 outline-none transition-all"
//           placeholder="What will students learn in this course?"
//         />
//       </div>

//       {/* 3. Catalog Category Selection */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm font-medium">Category <span className="text-pink-500">*</span></label>
//         <select
//           value={courseData.tag || ""}
//           onChange={(e) => updateCourseData("tag", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white cursor-pointer focus:border-yellow-400 outline-none"
//         >
//           <option value="" disabled>Choose a Catalog Category</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* 4. Dynamic Tag Keywords (ChipInput) */}
//       <ChipInput 
//         label="Search Tags" 
//         name="tagKeywords" 
//         placeholder="Enter tags (React, MERN...) and press Enter" 
//         courseData={courseData} 
//         setCourseData={setCourseData} 
//       />

//       {/* 5. Price */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm font-medium">Price (INR) <span className="text-pink-500">*</span></label>
//         <input
//           type="number"
//           value={courseData.price || ""}
//           onChange={(e) => updateCourseData("price", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white focus:border-yellow-400 outline-none"
//           placeholder="0.00"
//         />
//       </div>

//       {/* 6. Thumbnail */}
//       <Upload
//         label="Course Thumbnail"
//         name="thumbnailImage"
//         setValue={(file) => updateCourseData("thumbnailImage", file)}
//       />

//       {/* 7. Benefits Builder */}
//       <div className="flex flex-col space-y-2">
//         <label className="text-slate-300 text-sm font-medium">What You Will Learn <span className="text-pink-500">*</span></label>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={learnItem}
//             onChange={(e) => setLearnItem(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLearnItem())}
//             className="flex-1 bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-white focus:border-yellow-400 outline-none"
//             placeholder="Master React Hooks..."
//           />
//           <button
//             type="button"
//             onClick={handleAddLearnItem}
//             className="bg-yellow-400 text-slate-900 px-4 rounded-lg font-bold hover:bg-yellow-300 transition-all"
//           >
//             <VscAdd size={20} />
//           </button>
//         </div>
        
//         <div className="flex flex-wrap gap-2 mt-3">
//           {courseData.whatYouWillLearn?.map((item, index) => (
//             <div key={index} className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full text-yellow-400 text-sm">
//               <span>{item}</span>
//               <button type="button" onClick={() => handleRemoveLearnItem(index)} className="hover:text-white">
//                 <VscClose size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-end pt-6 border-t border-slate-800">
//         <button
//           onClick={handleNextStep}
//           className="flex items-center gap-2 bg-yellow-400 text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/10"
//         >
//           Next Step <VscChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddCourseStep1;










// import React, { useState, useEffect } from "react";
// import { VscChevronRight, VscAdd, VscClose } from "react-icons/vsc";
// import Upload from "../../Course/Upload";
// import { getAllTags } from "../../Services/operations/Course";
// import { toast } from "react-hot-toast";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const [learnItem, setLearnItem] = useState("");
//   const [tags, setTags] = useState([]);

//   // Update course data
//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Add item to "What you will learn"
//   const handleAddLearnItem = () => {
//     if (learnItem.trim()) {
//       const list = courseData.whatYouWillLearn || [];
//       updateCourseData("whatYouWillLearn", [...list, learnItem]);
//       setLearnItem("");
//     }
//   };

//   // Remove item from "What you will learn"
//   const handleRemoveLearnItem = (index) => {
//     const updated = [...(courseData.whatYouWillLearn || [])];
//     updated.splice(index, 1);
//     updateCourseData("whatYouWillLearn", updated);
//   };

//   // Enter key support for adding learning items
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleAddLearnItem();
//     }
//   };

//   // Fetch tags from backend
//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const data = await getAllTags();
//         setTags(data?.data || []);
//       } catch (error) {
//         console.error("Failed to fetch tags:", error);
//         toast.error("Failed to load tags");
//       }
//     };
//     fetchTags();
//   }, []);

//   // Next step validation
//   const handleNextStep = () => {
//     const { courseName, courseDescription, price, tag, thumbnailImage, whatYouWillLearn } = courseData;
//     if (!courseName?.trim() || !courseDescription?.trim() || !price?.trim() || !tag || !thumbnailImage || !whatYouWillLearn?.length) {
//       toast.error("Please fill all required fields");
//       return;
//     }
//     setStep(2);
//   };

//   return (
//     <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

//       {/* Course Name */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Name *</label>
//         <input
//           type="text"
//           value={courseData.courseName || ""}
//           onChange={(e) => updateCourseData("courseName", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="Learn React from Scratch"
//         />
//       </div>

//       {/* Course Description */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Description *</label>
//         <textarea
//           rows="3"
//           value={courseData.courseDescription || ""}
//           onChange={(e) => updateCourseData("courseDescription", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="This course covers..."
//         />
//       </div>

//       {/* What You Will Learn */}
//       <div>
//         <label className="text-slate-300 text-sm">What you will learn *</label>
//         <div className="flex gap-2 mb-2">
//           <input
//             type="text"
//             value={learnItem}
//             onChange={(e) => setLearnItem(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg"
//             placeholder="Understand React basics"
//           />
//           <button
//             type="button"
//             onClick={handleAddLearnItem}
//             className="bg-yellow-400 text-black px-3 rounded-lg"
//           >
//             <VscAdd />
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {courseData.whatYouWillLearn?.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md text-yellow-400"
//             >
//               {item}
//               <button onClick={() => handleRemoveLearnItem(index)}>
//                 <VscClose />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price */}
//       <div>
//         <label className="text-slate-300 text-sm">Price (INR) *</label>
//         <input
//           type="number"
//           min="0"
//           value={courseData.price || ""}
//           onChange={(e) => updateCourseData("price", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="499"
//         />
//       </div>

//       {/* Tag */}
//       <div>
//         <label className="text-slate-300 text-sm">Tag *</label>
//         <select
//           value={courseData.tag || ""}
//           onChange={(e) => updateCourseData("tag", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//         >
//           <option value="">Select Tag</option>
//           {tags.length === 0 ? (
//             <option disabled>No tags available</option>
//           ) : (
//             tags.map((tag) => (
//               <option key={tag._id} value={tag._id}>
//                 {tag.name}
//               </option>
//             ))
//           )}
//         </select>
//       </div>

//       {/* Thumbnail Upload */}
//       <Upload
//         label="Course Thumbnail *"
//         name="thumbnailImage"
//         setValue={(file) => updateCourseData("thumbnailImage", file)}
//       />

//       {/* Next Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleNextStep}
//           className="bg-yellow-400 text-black px-6 py-3 rounded-xl flex items-center gap-2"
//         >
//           Next Step <VscChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddCourseStep1;










// import React, { useState, useEffect } from "react";
// import { VscChevronRight, VscAdd, VscClose } from "react-icons/vsc";
// import Upload from "../../Course/Upload";
// import { getAllTags } from "../../Services/operations/Course";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const [learnItem, setLearnItem] = useState("");
//   const [tags, setTags] = useState([]);

//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Add item to "What you will learn"
//   const handleAddLearnItem = () => {
//     if (learnItem.trim()) {
//       const list = courseData.whatYouWillLearn || [];
//       updateCourseData("whatYouWillLearn", [...list, learnItem]);
//       setLearnItem("");
//     }
//   };

//   const handleRemoveLearnItem = (index) => {
//     const updated = [...(courseData.whatYouWillLearn || [])];
//     updated.splice(index, 1);
//     updateCourseData("whatYouWillLearn", updated);
//   };

//   // Fetch tags from backend
//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const data = await getAllTags();
//         setTags(data?.data || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchTags();
//   }, []);


//   const handleNextStep = () => {
//       const { courseName, courseDescription, price, tag, thumbnailImage, whatYouWillLearn } = courseData;
//     if (
//       !courseData.courseName?.trim() ||
//       !courseData.courseDescription?.trim() ||
//       !courseData.price?.trim() ||
//       !courseData.tag ||
//       !courseData.thumbnailImage ||
//       !courseData.whatYouWillLearn?.length
//     ) {
//        toast.error("Please fill all required fields");
//       return;
//     }
//     setStep(2);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Course Name */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Name *</label>
//         <input
//           type="text"
//           value={courseData.courseName || ""}
//           onChange={(e) => updateCourseData("courseName", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="Learn React from Scratch"
//         />
//       </div>

//       {/* Course Description */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Description *</label>
//         <textarea
//           rows="3"
//           value={courseData.courseDescription || ""}
//           onChange={(e) =>
//             updateCourseData("courseDescription", e.target.value)
//           }
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="This course covers..."
//         />
//       </div>

//       {/* What you will learn */}
//       <div>
//         <label className="text-slate-300 text-sm">What you will learn *</label>
//         <div className="flex gap-2 mb-2">
//           <input
//             type="text"
//             value={learnItem}
//             onChange={(e) => setLearnItem(e.target.value)}
//             className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg"
//             placeholder="Understand React basics"
//           />
//           <button
//             type="button"
//             onClick={handleAddLearnItem}
//             className="bg-yellow-400 text-black px-3 rounded-lg"
//           >
//             <VscAdd />
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {courseData.whatYouWillLearn?.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md text-yellow-400"
//             >
//               {item}
//               <button onClick={() => handleRemoveLearnItem(index)}>
//                 <VscClose />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price */}
//       <div>
//         <label className="text-slate-300 text-sm">Price (INR) *</label>
//         <input
//           type="number"
//           value={courseData.price || ""}
//           onChange={(e) => updateCourseData("price", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="499"
//         />
//       </div>

//       {/* Tag */}
//       <div>
//         <label className="text-slate-300 text-sm">Tag *</label>
//         <select
//           value={courseData.tag || ""}
//           onChange={(e) => updateCourseData("tag", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//         >
//           <option value="">Select Tag</option>
//           {tags.map((tag) => (
//             <option key={tag._id} value={tag._id}>
//               {tag.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Thumbnail Upload (Cloudinary) */}
//       <Upload
//         label="Course Thumbnail *"
//         name="thumbnailImage"
//         setValue={(url) => updateCourseData("thumbnailImage", url)}
//       />

//       {/* Next Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleNextStep}
//           className="bg-yellow-400 text-black px-6 py-3 rounded-xl flex items-center gap-2"
//         >
//           Next Step <VscChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddCourseStep1;





// import React, { useState, useEffect } from "react";
// import { VscChevronRight, VscAdd, VscClose } from "react-icons/vsc";
// import Upload from "../../Course/Upload";
// import { getAllTags } from "../../Services/operations/Course";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const [learnItem, setLearnItem] = useState("");
//   const [tags, setTags] = useState([]);

//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddLearnItem = () => {
//     if (learnItem.trim()) {
//       const list = courseData.whatYouWillLearn || [];
//       updateCourseData("whatYouWillLearn", [...list, learnItem]);
//       setLearnItem("");
//     }
//   };

//   const handleRemoveLearnItem = (index) => {
//     const updated = [...(courseData.whatYouWillLearn || [])];
//     updated.splice(index, 1);
//     updateCourseData("whatYouWillLearn", updated);
//   };

//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const data = await getAllTags();
//         setTags(data?.data || []);
//       } catch (error) {
//         console.error("Failed to fetch tags:", error);
//       }
//     };
//     fetchTags();
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* Course Name */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Name *</label>
//         <input
//           type="text"
//           value={courseData.courseName || ""}
//           onChange={(e) => updateCourseData("courseName", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="Learn React from Scratch"
//         />
//       </div>

//       {/* Course Description */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Description *</label>
//         <textarea
//           rows="3"
//           value={courseData.courseDescription || ""}
//           onChange={(e) =>
//             updateCourseData("courseDescription", e.target.value)
//           }
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="This course covers..."
//         />
//       </div>

//       {/* What you will learn */}
//       <div>
//         <label className="text-slate-300 text-sm">What you will learn *</label>
//         <div className="flex gap-2 mb-2">
//           <input
//             type="text"
//             value={learnItem}
//             onChange={(e) => setLearnItem(e.target.value)}
//             className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg"
//             placeholder="Understand React basics"
//           />
//           <button
//             type="button"
//             onClick={handleAddLearnItem}
//             className="bg-yellow-400 text-black px-3 rounded-lg"
//           >
//             <VscAdd />
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {courseData.whatYouWillLearn?.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md text-yellow-400"
//             >
//               {item}
//               <button onClick={() => handleRemoveLearnItem(index)}>
//                 <VscClose />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price */}
//       <div>
//         <label className="text-slate-300 text-sm">Price (INR) *</label>
//         <input
//           type="number"
//           value={courseData.price || ""}
//           onChange={(e) => updateCourseData("price", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="499"
//         />
//       </div>

//       {/* Tag */}
//       <div>
//         <label className="text-slate-300 text-sm">Tag *</label>
//         <select
//           value={courseData.tag || ""}
//           onChange={(e) => updateCourseData("tag", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//         >
//           <option value="">Select Tag</option>
//           {tags.map((tag) => (
//             <option key={tag._id} value={tag._id}>
//               {tag.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Thumbnail */}
//       <Upload
//         label="Course Thumbnail *"
//         name="thumbnailImage"
//         onChange={(file) => updateCourseData("thumbnailImage", file)}
//       />

//       {/* Next Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={() => {
//             if (
//               !courseData.courseName ||
//               !courseData.courseDescription ||
//               courseData.whatYouWillLearn.length === 0 ||
//               !courseData.price ||
//               !courseData.tag ||
//               !courseData.thumbnailImage
//             ) {
//               alert("Please fill all required fields");
//               return;
//             }
//             setStep(2);
//           }}
//           className="bg-yellow-400 text-black px-6 py-3 rounded-xl flex items-center gap-2"
//         >
//           Next Step <VscChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddCourseStep1;





// import React, { useState, useEffect } from "react";
// import { VscChevronRight, VscAdd, VscClose } from "react-icons/vsc";
// import Upload from "../../Course/Upload";
// import { apiConnector } from "../../Services/apiConnector";
// import { toast } from "react-hot-toast";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const [learnItem, setLearnItem] = useState("");
//   const [tags, setTags] = useState([]);

//   // Fetch tags dynamically
//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const res = await apiConnector("GET", "/tags"); // adjust endpoint as per backend
//         if (res?.data?.success) {
//           setTags(res.data.data);
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load tags");
//       }
//     };
//     fetchTags();
//   }, []);

//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddLearnItem = () => {
//     if (learnItem.trim()) {
//       const list = courseData.whatYouWillLearn || [];
//       updateCourseData("whatYouWillLearn", [...list, learnItem]);
//       setLearnItem("");
//     }
//   };

//   const handleRemoveLearnItem = (index) => {
//     const updated = [...(courseData.whatYouWillLearn || [])];
//     updated.splice(index, 1);
//     updateCourseData("whatYouWillLearn", updated);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleAddLearnItem();
//     }
//   };

//   const handleNextStep = () => {
//     if (
//       !courseData.courseName ||
//       !courseData.courseDescription ||
//       courseData.whatYouWillLearn.length === 0 ||
//       !courseData.price ||
//       !courseData.tag ||
//       !courseData.thumbnailImage
//     ) {
//       toast.error("Please fill all required fields");
//       return;
//     }
//     setStep(2);
//   };

//   return (
//     <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

//       {/* Course Name */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Name *</label>
//         <input
//           type="text"
//           value={courseData.courseName || ""}
//           onChange={(e) => updateCourseData("courseName", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="Learn React from Scratch"
//         />
//       </div>

//       {/* Course Description */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Description *</label>
//         <textarea
//           rows="3"
//           value={courseData.courseDescription || ""}
//           onChange={(e) =>
//             updateCourseData("courseDescription", e.target.value)
//           }
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="This course covers..."
//         />
//       </div>

//       {/* What You Will Learn */}
//       <div>
//         <label className="text-slate-300 text-sm">What you will learn *</label>
//         <div className="flex gap-2 mb-2">
//           <input
//             type="text"
//             value={learnItem}
//             onChange={(e) => setLearnItem(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg"
//             placeholder="Understand React basics"
//           />
//           <button
//             type="button"
//             onClick={handleAddLearnItem}
//             className="bg-yellow-400 text-black px-3 rounded-lg"
//           >
//             <VscAdd />
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {courseData.whatYouWillLearn?.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md text-yellow-400"
//             >
//               {item}
//               <button onClick={() => handleRemoveLearnItem(index)}>
//                 <VscClose />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price */}
//       <div>
//         <label className="text-slate-300 text-sm">Price (INR) *</label>
//         <input
//           type="string"
//           value={courseData.price || ""}
//           onChange={(e) => updateCourseData("price", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="499"
//         />
//       </div>

//       {/* Tag */}
//       <div>
//         <label className="text-slate-300 text-sm">Tag *</label>
//         <select
//           value={courseData.tag || ""}
//           onChange={(e) => updateCourseData("tag", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//         >
//           <option value="">Select Tag</option>
//           {tags.map((tag) => (
//             <option key={tag._id} value={tag._id}>
//               {tag.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Thumbnail */}
//       <Upload
//         label="Course Thumbnail *"
//         name="thumbnailImage"
//         onChange={(file) => updateCourseData("thumbnailImage", file)}
//       />

//       {/* Next Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleNextStep}
//           className="bg-yellow-400 text-black px-6 py-3 rounded-xl flex items-center gap-2"
//         >
//           Next Step <VscChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddCourseStep1;




// import React, { useState } from "react";
// import { VscChevronRight, VscAdd, VscClose } from "react-icons/vsc";
// import Upload from "../../Course/Upload";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const [learnItem, setLearnItem] = useState("");

//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddLearnItem = () => {
//     if (learnItem.trim()) {
//       const list = courseData.whatYouWillLearn || [];
//       updateCourseData("whatYouWillLearn", [...list, learnItem]);
//       setLearnItem("");
//     }
//   };

//   const handleRemoveLearnItem = (index) => {
//     const updated = [...(courseData.whatYouWillLearn || [])];
//     updated.splice(index, 1);
//     updateCourseData("whatYouWillLearn", updated);
//   };


//   return (
//     <div className="space-y-6">

//       {/* Course Name */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Name *</label>
//         <input
//           type="text"
//           value={courseData.courseName || ""}
//           onChange={(e) => updateCourseData("courseName", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="Learn React from Scratch"
//         />
//       </div>

//       {/* Course Description */}
//       <div>
//         <label className="text-slate-300 text-sm">Course Description *</label>
//         <textarea
//           rows="3"
//           value={courseData.courseDescription || ""}
//           onChange={(e) =>
//             updateCourseData("courseDescription", e.target.value)
//           }
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="This course covers..."
//         />
//       </div>

//       {/* What you will learn */}
//       <div>
//         <label className="text-slate-300 text-sm">What you will learn *</label>

//         <div className="flex gap-2 mb-2">
//           <input
//             type="text"
//             value={learnItem}
//             onChange={(e) => setLearnItem(e.target.value)}
//             className="flex-1 bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg"
//             placeholder="Understand React basics"
//           />
//           <button
//             type="button"
//             onClick={handleAddLearnItem}
//             className="bg-yellow-400 text-black px-3 rounded-lg"
//           >
//             <VscAdd />
//           </button>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {courseData.whatYouWillLearn?.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md text-yellow-400"
//             >
//               {item}
//               <button onClick={() => handleRemoveLearnItem(index)}>
//                 <VscClose />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Price */}
//       <div>
//         <label className="text-slate-300 text-sm">Price (INR) *</label>
//         <input
//           type="number"
//           value={courseData.price || ""}
//           onChange={(e) => updateCourseData("price", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//           placeholder="499"
//         />
//       </div>

//       {/* Tag */}
//       <div>
//         <label className="text-slate-300 text-sm">Tag *</label>
//         <select
//           value={courseData.tag || ""}
//           onChange={(e) => updateCourseData("tag", e.target.value)}
//           className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg"
//         >
//           <option value="">Select Tag</option>
//           <option value="WEB_TAG_ID">Web Development</option>
//           <option value="DATA_TAG_ID">Data Science</option>
//         </select>
//       </div>

//       {/* Thumbnail */}
//       <Upload
//         label="Course Thumbnail *"
//         name="thumbnailImage"
//         onChange={(file) => updateCourseData("thumbnailImage", file)}
//       />

//       {/* Next Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={() => {
//             if (
//               !courseData.courseName ||
//               !courseData.courseDescription ||
//               courseData.whatYouWillLearn.length === 0 ||
//               !courseData.price ||
//               !courseData.tag ||
//               !courseData.thumbnailImage
//             ) {
//               alert("Please fill all required fields");
//               return;
//             }
//             setStep(2);
//           }}
//           className="bg-yellow-400 text-black px-6 py-3 rounded-xl flex items-center gap-2"
//         >
//           Next Step <VscChevronRight />
//         </button>

//       </div>
//     </div>
//   );
// }

// export default AddCourseStep1;






// import React, { useState } from "react";
// import { VscChevronRight, VscAdd, VscClose } from "react-icons/vsc";
// import Upload from "../../Course/Upload";

// function AddCourseStep1({ setStep, courseData, setCourseData }) {
//   const [requirement, setRequirement] = useState("");

//   const updateCourseData = (name, value) => {
//     setCourseData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddRequirement = () => {
//     if (requirement.trim()) {
//       const currentList = courseData?.requirements || [];
//       updateCourseData("requirements", [...currentList, requirement]);
//       setRequirement("");
//     }
//   };

//   const handleRemoveRequirement = (index) => {
//     const updatedList = [...courseData.requirements];
//     updatedList.splice(index, 1);
//     updateCourseData("requirements", updatedList);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleAddRequirement();
//     }
//   };

//   return (
//     <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

//       {/* Basic Info */}
//       <div className="grid grid-cols-1 gap-5">
//         <div>
//           <label className="block text-sm text-slate-300 mb-2">
//             Course Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={courseData?.title || ""}
//             onChange={(e) => updateCourseData("title", e.target.value)}
//             placeholder="e.g. Advanced React Patterns"
//             className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400/50"
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-slate-300 mb-2">
//             Course Short Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             rows="3"
//             value={courseData?.description || ""}
//             onChange={(e) => updateCourseData("description", e.target.value)}
//             placeholder="Enter a brief summary of the course"
//             className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400/50"
//           />
//         </div>
//       </div>

//       {/* Price & Category */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         <div>
//           <label className="block text-sm text-slate-300 mb-2">Price (INR)</label>
//           <div className="relative">
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
//             <input
//               type="text"
//               value={courseData?.price || ""}
//               onChange={(e) => updateCourseData("price", e.target.value)}
//               placeholder="0.00"
//               className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400/50"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm text-slate-300 mb-2">Category</label>
//           <select
//             value={courseData?.category || ""}
//             onChange={(e) => updateCourseData("category", e.target.value)}
//             className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400/50"
//           >
//             <option value="" disabled>Select Category</option>
//             <option value="web">Web Development</option>
//             <option value="data">Data Science</option>
//             <option value="design">UI/UX Design</option>
//           </select>
//         </div>
//       </div>

//       {/* Thumbnail */}
//       <Upload
//         label="Course Thumbnail"
//         name="courseImage"
//         value={courseData?.thumbnail}
//         onChange={(file) => updateCourseData("thumbnail", file)}
//       />

//       {/* Requirements */}
//       <div>
//         <label className="block text-sm text-slate-300 mb-2">
//           Requirements / Instructions
//         </label>

//         <div className="flex flex-col sm:flex-row gap-2 mb-3">
//           <input
//             type="text"
//             value={requirement}
//             onChange={(e) => setRequirement(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="e.g. Basic JS knowledge"
//             className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm focus:ring-1 focus:ring-yellow-400"
//           />
//           <button
//             type="button"
//             onClick={handleAddRequirement}
//             className="flex items-center justify-center sm:w-auto w-full bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-slate-900 transition"
//           >
//             <VscAdd size={22} />
//           </button>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {courseData?.requirements?.map((req, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md text-xs sm:text-sm border border-yellow-400/30 text-yellow-400"
//             >
//               {req}
//               <button onClick={() => handleRemoveRequirement(index)}>
//                 <VscClose className="hover:text-red-400" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-end pt-5 border-t border-slate-800">
//         <button
//           onClick={() => setStep(2)}
//           className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-400 px-8 py-3 rounded-xl font-bold text-slate-900 hover:bg-yellow-500 transition"
//         >
//           Next Step <VscChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddCourseStep1;
