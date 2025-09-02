const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

function readFileData() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("File not found, creating a new one...");
        fs.writeFile(filePath, "This is the original content.\n", (err) => {
          if (err) throw err;
          console.log("New file created with initial content.");
        });
      } else {
        console.error("Error reading file:", err);
      }
    } else {
      console.log(data || "File is empty.");
    }
  });
}

function appendFileData() {
  fs.appendFile(filePath, "This is Appended data\n", (err) => {
    if (err) {
      console.error("Error appending to file:", err);
    } else {
      console.log("Appending data...");
    }
  });
}

module.exports = { readFileData, appendFileData };
