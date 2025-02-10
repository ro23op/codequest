const loginreducer = (state = { otpSent: false, user: null }, action) => {
    switch (action.type) {
        case "SEND_OTP":
            return { ...state, otpSent: true };
        
        case "VERIFY_OTP":
            return { ...state, user: action.payload, otpSent: false };

        case "LOGIN_FAILURE":
            return { ...state, otpSent: false, user: null };

        default:
            return state;
    }
};

export default loginreducer;
