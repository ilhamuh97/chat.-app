import { Request, Response } from 'express';
import User from '../models/user.model';
import Message from '../models/message.model';
import { IGetUserAuthInfoRequest } from '../types/user';
import cloudinary from '../lib/cloudinary';

export const getUsersForSidebar = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = (req as any).user._id;
        // Exclude the logged-in user from the list
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('_id fullName email profilePicture');
        res.status(200).json({ users: filteredUsers });

    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userToChatId } = req.params;
        const loggedInUserId = (req as IGetUserAuthInfoRequest).user._id;

        // Fetch messages between logged-in user and the specified user
        const messages = await Message.find({
            $or: [
                { sender: loggedInUserId, recipient: userToChatId },
                { sender: userToChatId, recipient: loggedInUserId }
            ]
        });

        res.status(200).json({ messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { text, image } = req.body;
        const { id: recipientId } = req.params;
        const senderId = (req as IGetUserAuthInfoRequest).user._id;

        let imageUrl = "";
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            if (uploadResponse.error) {
                return res.status(500).json({ message: "Error uploading image." });
            } else {
                imageUrl = uploadResponse.secure_url;
            }
        }

        const newMessage = new Message({
            sender: senderId,
            recipient: recipientId,
            content: text,
            imageUrl: imageUrl || "",
        });

        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully.", data: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
