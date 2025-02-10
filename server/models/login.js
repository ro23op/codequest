import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    userId: String,
    ipAddress: String,
    browser: String,
    os: String,
    deviceType: String,
    loginTime: { type: Date, default: Date.now },
    status: String
});

export default mongoose.model("UserLogin",loginSchema);