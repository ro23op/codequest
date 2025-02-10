import * as api from '../api';

export const SendOtp = (email) => async (dispatch) => {
    try {
        const { data } = await api.SendOtp(email);  
        dispatch({ type: "SEND_OTP", payload: data });
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
};

export const verifyOtp = ( email, otp ) => async (dispatch) => {
    try {
        console.log("Entered OTP:", otp);
        
        // ✅ Send email & OTP as an object in API request
        const response = await api.verifyotp(email, otp);
        console.log(response)
        if (response.data.success) {
            dispatch({ type: "VERIFY_OTP", payload: response.data.user });
            
            // ✅ Return a payload object
            return { payload: { success: true, user: response.data.user } };
        } else {
            return { payload: { success: false } };
        }
    } catch (error) {
        console.error("OTP verification failed", error);
        dispatch({ type: "LOGIN_FAILURE" });
        return { payload: { success: false } };
    }
};
