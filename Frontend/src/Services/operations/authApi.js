import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setToken, setLoading } from "../../Slices/authSlice";
import { setUser } from "../../Slices/profileSlice";
import { endpoints } from "../api"; 


const SUCCESS_TOAST_DURATION = 30000; 


const { 
    SENDOTP_API, 
    SIGNUP_API, 
    LOGIN_API, 
    RESETPASSTOKEN_API, 
    RESETPASSWORD_API 
} = endpoints;


/* SEND OTP  */
export const sendOtp = (email) => {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API,
         { email, checkUserPresent: true });
         
       

     toast.success("OTP sent successfully!", { id: toastId });
      return response.data;

    } catch (error) {

      console.error("sendOtp API error:", error);

     const errorMessage = 
        error?.response?.data?.message || 
        error?.message ||                 
        "Sending OTP failed";            
        
      toast.error(errorMessage, { id: toastId })

         throw error;
    } finally {
      dispatch(setLoading(false));
       
    }
  };
};

/* SIGNUP  */
export const signup = (formData, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Creating account...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, formData);
      if (!response.data.success) throw new Error(response.data.message);
      
     
      toast.success("Signup successful! Please log in.", { id: toastId,  }); 
      
      navigate("/login");
      return response.data;
    } catch (error) {
      console.error("signup API error:", error);
      toast.error(error?.message || "Signup failed", { id: toastId });
      throw error;
    } finally {
      dispatch(setLoading(false));
      if (toastId) toast.dismiss(toastId);
    }
  };
};

/* LOGIN  */
export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });
      if (!response.data.success) throw new Error(response.data.message);

      const userData = response.data.user;
      const userImage = userData?.image
        ? userData.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

      
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...userData, image: userImage }));

      
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify({ ...userData, image: userImage }));

     
      toast.success("LoggedIn successful!", { id: toastId, duration: SUCCESS_TOAST_DURATION });

      navigate("/");
    } catch (error) {
      console.error("login API error:", error);
      toast.error(error?.message || "Login failed", { id: toastId });
      throw error; 
    } finally {
      dispatch(setLoading(false));
      if (toastId) toast.dismiss(toastId);
    }
  };
};

/* LOGOUT  */
export const logout = (navigate) => {
    return (dispatch) => {
      dispatch(setToken(null));
      dispatch(setUser(null));

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
     
      toast.success("Logged out successfully");
      
      navigate("/login"); 
    };
};

/*  RESET PASSWORD TOKEN  */
export const resetPasswordToken = (email) => {
  return async (dispatch) => {
    const toastId = toast.loading("Sending reset link...");
    
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });
      if (!response.data.success) throw new Error(response.data.message);
      
     
      toast.success("Reset link sent!", { id: toastId, });
      
      return response.data;
    } catch (error) {
      console.error("resetPasswordToken API error:", error);
      toast.error(error?.message || "Failed to send reset link", { id: toastId });
      throw error; 
    } finally {
      dispatch(setLoading(false));
      if (toastId) toast.dismiss(toastId);
    }
  };
};

/* RESET PASSWORD  */
export const resetPassword = (password, confirmPassword, token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Resetting password...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });
      if (!response.data.success) throw new Error(response.data.message);
      
     
      toast.success("Password reset successful!", { id: toastId, });
      
      navigate("/login");
      return response.data;
    } catch (error) {
      console.error("resetPassword API error:", error);
      toast.error(error?.message || "Password reset failed", { id: toastId });
      throw error; 
    } finally {
      dispatch(setLoading(false));
      if (toastId) toast.dismiss(toastId);
    }
  };
};