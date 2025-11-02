import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./lib/db";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";

import { app, server } from "./lib/socket";

import "./lib/resetDataBase"; // Import to initialize the reset job

import path from "path";

// Serve frontend build
if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "client");
    app.use(express.static(clientPath));

    // React Router fallback (Express 5-safe)
    app.get("/:path(*)", (req, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}


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