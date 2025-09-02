const express = require("express");
const eventLogger = require("./eventLogger");
const delayMessage = require("./delay");

const app = express();
const PORT = 3000;


app.get("/", (req, res) => {
  res.send("Welcome! Try /test, /emit?message=Hello, or /delay?message=Hi&time=2000");
});

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/emit", (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Missing 'message' query parameter" });
  }

  eventLogger.emit("log", message);

  res.json({
    status: "Event logged",
    timestamp: new Date().toISOString(),
  });
});

app.get("/delay", async (req, res) => {
  const { message, time } = req.query;

  if (!message || !time) {
    return res.status(400).json({ error: "Missing 'message' or 'time' query parameter" });
  }

  try {
    const result = await delayMessage(message, parseInt(time));
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
