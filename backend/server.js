import express from "express"
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import notificationRoutes from './routes/notification.route.js';
import dotenv from 'dotenv';
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
//const express = require('express')

dotenv.config();

cloudinary.config({
cloud_name: process.env.CLOUDINARI_CLOUD_NAME,
api_key: process.env.CLOUDINARI_API_KEY,
api_secret: process.env.CLOUDINARI_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "5mb" })); //to parse req.body
app.use(express.urlencoded({ extended: true })) // to parse form data(urlencoded)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.get("/",(req,res) => {
    res.send("Server is ready")
})



app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
    connectMongoDB();
})