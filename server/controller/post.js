import Post from "../models/post.js";
import users from "../models/auth.js";
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
const canUserPost = async (userId) => {
    const user = await users.findById(userId);
    if (!user) return false;
  
    const today = new Date().toISOString().split('T')[0]; // Get today's date as YYYY-MM-DD
    if (user.lastPostDate !== today) {
      user.postsToday = 0;  // Reset posts if it's a new day
      user.lastPostDate = today;
      await user.save();
    }
  
    if (user.friends.length === 0) return false;
    if(user.friends.length<10){
    if(user.postsToday<user.friends.length){
        return true;
    }}
    if(user.friends.length>10){
        return true;
    }
  };
// Create Post
export const createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;
        if (!(await canUserPost(userId))) return res.status(403).json({ message: "Posting limit reached" });
        // Fetch user details
        const user = await users.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const file = req.file;
        // Ensure file is properly received
        if (file) {
            console.log("File received:", req.file);

            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: file.mimetype.startsWith("image") ? "image" : "video",
            });
            const newPost = new Post({
                postedBy: user.name,  // Ensure user has a `name` field
                body: content,
                media: result.secure_url
            });
            await newPost.save();
            users.findByIdAndUpdate(userId, { $inc: { postsToday: 1 } });
            res.json({ message: "Uploaded successfully", post: newPost });

        } else {
            // Create and save post
            const newPost = new Post({
                postedBy: user.name,  // Ensure user has a `name` field
                body: content,

            });
            await newPost.save();
            await users.findByIdAndUpdate(userId, { $inc: { postsToday: 1 } });
            res.status(201).json({ message: "Post created successfully!", newPost });

        }

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
    const { postId, username, comment } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(postId,{
                    $addToSet:{comments:[{commentBody:comment,commentedBy:username}]}
                });
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};