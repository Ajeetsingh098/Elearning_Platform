


const BASE_URL = import.meta.env.VITE_BASE_URL;

// CATEGORY ENDPOINTS
export const categories = {
    CATEGORIES_API: `${BASE_URL}/tag/showAlltags`,
    CATEGORY_PAGE_DETAILS_API: `${BASE_URL}/tag/tagPageDetails`,
};

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: `${BASE_URL}/auth/sendotp`,
    LOGIN_API: `${BASE_URL}/auth/login`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    RESETPASSWORD_API: `${BASE_URL}/auth/resetpassword`,
    RESETPASSTOKEN_API: `${BASE_URL}/auth/resetpasswordtoken`,
}

// PROFILE ENDPOINTS
export const profile = {
    UPDATEPROFILE_API: `${BASE_URL}/profile/updateProfile`,
    DELETEACCOUNT_API: `${BASE_URL}/profile/deleteaccount`,
    GETUSERDETAIL_API: `${BASE_URL}/profile/getalluserdetails`,
    GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/getEnrolledCourses`,
    INSTRUCTOR_DASHBOARD_API: `${BASE_URL}/profile/instructorDashboard`,
}

// STUDENT/PAYMENT ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: `${BASE_URL}/payment/capturePayment`,
    COURSE_VERIFY_API: `${BASE_URL}/payment/verifyPayment`,
    SEND_PAYMENT_SUCCESS_EMAIL_API: `${BASE_URL}/payment/sendPaymentSuccessEmail`
}

// COURSE ENDPOINTS (Expanded)
export const courseEndpoints = {
    // Course General
    GET_ALL_COURSE_API: `${BASE_URL}/course/showAllCourses`,
    COURSE_DETAILS_API: `${BASE_URL}/course/getcoursedetails`,
    CREATE_COURSE_API: `${BASE_URL}/course/createcourse`,
    EDIT_COURSE_API: `${BASE_URL}/course/editCourse`,
    GET_ALL_INSTRUCTOR_COURSES_API: `${BASE_URL}/course/getInstructorCourses`,
    DELETE_COURSE_API: `${BASE_URL}/course/deleteCourse`,

    // Section Management
    CREATE_SECTION_API: `${BASE_URL}/course/addSection`,
    UPDATE_SECTION_API: `${BASE_URL}/course/updateSection`,
    DELETE_SECTION_API: `${BASE_URL}/course/deleteSection`,

    // Sub-Section Management
    CREATE_SUBSECTION_API: `${BASE_URL}/course/createSubsection`,
    UPDATE_SUBSECTION_API: `${BASE_URL}/course/updateSubsection`,
    DELETE_SUBSECTION_API: `${BASE_URL}/course/deleteSubsection`,

    // Ratings
    GET_ALL_RATING_API: `${BASE_URL}/course/getAllRating`,
    CREATE_RATING_API: `${BASE_URL}/course/createRating`,

    GET_FULL_COURSE_DETAILS_AUTHENTICATED: `${BASE_URL}/course/getFullCourseDetails`,

}







