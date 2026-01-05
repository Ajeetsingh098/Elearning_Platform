
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/common/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Components/Core/Auth/ForgotPassword";
import UpdatePassword from "./Components/Core/Auth/UpdatePassword";

import { setToken } from "./Slices/authSlice";
import { setUser } from "./Slices/profileSlice";

import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import MyProfile from "./Components/ProfileSection/MyProfile";
import EnrolledCourses from "./Components/ProfileSection/EnrolledCourses";
import Setting from "./Components/ProfileSection/Setting";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import RoleProtectedRoute from "./Components/Core/Auth/RoleProtectedRoute";
import Error from "./Pages/Error";
import Cart from "./Components/Cart/Cart";
import Catalog from "./Pages/Catalog";

// Course Viewing Components
import ViewCourse from "./Components/ProfileSection/ViewCourse";
import VideoDetails from "./ViewCourse/VideoDetails";

// Instructor pages
import InstructorDashboard from "./Components/ProfileSection/InstructorDashboard";
import MyCourses from "./Components/ProfileSection/MyCourses";
import AddCourses from "./Components/ProfileSection/AddCourses";
import EditCourse from "./ViewCourse/EditCourse";
import CourseDetails from "./ViewCourse/CourseDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (token) dispatch(setToken(token));
    if (user) dispatch(setUser(user));
  }, [dispatch]);

  return (
    <div className="w-screen min-h-screen bg-slate-900 font-inter flex flex-col">
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />

        {/* ================= VIEW COURSE ROUTES (NESTED) ================= */}
        {/* This structure allows the Sidebar to stay while videos change */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          <Route
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />



        </Route>

        {/* ================= STUDENT ROUTES ================= */}
        <Route
          path="/dashboard/cart"
          element={
            <PrivateRoute>
              <RoleProtectedRoute allowedRoles={["Student"]}>
                <Cart />
              </RoleProtectedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/enrolled-courses"
          element={
            <PrivateRoute>
              <RoleProtectedRoute allowedRoles={["Student"]}>
                <EnrolledCourses />
              </RoleProtectedRoute>
            </PrivateRoute>
          }
        />

        {/* ================= COMMON PROTECTED ROUTES ================= */}
        <Route
          path="/dashboard/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />

        {/* ================= INSTRUCTOR ROUTES ================= */}
        <Route
          path="/dashboard/instructor"
          element={
            <PrivateRoute>
              <RoleProtectedRoute allowedRoles={["Instructor"]}>
                <InstructorDashboard />
              </RoleProtectedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/my-courses"
          element={
            <PrivateRoute>
              <RoleProtectedRoute allowedRoles={["Instructor"]}>
                <MyCourses />
              </RoleProtectedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/add-courses"
          element={
            <PrivateRoute>
              <RoleProtectedRoute allowedRoles={["Instructor"]}>
                <AddCourses />
              </RoleProtectedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="dashboard/edit-course/:courseId"
          element={
            <PrivateRoute>
              <RoleProtectedRoute allowedRoles={["Instructor"]}>
                <EditCourse />
              </RoleProtectedRoute>
            </PrivateRoute>
          }

        />

        <Route path="catalog/:categoryName" element={<Catalog />} />
        // App.jsx
        <Route path="courses/:courseId" element={<CourseDetails />} />
        {/* ================= 404 ROUTE ================= */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;















// // import { Routes, Route } from "react-router-dom";
// // import { useEffect } from "react";
// // import { useDispatch } from "react-redux";

// // import "./App.css";
// // import Home from "./Pages/Home";
// // import Navbar from "./Components/common/Navbar";
// // import Login from "./Pages/Login";
// // import Signup from "./Pages/Signup";
// // import ForgotPassword from "./Components/Core/Auth/ForgotPassword";

// // import UpdatePassword from "./Components/Core/Auth/UpdatePassword";

// // import { setToken } from "./Slices/authSlice";
// // import { setUser } from "./Slices/profileSlice";
// // import About from "./Pages/About";
// // import ContactUs from "./Pages/ContactUs";
// // import MyProfile from "./Components/ProfileSection/MyProfile";
// // import EnrolledCourses from "./Components/ProfileSection/EnrolledCourses";
// // import Setting from "./Components/ProfileSection/Setting";
// // import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
// // import Error from "./Pages/Error"
// // import Cart from "./Components/Cart/Cart";

// // function App() {
// //   const dispatch = useDispatch();


// //   useEffect(() => {
// //     const token = JSON.parse(localStorage.getItem("token"));
// //     const user = JSON.parse(localStorage.getItem("user"));

// //     if (token) dispatch(setToken(token));
// //     if (user) dispatch(setUser(user));
// //   }, [dispatch]);

// //   return (
// //     <div className="w-screen min-h-screen bg-slate-900 font-inter">


// //       <Navbar />


// //       <div className="bg-slate-900">
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />
// //           <Route path="/about" element={<About />} />
// //           <Route path="/contact" element={<ContactUs />} />

// //           <Route path="/forgot-password" element={<ForgotPassword />} />
// //           <Route path="/update-password/:token" element={<UpdatePassword />} />

// //           <Route path="/dashboard/my-profile" element={<PrivateRoute> <MyProfile></MyProfile></PrivateRoute>} />
// //           <Route path="/dashboard/settings" element={<PrivateRoute><Setting /></PrivateRoute>} />

// //           <Route path="/dashboard/enrolled-Courses" element={<PrivateRoute><EnrolledCourses/></PrivateRoute>} />
// //            <Route path="/dashboard/cart" element={<PrivateRoute><Cart></Cart></PrivateRoute>} />



// //           <Route path="*" element={<Error />} />


// //         </Routes>
// //       </div>

// //     </div>
// //   );
// // }

// // export default App;

// import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// import "./App.css";
// import Home from "./Pages/Home";
// import Navbar from "./Components/common/Navbar";
// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import ForgotPassword from "./Components/Core/Auth/ForgotPassword";
// import UpdatePassword from "./Components/Core/Auth/UpdatePassword";

// import { setToken } from "./Slices/authSlice";
// import { setUser } from "./Slices/profileSlice";

// import About from "./Pages/About";
// import ContactUs from "./Pages/ContactUs";
// import MyProfile from "./Components/ProfileSection/MyProfile";
// import EnrolledCourses from "./Components/ProfileSection/EnrolledCourses";
// import Setting from "./Components/ProfileSection/Setting";
// import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
// import RoleProtectedRoute from "./Components/Core/Auth/RoleProtectedRoute";
// import Error from "./Pages/Error";
// import Cart from "./Components/Cart/Cart";
// import ViewCourse from "./Components/ProfileSection/ViewCourse";

// // Instructor pages (example)
// import InstructorDashboard from "./Components/ProfileSection/InstructorDashboard";
// import MyCourses from "./Components/ProfileSection/MyCourses";
// import AddCourses from "./Components/ProfileSection/AddCourses"



// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem("token"));
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (token) dispatch(setToken(token));
//     if (user) dispatch(setUser(user));
//   }, [dispatch]);

//   return (
//     <div className="w-screen min-h-screen bg-slate-900 font-inter">
//       <Navbar />

//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/update-password/:token" element={<UpdatePassword />} />


//         <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<ViewCourse />} />

//         {/* Student Routes */}
//         <Route
//           path="/dashboard/cart"
//           element={
//             <PrivateRoute>
//               <RoleProtectedRoute allowedRoles={["Student"]}>
//                 <Cart />
//               </RoleProtectedRoute>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/dashboard/enrolled-courses"
//           element={
//             <PrivateRoute>
//               <RoleProtectedRoute allowedRoles={["Student"]}>
//                 <EnrolledCourses />
//               </RoleProtectedRoute>
//             </PrivateRoute>
//           }
//         />

//         {/* Common for both */}
//         <Route
//           path="/dashboard/my-profile"
//           element={
//             <PrivateRoute>
//               <MyProfile />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/dashboard/settings"
//           element={
//             <PrivateRoute>
//               <Setting />
//             </PrivateRoute>
//           }
//         />

//         {/* Instructor Routes */}

//         <Route
//           path="/dashboard/instructor"
//           element={
//             <PrivateRoute>
//               <RoleProtectedRoute allowedRoles={["Instructor"]}>
//                 <InstructorDashboard />
//               </RoleProtectedRoute>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/dashboard/my-courses"
//           element={
//             <PrivateRoute>
//               <RoleProtectedRoute allowedRoles={["Instructor"]}>
//                 <MyCourses />
//               </RoleProtectedRoute>
//             </PrivateRoute>
//           }
//         />

//          <Route
//           path="/dashboard/add-courses"
//           element={
//             <PrivateRoute>
//               <RoleProtectedRoute allowedRoles={["Instructor"]}>
//                 <AddCourses />
//               </RoleProtectedRoute>
//             </PrivateRoute>
//           }
//         />

//         <Route path="*" element={<Error />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
