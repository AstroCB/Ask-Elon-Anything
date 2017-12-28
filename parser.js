/*
  Parses text file of quotes into an array and stores it into a module which
  the bot imports as a list of possible replies for tweets.

  Can also be imported for use in parsing other files (see filterer.js).
*/
const fs = require('fs');
const lineReader = require('readline');

exports.getInterface = (file) => {
    return lineReader.createInterface({
        "input": fs.createReadStream(file)
    });
};

exports.writeToFile = (jsTxt) => {
    fs.writeFileSync('elon.js', ""); // Clear file first
    let jsStr = `exports.quotes = ${JSON.stringify(jsTxt)}`;
    fs.writeFileSync('elon.js', jsStr);
};

const quotestxt = exports.getInterface("quotes.txt");
let quotes = [];
quotestxt.on('line', (line) => {
    quotes.push(line);
});
quotestxt.on('close', () => {
    exports.writeToFile(quotes);
    console.log(require('./elon').quotes);
});
