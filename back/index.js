const express = require('express');
const { shortPoll } = require("./shortPolling/shortPoll");
const db = require('./database');
const moment = require('moment');
const { Op } = require('sequelize');

const app = express();

server = app.listen(5000, () => {
    console.log('Server is on !')
});

const hashtag = "greve";

const io = require('socket.io')(server);

// Envoie la liste de tweets en BDD quand le client se connecte
io.on('connection', function(socket) {
    db.Tweet.findAll({
        attributes: ['location'],
        raw: true
    }).then(results => socket.emit('tweetsList', results));

    socket.emit('hashtag', hashtag);

    socket.on('fromDate', function(newDate) {
        db.Tweet.findAll({
            where: { date: { [Op.gte]: moment(newDate.date + ' ' + newDate.hour).toDate() } },
            attributes: ['location'],
            raw: true
        })
        .then((results) => {
            socket.emit('tweetsList', results)
        })
    })
})

const sendTweet = function(message) {
    io.emit("newTweet", message)
}

const loopingFunction = function ( ) {
    shortPoll(hashtag, sendTweet)
}
//Shortpolling vers l'API Twitter toutes les 5 secondes
setInterval(loopingFunction, 5000);