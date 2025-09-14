import User from "../model/user.model.js";


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

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) return res.status(400).json({ message: "Query required" });

    const users = await User.find({
    name: { $regex: query, $options: "i" },
    _id: { $ne: req.user._id },
    isVerified: true, 
    }).select("_id name email profilePic");

    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};