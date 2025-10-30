import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minLength: 6 },
        profilePicture: { type: String, default: "" },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;