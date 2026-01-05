


import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers: {
      ...headers, 
    },
    params,
  
  });
};


// export const apiConnector = (method, url, bodyData = null, headers = {}, params = null, config = {}) => {
//   return axiosInstance({
//     method: `${method}`,
//     url: `${url}`,
//     data: bodyData ? bodyData : null,
//     headers: headers ? headers : null,
//     params: params ? params : null,
//     ...config, 
//   });
// };












// export const apiConnector = (method, url, bodyData = {}, headers = {}, params = {}) => {


//   // console.log("LOGGING REQ:", { method, url, bodyData, headers });

//   return axiosInstance({
//     method,
//     url,
//     data: bodyData,
//     headers,
//     params,
//   });
// };


// import axios from "axios";

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//    console.log("LOGGING REQ:", { method, url, bodyData, headers });
//     return axiosInstance({
//         method: `${method}`,
//         url: `${url}`,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers : null,
//         params: params ? params : null,
//     });
// };


// import axios from "axios"
// import toast from "react-hot-toast";

// export const axiosInstance =axios.create({});

// export const apiConnector = async (method, url, bodyData, headers, params) => {
//     try {
//         const res = await axiosInstance({
//             method,
//             url,
//             data: bodyData || null,
//             headers: headers || null,
//             params: params || null,
//         });
//         return res;
//     } catch (error) {
//         console.error("API Connector Error:", error.response?.data || error.message);
//        const errorMessage = error?.response?.data?.message || "An error occurred";
//       toast.error(errorMessage);
//     }
// };
