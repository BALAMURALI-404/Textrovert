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
    }
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;