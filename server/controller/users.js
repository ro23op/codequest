import mongoose from 'mongoose';
import users from '../models/auth.js';

export const getallusers = async(req,res)=>{
    try {
        const allusers = await users.find()
        const alluserdetails = []
        allusers.forEach((user) => {
            alluserdetails.push({_id:user._id,
                name:user.name,
            about:user.about,
            joinedon : user.joinedon,
        });
        });
        res.status(200).json(alluserdetails)
    } catch (error) {
        res.status(404).json({message:error.message})
        return
    }
}

export const updateprofile = async(req,res)=>{
    const {id:_id} = req.params;
    const {name,about,tags} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("user unavailable")
    }
    try {
        const updateprofile = await users.findByIdAndUpdate(_id,{$set:{name:name,about:about,tags:tags}},
            {new:true}
        );
        res.status(200).json(updateprofile)
    } catch (error) {
        res.status(404).json({message:error.message})
        return
    }
}

export const addFriend = async (req, res) => {
  try {
      const { userId, friendId } = req.body;
      const user = await users.findById(userId);
      const friend = await users.findById(friendId);

      if (!user || !friend) {
          return res.status(404).json({ message: "User not found" });
      }

      // Check if already friends
      if (!user.friends.includes(friendId)) {
          user.friends.push(friendId);
          await user.save();
      }

      const updatedUser = await users.findById(userId).populate("friends"); // Populate friends for frontend
    //   console.log("Updated User:", updatedUser);
      res.status(200).json(updatedUser); // Send updated user data
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
  }
};
