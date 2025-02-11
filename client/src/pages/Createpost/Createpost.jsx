import React, { useState } from 'react';
import './Createpost.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../action/post';

function CreatePost() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.currentuserreducer);
    const [previewUrl, setPreviewUrl] = useState("");
    const [file, setFile] = useState(null);
    const [content, setContent] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Login to create a post");
            return;
        }

        if (!content && !file) {
            alert("Please enter content or upload media");
            return;
        }

        const formData = new FormData();
        formData.append("userId", user.result._id);
        formData.append("content", content);

        if (file) {
            formData.append("media", file); // Send file to backend
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
                            <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
                            {previewUrl && (
                                <div className="mt-2">
                                    {file.type.startsWith("image") ? (
                                        <img src={previewUrl} alt="Preview" className="w-40 h-40 object-cover" />
                                    ) : (
                                        <video src={previewUrl} controls className="w-40 h-40"></video>
                                    )}
                                </div>
                            )}

                        </label>
                    </div>
                    <input type="submit" value="Create Post" className="post-btn" />
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
