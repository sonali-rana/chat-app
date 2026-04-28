import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
//socket gives CORS errors thats why we use origin CORS
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; //{userId : socketID}

//listen to connections
io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;

	if (!userId || Array.isArray(userId)) return;

	// attach / update user socket
	userSocketMap[userId] = socket.id;

	console.log("connected:", userId, socket.id);

	// send online users
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("disconnected:", userId);

		// only delete if socket matches
		if (userSocketMap[userId] === socket.id) {
			delete userSocketMap[userId];
		}

		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
