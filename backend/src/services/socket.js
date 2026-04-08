import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";

export const app = express();
export const server = http.createServer(app);
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

export const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});

const userSocketMap = {};

export const getReceiverSocketId = (userId) => userSocketMap[userId];

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("Unauthorized"));
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        socket.userId = decoded.userId;
        next();
    } catch (error) {
        next(new Error("Unauthorized"));
    }
});

io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log("socket connected", socket.id, userId);

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        if (userId) {
            delete userSocketMap[userId];
        }

        console.log("socket disconnected", socket.id, userId);

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
