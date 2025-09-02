// index.js
const express = require("express");
const getFileInfo = require("./fileInfo");
const parseUrl = require("./urlparser");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome! Try /test, /fileinfo?filepath=folder/sample.txt, or /parseurl?url=https://masaischool.com/course?name=backend&duration=6weeks");
});


app.get("/test", (req, res) => {
  res.send("Test route is working!");
});


app.get("/fileinfo", (req, res) => {
  const { filepath } = req.query;

  if (!filepath) {
    return res.status(400).json({ error: "Please provide a filepath query parameter" });
  }

  const result = getFileInfo(filepath);
  res.json(result);
});

app.get("/parseurl", (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Please provide a url query parameter" });
  }

  const result = parseUrl(url);
  res.json(result);
});


app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    hint: "Available routes: /test, /fileinfo?filepath=..., /parseurl?url=..."
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
