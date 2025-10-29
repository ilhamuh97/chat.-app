import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken, isValidEmail } from '../lib/utils';
import { IGetUserAuthInfoRequest } from '../types/user';
import cloudinary from '../lib/cloudinary';

export const signup = async (req: Request, res: Response) => {
    try {
        // Ensure body is defined
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing." });
        }

        // Destructure safely
        const { fullName, email, password } = req.body as Partial<IUser>;

        // Basic validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Hash password and create user
        const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        // Generate token and send response
        generateToken(newUser._id, res);
        res.status(201).json({
            message: "User created successfully.", data: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        });

    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // Ensure body is defined
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing." });
        }

        // Destructure safely
        const { email, password } = req.body as Partial<IUser>;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const isPasswordCorrect = await bcrypt.compare(password || "", user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        generateToken(user._id, res);
        res.status(200).json({
            message: "Login successful.", data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePicture: user.profilePicture,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error." });
    }

    res.send("Login route");
};

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({ message: "Internal server error." });
    }
    res.send("Logout route");
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { profilePicture } = req.body;
        const userId = (req as IGetUserAuthInfoRequest).user._id

        if (!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required." });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);

        if (uploadResponse.error) {
            return res.status(500).json({ message: "Error uploading image." });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: uploadResponse.secure_url }, { new: true });
        res.status(200).json({ message: "Profile updated successfully.", data: updatedUser });

    } catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({ message: "Internal server error." });
    }
    res.send("Logout route");
};

export const checkAuth = async (req: Request, res: Response) => {
    try {
        const user = (req as IGetUserAuthInfoRequest).user;
        res.status(200).json({ message: "User is authenticated.", data: user });
    } catch (error) {
        console.error("Error in checkAuth controller:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}