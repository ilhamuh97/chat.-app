import { Server } from "socket.io"
import http from "http"
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

export function getReceiverSocketId(userId: string): string | undefined {
    return userSocketMap.get(userId);
}

// Map to keep track of online users
const userSocketMap: Map<string, string> = new Map(); //userId -> socketId

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
        userSocketMap.set(userId, socket.id);
    }

    io.emit("getOnlineUsers", Object.keys(Object.fromEntries(userSocketMap)));

    socket.on("disconnect", () => {
        userSocketMap.delete(userId);
        io.emit("getOnlineUsers", Object.keys(Object.fromEntries(userSocketMap)));
    });
});

export { io, app, server }