import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Types } from "mongoose";


export const generateToken = (userId: Types.ObjectId, res: Response) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not set");
    }
    const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
    });

    return token;
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};