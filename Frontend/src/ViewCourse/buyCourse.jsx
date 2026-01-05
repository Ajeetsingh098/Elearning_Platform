import { toast } from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

// Load Razorpay Script
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        // 1. Load the SDK
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // 2. Initiate the order from backend
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                { courses }, 
                                { Authorization: `Bearer ${token}` });

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        // 3. Options for Razorpay Modal
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY, 
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: userDetails.firstName,
                email: userDetails.email
            },
            handler: function (response) {
                // Send email
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                // Verify Payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed");
        });

    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

// Verify Payment Function
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}