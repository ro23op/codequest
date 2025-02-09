import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js"

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "social_media_posts", // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov"]
    }
});

const upload = multer({ storage });

export default upload;
