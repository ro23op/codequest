import Post from "../models/post.js";
import users from "../models/auth.js";
import cloudinary from "cloudinary"

// Create Post
export const createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;
        let mediaUrl = "";

        // Ensure file is properly received
        if (req.file) {
            console.log("File received:", req.file);

            try {
                const uploadedMedia = await new Promise((resolve, reject) => {
                    const stream = cloudinary.v2.uploader.upload_stream(
                        { resource_type: "auto" },
                        (error, result) => (error ? reject(error) : resolve(result))
                    );
                    stream.end(req.file.buffer);
                });

                mediaUrl = uploadedMedia.secure_url; // Get Cloudinary URL
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return res.status(500).json({ error: "Cloudinary upload failed" });
            }
        }

        // Fetch user details
        const user = await users.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Create and save post
        const newPost = new Post({
            postedBy: user.name,  // Ensure user has a `name` field
            body: content,
            media: mediaUrl
        });

        await newPost.save();

        res.status(201).json({ message: "Post created successfully!", newPost });
    } catch (error) {
        console.error("Post creation error:", error);
        res.status(500).json({ error: "Post creation failed" });
    }
};
// Get All Posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        // console.log(posts)
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Like a Post
export const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json("Post not found");

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => id !== userId);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const { postId, userId, comment } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json("Post not found");

        const newComment = { userId, comment, createdAt: new Date() };
        post.comments.push(newComment);
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};