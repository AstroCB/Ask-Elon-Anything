/*
  Parses the raw data imported from the userscript into a plain text file (see
  filtered.txt) and then turns that file into a JavaScript array, which is then
  written to elon.js using the parser module written for this project.
*/

const fs = require('fs');
const parser = require('./parser');

const unfilteredtxt = parser.getInterface("unfiltered.txt");
var elonjs = [];
unfilteredtxt.on('line', function(line) {
    var match = line.match(/\"(.*)\"\,/);
    if (match && match[1]) {
        fs.appendFile("filtered.txt", match[1] + "\n");
        elonjs.push(match[1]);
    }
});
unfilteredtxt.on('close', function() {
    parser.writeToFile(elonjs);
});
