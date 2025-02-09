import express from "express"
import { createPost, getAllPosts, likePost, commentOnPost } from "../controller/post.js"
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js"

const router=express.Router();



router.post("/create", upload.single("media"), createPost);
router.get("/get", getAllPosts);
router.post("/like",auth, likePost);
router.post("/comment",auth,commentOnPost);


export default router;