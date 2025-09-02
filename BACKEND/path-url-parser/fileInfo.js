const path = require("path");

function getFileInfo(filePath) {
  if (!filePath) {
    return { error: "Filepath is missing" };
  }

  return {
    fileName: path.basename(filePath),
    extension: path.extname(filePath),
    directory: path.dirname(filePath),
  };
}

module.exports = getFileInfo;
