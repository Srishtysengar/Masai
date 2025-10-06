import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDB from "./config/db.js";
import {initSocket} from "./realtime/socket.js"
import authRoutes from "./routes/auth.js"

dotenv.config();

connectDB()

const app = express();

app.use(cors({origin:process.env.CORS_ORIGIN, credentials:true}));

app.use("/api/auth", authRoutes);

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({message: err.message || "Server Error"});
})

const server=http.createServer(app);
initSocket(server);

const PORT =process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));