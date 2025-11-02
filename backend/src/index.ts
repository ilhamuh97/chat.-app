import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";

import { app, server } from "./lib/socket";

import "./lib/resetDataBase"; // Import to initialize the reset job

import path from "path";

const __dirname = path.resolve();

// Serve frontend build
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "dist/client")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "dist/client", "index.html"));
    });
}



dotenv.config();

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});