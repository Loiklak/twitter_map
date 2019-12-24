const express = require('express');
const { shortPoll } = require("./shortPolling/shortPoll");
const db = require('./database');

const app = express();

server = app.listen(5000, () => {
    console.log('Server is on !')
});

const hashtag = "SchoolDays";

const io = require('socket.io')(server);

// Envoie la liste de tweets en BDD quand le client se connecte
io.on('connection', function(socket) {
    db.Tweet.findAll({
        attributes: ['location'],
        raw: true
    }).then(results => socket.emit('tweetsList', results));
})

// io.on('connection', (socket) => socket.emit('tweetsList', ['ok', 'ok', 'supelec est la']))

const sendTweet = function(message) {
    io.emit("newTweet", message)
    console.log('SENT')
}

const loopingFunction = function ( ) {
    shortPoll(hashtag, sendTweet)
}
//Shortpolling vers l'API Twitter toutes les 5 secondes
setInterval(loopingFunction, 5000);

/*const test = () => {
    io.emit('newTweet', {type: 'Point', coordinates: [0, 0]})
    console.log('SENT')
}

setInterval(test, 2000);*/