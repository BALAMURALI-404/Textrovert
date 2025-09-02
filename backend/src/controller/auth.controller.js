import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import crypto, { Verify } from "crypto";
import { sendEmail } from "../lib/mailer.js";
import { verificationEmailTemplate } from "../templates/verificationEmail.js";


export const signup = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        if(!name || !email || !password) return res.status(400).json({message: "All fields are required"});
        if(password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters long"});

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiry: tokenExpiry,
        })
        if(!newUser) return res.status(400).json({message: "Invalid user data"});
        await newUser.save();

        const verificationLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        await sendEmail(
            newUser.email,
            "Verify your Textrovert account",
            verificationEmailTemplate(newUser.name, verificationLink)
        );

        res.status(201).json({message: "Signup successful! Please check your email to verify your account."});
    }
    catch(error){
        console.error("Error during signup:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        if(!email || !password) return res.status(400).json({message: "All fields are required"});
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message: "Invalid credentials"});

        if(!user.isVerified){
            if(user.verificationTokenExpiry && user.verificationTokenExpiry < Date.now()){
                await User.findByIdAndDelete(user._id);
                return res.status(400).json({message: "Verification token expired. Please sign up again."});
            }
            return res.status(400).json({message: "Please verify your email to login."});
        }

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

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) return res.status(400).json({ message: "Profile picture is required" });

        if(req.user.profilePicId) await cloudinary.uploader.destroy(req.user.profilePicId);

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url, profilePicId: uploadResponse.public_id },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error during profile update:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateName = async (req, res) => {
    try{
        const{ name } = req.body;
        const userId = req.user._id;
        if(!name) return res.status(400).json({message: "Name is required"});
        if(name.length < 3) return res.status(400).json({message: "Name must be at least 3 characters long"});
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {name},
            {new: true}
        ).select("-password");
        res.status(200).json(updatedUser);
    }
    catch(error){
        console.error("Error during name update:", error);
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