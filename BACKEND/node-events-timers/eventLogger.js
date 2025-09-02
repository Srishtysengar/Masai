const EventEmitter = require("events");
const fs = require("fs");

const emitter = new EventEmitter();

emitter.on("log", (message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}`;
  console.log(logEntry);

  fs.appendFile("events.log", logEntry + "\n", (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
});

module.exports = emitter;
