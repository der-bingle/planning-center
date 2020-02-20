const fs = require("fs");
const path = require('path')
const homedir = require('os').homedir();

let linkToDesktop = (filePath) => {
  let filename = path.basename(filePath, ".key");
  let linkPath = path.join(homedir, "Desktop", filename);
  return fs.symlink(filePath, linkPath, "file", err => {
    if (err) {
      throw err;
    }
  })
};

module.exports = linkToDesktop
// linkToDesktop("/Users/imac/Documents/Keynotes/2020-02-23.key")