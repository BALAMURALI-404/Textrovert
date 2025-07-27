import Message from "../model/messages.model";
import User from "../model/user.model";


export const getUsersForSideBar = async (req, res) => {
    try{
        const loggedInUserId = req.User._id;
        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getMessages = async (req, res) => {
    try{
        const { id:toChatId } = req.params;
        const fromId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: fromId, reciverId: toChatId},
                { senderId: toChatId, reciverId: fromId }
            ]
        })
        res.status(200).json(messages);
    }
    catch(error){
        console.error("Error fetching messages:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponce = await cloundinary.uploader.upload(image);
            imageUrl = uploadResponce.secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({message: "Internal server error"});
    }
}