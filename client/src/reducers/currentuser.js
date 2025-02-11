const currentuserreducer = (state = null, action) => {
    // console.log("Previous State:", state);
    // console.log("Action Received:", action);
  
    switch (action.type) {
      case "FETCH_CURRENT_USER":
        console.log("New State (FETCH_CURRENT_USER):", action.payload);
        return action.payload;
  
      case "ADD_FRIEND":
        return action.payload;
  
      case "FETCH_USER_FRIENDS_SUCCESS":
        return {
          ...(state || {}),
          friends: action.payload || [],
        };
  
      case "FETCH_USER_FRIENDS_FAIL":
        return { ...(state || {}), error: action.payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export default currentuserreducer;
  