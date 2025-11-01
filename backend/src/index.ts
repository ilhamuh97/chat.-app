import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";

dotenv.config();

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});