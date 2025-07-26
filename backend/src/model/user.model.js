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
        default: "https://res.cloudinary.com/dz1qj3x8h/image/upload/v1709301234/default-profile-pic.png",
    }
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;