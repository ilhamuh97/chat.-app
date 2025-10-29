import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { Types } from "mongoose";
import { IGetUserAuthInfoRequest } from "../types/user";

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret") as { userId: Types.ObjectId };
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid token." });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        (req as IGetUserAuthInfoRequest).user = user;
        next();

    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}