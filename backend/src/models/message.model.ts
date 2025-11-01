import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
    sender: mongoose.Types.ObjectId;
    recipient: mongoose.Types.ObjectId;
    content: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;