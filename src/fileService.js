const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

async function writeFile(fileName, data) {
  const dataJSON = JSON.stringify(data);
  return writeFileAsync(fileName, dataJSON);
}
async function readFile(fileName) {
  return readFileAsync(fileName);
}

module.exports = {
  writeFile,
  readFile
};
