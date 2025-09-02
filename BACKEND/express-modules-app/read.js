const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "Data.txt");

function readFileContent(callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback("Error reading file: " + err.message);
    } else {
      callback(data || "File is empty.");
    }
  });
}

module.exports = { readFileContent };
