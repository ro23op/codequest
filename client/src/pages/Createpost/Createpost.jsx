import React, { useState } from 'react';
import './Createpost.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../action/post';

function CreatePost() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentuserreducer);

    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user) {
            alert("Login to create a post");
            return;
        }
    
        if (!content && !media) {
            alert("Please enter content or upload media");
            return;
        }
    
        const formData = new FormData();
        formData.append("userId", user.result._id);
        formData.append("content", content);
    
        if (media) {
            formData.append("media", media); // Send file to backend
        }
    
        try {
            await dispatch(createPost(formData, navigate));
            alert("You have successfully created a post!");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post");
        }
    };
    

    return (
        <div className="create-post">
            <div className="create-post-container">
                <h1>Create a Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="create-form-container">
                        <label htmlFor="post-content">
                            <h4>Content</h4>
                            <p>Share your thoughts or information</p>
                            <textarea
                                id="post-content"
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write something..."
                                rows="5"
                            ></textarea>
                        </label>
                        <label htmlFor="post-media">
                            <h4>Media</h4>
                            <p>Upload an image or video (optional)</p>
                            <input
                                type="file"
                                id="post-media"
                                accept="image/*, video/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setMedia(file);
                                    }
                                }}
                            />

                        </label>
                    </div>
                    <input type="submit" value="Create Post" className="post-btn" />
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
