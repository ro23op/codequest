import mongoose from "mongoose";

const userschema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    about:{type:String},
    tags:{type:[String]},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    joined:{type:Date,default:Date.now}
})

export default mongoose.model("User",userschema)