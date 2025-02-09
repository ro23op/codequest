import * as api from '../api'
export const fetchallusers = ()=>async(dispatch)=>{
    try {
        const {data} = await api.getallusers();
        dispatch({type:"FETCH_USERS",payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const updateprofile = (id,updatedata)=>async(dispatch)=>{
    try {
        const {data} = await api.updateprofile(id,updatedata)
        dispatch({type:"UPDATE_CURRENT_USER",payload:data})
    } catch (error) {
        console.log(error)
    }
}
export const getUserFriends = (userId) => async (dispatch) => {
  try {
    // console.log("from user action", userId);

    // Ensure this correctly calls the API
    const { data } = await api.getUserFriends(userId);

    // console.log("Friends API Response:", data); // Debug response

    dispatch({ type: "FETCH_USER_FRIENDS_SUCCESS", payload: data.friends });

  } catch (error) {
    console.error("Error fetching friends:", error.response ? error.response.data : error.message);
  }
};


  