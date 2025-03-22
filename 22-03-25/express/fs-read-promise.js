const fs = require('fs').promises;

//using promise
fs.readFile('sample.txt', 'utf8')
    .then(data => console.log("File content:", data))
    .catch(err => console.error("Error reading file:", err));