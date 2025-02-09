import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, likePost, commentOnPost } from "../../action/post";
import { getUserFriends } from "../../action/users";
import "../../component/Homemainbar/Homemainbar.css";

function HomemainbarP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentuserreducer?.result); // Fix user structure
  const userFriends = useSelector((state)=> state.currentuserreducer?.result?.friends) || []
  const {posts,loading} = useSelector((state)=>state.postreducer)
  const [comments, setComments] = useState({});

  useEffect(() => {
    dispatch(fetchPosts());
    if (user?._id) {  
      // console.log("Fetching friends for user:", user._id);
      dispatch(getUserFriends(user._id));
    }
  }, [dispatch, user?._id]);
  

  // Safe check for userFriends length
  const canPost = () => userFriends?.length >= 1;

  const checkAuth = () => {
    if (!user) {
      alert("Login or signup to create a post");
      navigate("/Auth");
    } else if (!canPost()) {
      alert("You need at least 1 friend to post!");
    } else {
      navigate("/Createpost");
    }
  };

  const handleLike = (postId) => {
    if (!user) {
      alert("Login to like posts!");
      return;
    }
    dispatch(likePost(postId, user.id));
  };

  const handleCommentChange = (postId, value) => {
    setComments({ ...comments, [postId]: value });
  };

  const handleComment = (postId) => {
    if (!user) {
      alert("Login to comment!");
      return;
    }
    if (comments[postId]?.trim()) {
      dispatch(commentOnPost(postId, user.id, comments[postId]));
      setComments({ ...comments, [postId]: "" });
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        <h1>Public Section</h1>
        <button className="ask-btn" onClick={checkAuth}>
          Create a Post
        </button>
      </div>

      {/* Post List */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="post-list">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="post-card">
                <p className="post-user">{post.postedBy}</p>
                <p className="post-content">{post.body}</p>
                {post.mediaUrl && (
                  <img src={post.mediaUrl} alt="Media" className="post-image" />
                )}
                <div className="post-actions">
                  <button className="like-btn" onClick={() => handleLike(post._id)}>
                    👍 {post.likes.length}
                  </button>
                  <input
                    type="text"
                    className="comment-input"
                    placeholder="Add a comment..."
                    value={comments[post._id] || ""}
                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                  />
                  <button className="comment-btn" onClick={() => handleComment(post._id)}>
                    💬
                  </button>
                </div>
                <div className="post-comments">
                  {post.comments.map((c, index) => (
                    <p key={index} className="comment-text">
                      <strong>{c.user?.name}:</strong> {c.text}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomemainbarP;
