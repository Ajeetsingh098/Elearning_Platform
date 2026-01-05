import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setToken, setLoading } from "../../Slices/authSlice";
import { setUser } from "../../Slices/profileSlice";
import { profile } from "../api";


const {
  DELETEACCOUNT_API,
  UPDATEPROFILE_API,
  GETUSERDETAIL_API,
 GET_USER_ENROLLED_COURSES_API
} = profile;


export const getUserDetails = (token) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GETUSERDETAIL_API, {}, {
        Authorization: `Bearer ${token}`,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.userDetails));
      }
    } catch (error) {
      console.error("GET_USER_DETAILS_ERROR:", error);
      toast.error("Could not fetch user details");
    }
  };
};

export const deleteAccount = (token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting account...");
    try {

      const response = await apiConnector("POST", DELETEACCOUNT_API, {}, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Account Deleted successfully!");

      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log("DELETE_API_ERROR...", error);
      toast.error("Could not delete account.");
    }
    toast.dismiss(toastId);
  };
};


export const updateProfile = (token, formData) => {
  return async (dispatch) => {

    const toastId = toast.loading("Updating...");
    try {
      const response = await apiConnector("PUT", UPDATEPROFILE_API, formData, {
        Authorization: `Bearer ${token}`,

      });

      // console.log("API RESPONSE:", response.data);

      if (!response.data.success)
        throw new Error(response.data.message);


      // const updatedUser = response.data.updatedUserDetails;
      // dispatch(setUser({ ...updatedUser }));

      const updatedUser = response.data.updatedUserDetails;
      dispatch(setUser(updatedUser)); 
      localStorage.setItem("user", JSON.stringify(updatedUser));
     


      toast.success("Profile Updated!");
    } catch (error) {
      console.log("UPDATE_PROFILE_API_ERROR...", error);
      toast.error("Could not update profile.");
    }
    toast.dismiss(toastId);
  };
};

export const getUserEnrolledCourses = (token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading courses...");
    try {
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Courses loaded successfully");

    
      return response.data.data;

    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API_ERROR...", error);
      toast.error("Could not fetch enrolled courses");
       return [];
    }
    finally {
      toast.dismiss(toastId);
    }
  };
};
