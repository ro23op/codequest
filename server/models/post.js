import mongoose from "mongoose"

const Postschema = new mongoose.Schema({
    body: { type: String, required: "Post must have content" },
    media: { type: String, default: "" }, // URL for images/videos
    postedBy: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked
    comments: [
        {
            commentBody: { type: String, required: true },
            commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            commentedOn: { type: Date, default: Date.now },
        }
    ],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Post",Postschema)