const { readFileData, appendFileData } = require("./fileOperation");

console.log("Initial File Content:");
readFileData();

setTimeout(() => {
  appendFileData();

  setTimeout(() => {
    console.log("\nUpdated File Content:");
    readFileData();
  }, 500);
}, 500);
