const initialState = {
    posts: [],
    loading: false,
    error: null
};

const postreducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_POSTS_REQUEST":
            return { ...state, loading: true };
        case "FETCH_POSTS_SUCCESS":
            return { ...state, posts: action.payload, loading: false };
        case "FETCH_POSTS_FAILURE":
            return { ...state, error: action.payload, loading: false };
        case "CREATE_POST_SUCCESS":
            return { ...state, posts: [action.payload, ...state.posts] };
        case "LIKE_POST_SUCCESS":
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === action.payload.postId
                        ? { ...post, likes: action.payload.likes }
                        : post
                )
            };
        case "COMMENT_POST_SUCCESS":
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === action.payload.postId
                        ? { ...post, comments: [...post.comments, action.payload.comment] }
                        : post
                )
            };
        default:
            return state;
    }
};

export default postreducer;
