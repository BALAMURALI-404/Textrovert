import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js";
import cloudinary from "cloudinary";


export const signup = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        if(!name || !email || !password) return res.status(400).json({message: "All fields are required"});
        if(password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters long"});

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
        })
        if(!newUser) return res.status(400).json({message: "Invalid user data"});
        else{
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
    }
    catch(error){
        console.error("Error during signup:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        if(!email || !password) return res.status(400).json({message: "All fields are required"});
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({message: "Invalid credentials"});

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        });

    }
    catch(error){
        console.error("Error during login:", error);
        res.status(500).json({message: "Internal server error"});
    }

}

export const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    }
    catch(error){
        console.error("Error during logout:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfile = async (req,res) => {
    try{
        const {profilePic} = req.body;
        const UserId = req.user._id;

        if(!profilePic) return res.status(400).json({message: "Profile picture is required"});

        const uploadResponce = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(UserId,{profilePic: uploadResponce.secure_url},{new: true});

        res.status(200).json(updatedUser);
    }
    catch(error){
        console.error("Error during profile update:", error);
        res.status(500).json({message: "Internal server error"});
    }

}

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.error("Error during authentication check:", error);
        res.status(500).json({message: "Internal server error"});
    }
}