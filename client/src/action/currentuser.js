import * as api from '../api'

export const setcurrentuser = (data)=>{
    return {
        type:"FETCH_CURRENT_USER",
        payload:data,
    };
};


export const addFriend = (userId, friendId) => async (dispatch) => {
    try {
        const { data } = await api.addFriend(userId, friendId);
        // console.log("Updated User from API:", data); // Debugging
        dispatch({ type: "ADD_FRIEND", payload: data }); // Ensure data contains updated user info
    } catch (error) {
        console.log(error);
    }
};
