const currentuserreducer = (state = null, action) => {

    switch (action.type) {
        case "FETCH_CURRENT_USER":
            return action.payload;
        case "ADD_FRIEND":
            return {
                ...state,
                result: {
                    ...state.result,
                    friends: action.payload.friends, // Update only the friends array
                },
            };
        case "FETCH_USER_FRIENDS_SUCCESS":
            return {
                ...state,
                friends: action.payload, // Ensure `action.payload` contains the friends array
            };
        case "FETCH_USER_FRIENDS_FAIL":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default currentuserreducer;
