
import { apiConnector } from "../apiConnector";
import { categories, courseEndpoints } from "../api";
import { toast } from "react-hot-toast";





// ================= COURSE OPERATIONS =================

export const createCourse = async (formData, token) => {
    let result = null;
    const toastId = toast.loading("Creating Course...");
    try {
        const response = await apiConnector(
            "POST",
            courseEndpoints.CREATE_COURSE_API,
            formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
    } catch (error) {
        console.error("CREATE COURSE ERROR:", error);
        toast.error(error.message || "Could not create course");
    }
    toast.dismiss(toastId);
    return result;
};

export const fetchInstructorCourses = async (token) => {
    let result = [];
    try {
        const response = await apiConnector(
            "GET",
            courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,
            null,
            { Authorization: `Bearer ${token}` }
        );
        if (response?.data?.success) {
            result = response.data.data;
        }
    } catch (error) {
        console.error("FETCH INSTRUCTOR COURSES ERROR:", error);
        toast.error("Could not fetch your courses");
    }
    return result;
};

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Deleting...");
    try {
        const response = await apiConnector(
            "DELETE",
            courseEndpoints.DELETE_COURSE_API,
            data,
            { Authorization: `Bearer ${token}` }
        );
        if (response?.data?.success) {
            toast.success("Course Deleted");
        }
    } catch (error) {
        console.error("DELETE COURSE ERROR:", error);
        toast.error("Could not delete course");
    }
    toast.dismiss(toastId);
};

// ================= EDIT COURSE OPERATION =================
export const editCourseDetails = async (formData, token) => {
    let result = null;
    const toastId = toast.loading("Updating Course...");
    try {
        const response = await apiConnector(
            "POST", 
            courseEndpoints.EDIT_COURSE_API,
            formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        );

      console.log("EDIT COURSE API RESPONSE:", response);

        if (!response?.data?.success) {
            throw new Error(response.data.message || "Failed to update course");
        }

        // toast.success("Course Details Updated Successfully");
      result = response?.data?.data ? response.data.data : response.data;
    } catch (error) {
        console.error("EDIT COURSE API ERROR:", error);
      const errorMessage = error.response?.data?.message || error.message || "Could not update course";
        toast.error(errorMessage);
        result = null;
    }
    toast.dismiss(toastId);
    return result;
};
// ================= SECTION OPERATIONS =================

export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Adding Section...");
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (response?.data?.success) {
            toast.success("Section Added");
            result = response.data.data;
        }
    } catch (error) {
        toast.error("Failed to add section");
    }
    toast.dismiss(toastId);
    return result;
};

export const updateSection = async (data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST", courseEndpoints.UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (response?.data?.success) {
            toast.success("Section Updated");
            result = response.data.data;
        }
    } catch (error) {
        toast.error("Failed to update section");
    }
    return result;
};

// ================= SUB-SECTION OPERATIONS =================

export const createSubSection = async (formData, token,) => {
    let result = null;
    const toastId = toast.loading("Uploading Video...");
    try {
        const response = await apiConnector(
            "POST",
            courseEndpoints.CREATE_SUBSECTION_API,
            formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },

        );
        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }

        toast.success("Lecture Added");
        result = response.data.data;

    } catch (error) {
        console.error("CREATE SUBSECTION ERROR:", error);
        toast.error(error.message || "Video upload failed");
    }
    toast.dismiss(toastId);
    return result;
};

// ================= TAG OPERATIONS =================

export const getAllTags = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", categories.CATEGORIES_API);
        if (response?.data?.success) {
            result = response.data.data;
        }
    } catch (error) {
        console.error("GET ALL TAGS ERROR:", error);
    }
    return result;
};



export const getFullDetailsOfCourse = async (courseId, token) => {
    let result = null;
    try {
        const response = await apiConnector(
            "POST",
            courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            { courseId },
            { Authorization: `Bearer ${token}` }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } catch (error) {
        console.error("GET_FULL_DETAILS_API ERROR............", error);
        result = error.response.data;
    }
    return result;
};


export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error("Could not Create Rating");
        }
        toast.success("Rating Created");
        success = true;
    } catch (error) {
        success = false;
        const errorMessage = error.response?.data?.message || error.message;
        console.error("CREATE RATING ERROR:", errorMessage);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return success;
};


export const fetchCourseDetails = async (courseId) => {
    let result = null;
    try {
        const response = await apiConnector(
            "POST", 
            courseEndpoints.COURSE_DETAILS_API, 
            { courseId } 
        );
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } catch (error) {
        console.error("COURSE_DETAILS_API ERROR", error);
        result = null;
    }
    return result;
};

