require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { MongoClient } = require("mongodb");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/chatapp";

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI)
  .then((client) => {
    console.log("✅ Connected to MongoDB");
    db = client.db(); // default db name from URI
  })
  .catch((err) => console.error("MongoDB connection error:", err));

let onlineUsers = new Set();

io.on("connection", (socket) => {
  console.log("A user connected");

  // User registers
  socket.on("register", async (username) => {
    socket.username = username;
    onlineUsers.add(username);

    io.emit("onlineUsers", Array.from(onlineUsers));
    console.log(`User registered: ${username}`);

    // Send chat history (last 20 messages)
    const messages = await db
      .collection("messages")
      .find()
      .sort({ time: -1 })
      .limit(20)
      .toArray();

    socket.emit("chatHistory", messages.reverse());
  });

  // Handle chat messages
  socket.on("chatMessage", async (msg) => {
    const message = { user: socket.username, msg, time: new Date() };

    // Save directly in MongoDB
    await db.collection("messages").insertOne(message);

    // Broadcast to everyone
    io.emit("chatMessage", message);
  });

  // Admin announcement
  socket.on("adminMessage", (msg) => {
    const message = { user: "Admin", msg, time: new Date() };
    io.emit("chatMessage", message);
  });

  // Disconnect
  socket.on("disconnect", () => {
    if (socket.username) {
      onlineUsers.delete(socket.username);
      io.emit("onlineUsers", Array.from(onlineUsers));
      console.log(`${socket.username} disconnected`);
    }
  });
});

// Serve frontend (if you make HTML/React UI)
app.use(express.static("public"));

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
