import mongoose from "mongoose";

const Userschema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    about:{type:String},
    tags:{type:[String]},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    joined:{type:Date,default:Date.now},
    otp: { type: String }, // Store OTP temporarily
    otpExpires: { type: Date }, // Expiry time for OTP
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("User",Userschema)