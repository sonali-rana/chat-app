// const express = require("express");
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.json()); //to parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser()); // parse cookies req.cookies.jwt

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//root route
// res.send("Hello World!");
// });

//earlier app.listen but due to websocket server.listen has been used
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server running on port ${PORT}`);
});
