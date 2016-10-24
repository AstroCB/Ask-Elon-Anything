require('./heroku'); // Config Heroku ports
const Twit = require('twit'); // Lowercase for Heroku, but usually capitalized
const fs = require('fs');
const elonId = 789256792677179392; // AskElon user ID
const elon = require('./elon').quotes;
try {
    console.log("Deployed locally; using stored credentials");
    const credentials = require('./credentials'); // For local testing
} catch (e) {
    console.log("Deployed remotely; using Heroku credentials");
}
const bot = new Twit({
    consumer_key: 'rkWDuXPE4oVgqDbsOANVUtRvY',
    consumer_secret: process.env.consumer_secret || credentials.consumer_secret,
    access_token: '789256792677179392-fc2CyMSYb5fgpD36Nt1wlBA8DA0BYhW',
    access_token_secret: process.env.access_token_secret || credentials.access_token_secret
});
bot.tweetReply = function(msg, reply_to) {
    bot.post('statuses/update', {
        status: msg,
        in_reply_to_status_id: reply_to
    }, function(err, data, response) {
        if (!err) {
            console.log("Tweet posted:");
            console.log(data);
        } else {
            console.log("ERR: " + err);
        }
    });
}

function getRandomElon() {
    var randInd = Math.floor(Math.random() * (elon.length + 1));
    return elon[randInd];
}

function getTweetableElon(userLength) {
    var elonQuote = getRandomElon();
    // 140 characters / tweet - (length of username and 1 character each for @ and space)
    var acceptableLength = 140 - (userLength + 2);
    while (elonQuote.length > acceptableLength) { // Make sure tweet is short enough
        elonQuote = getRandomElon();
    }
    return elonQuote;
}

const stream = bot.stream('user', {
    replies: "all"
});

stream.on('tweet', function(tweet) {
    console.log("Tweet received: " + tweet);
    var replyId = tweet.in_reply_to_user_id;
    var user = tweet.user;
    if (replyId) { // Is a reply
        if (user.id != elonId && replyId === elonId) { // Isn't AskElon and is a reply to AskElon
            var msg = "@" + user.screen_name + " " + getTweetableElon(user.screen_name.length);
            bot.tweetReply(msg, tweet.id_str);
        }
    }
});
stream.on('error', function(err) {
    console.log("Stream error: " + err);
    console.log("Restarting stream...");
    stream.stop();
    stream.start();
});
console.log("Starting stream...");
stream.start();
