import * as api from '../api';

export const setcurrentuser = (data) => {
    console.log("Fetched Current User Data:", data); // Debugging API response
  return {
    type: "FETCH_CURRENT_USER",
    payload: data,
  };
};

export const addFriend = (userId, friendId) => async (dispatch) => {
  try {
    const { data } = await api.addFriend(userId, friendId);

    console.log("Updated User from API:", data); // Debugging
    dispatch({ type: "ADD_FRIEND", payload: data });
    dispatch(setcurrentuser(data))
    // No need to call getUserFriends() if data already contains the updated friends list
  } catch (error) {
    console.error("Error adding friend:", error.response ? error.response.data : error.message);
  }
};

export const getUserFriends = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getUserFriends(userId);
    console.log("current user action ", data)
    dispatch({ type: "FETCH_USER_FRIENDS_SUCCESS", payload: data || [] });
  } catch (error) {
    console.error("Error fetching friends:", error.response ? error.response.data : error.message);
  }
};
