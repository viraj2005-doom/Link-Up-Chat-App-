import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../services/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user?.userId;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
            .select("fullName email profilePicture");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error fetching users for sidebar:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }

}

export const getMessagesBetweenUsers = async (req, res) => {
    try {
        const { id: usertochatid } = req.params;
        const myId = req.user?.userId;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: usertochatid },
                { senderId: usertochatid, receiverId: myId }
            ] //find all the messages between the logged in user and the user to chat with
        })
            .populate("senderId", "fullName profilePicture")
            .populate("receiverId", "fullName profilePicture")

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessagesBetweenUsers: ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?.userId;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({    
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        const populatedMessage = await Message.findById(newMessage._id)
            .populate("senderId", "fullName profilePicture")
            .populate("receiverId", "fullName profilePicture")

        //todo: realtime message functionality using socket.io
        res.status(201).json(populatedMessage)


    } catch (error) {
        console.log("Error in sendMessage: ", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
