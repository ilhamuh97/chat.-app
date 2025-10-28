import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken, isValidEmail } from '../lib/utils';

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

export const login = (req: Request, res: Response) => {
    res.send("Login route");
};

export const logout = (req: Request, res: Response) => {
    res.send("Logout route");
};