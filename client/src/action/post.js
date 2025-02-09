import * as api from "../api";

export const fetchPosts = () => async dispatch => {
    dispatch({ type: "FETCH_POSTS_REQUEST" });
    try {
        const { data } = await api.getAllPosts();
        // console.log(data)
        dispatch({ type: "FETCH_POSTS_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "FETCH_POSTS_FAILURE", payload: error.message });
    }
};

// Create a post

export const createPost = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createPost(formData)
        dispatch({ type: "CREATE_POST_SUCCESS", payload: data });
        alert("Post created successfully!");
        navigate("/Public");
    } catch (error) {
        console.error("Error creating post:", error.response?.data || error);
        alert("Failed to create post.");
    }
};



// Like a post
export const likePost = (postId, userId) => async dispatch => {
    try {
        const { data } = await api.likePost("/api/posts/like", { postId, userId });
        dispatch({ type: "LIKE_POST_SUCCESS", payload: { postId, likes: data.likes } });
    } catch (error) {
        console.error("Error liking post:", error);
    }
};

// Comment on a post
export const commentOnPost = (postId, userId, comment) => async dispatch => {
    try {
        const { data } = await api.commentOnPost("/api/posts/comment", { postId, userId, comment });
        dispatch({ type: "COMMENT_POST_SUCCESS", payload: { postId, comment: data } });
    } catch (error) {
        console.error("Error commenting on post:", error);
    }
};


