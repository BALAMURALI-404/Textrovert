import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profilePic: {
        type: String,
    },
    profilePicId: {
        type: String,
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }, 
    verificationToken: { 
        type: String
    }, 
    verificationTokenExpiry: { 
        type: Date 
    },
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;