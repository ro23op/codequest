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
        default:
            return state;
    }
};

export default currentuserreducer;
