const express = require('express');
const { shortPoll } = require("./shortPolling/shortPoll");
const db = require('./database');
const moment = require('moment');
const { Op } = require('sequelize');

//Setup the Express app
const app = express();

server = app.listen(5000, () => {
    console.log('Server is on !')
});


// Setup the search term for Twitter
const search_term = "feliz natal";


// Setup the sockets
const io = require('socket.io')(server);

// Envoie la liste de tweets en BDD quand le client se connecte + le search_term
io.on('connection', function(socket) {
    db.Tweet.findAll({
        attributes: ['location'],
        raw: true
    }).then(results => socket.emit('tweetsList', results));

    socket.emit('search_term', search_term);

    // Nouvelle liste de Tweets quand le client veut les tweets à partir d'une certaine date
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

// Fonction pour envoyer un nouveau tweet au front
const sendTweet = function(message) {
    io.emit("newTweet", message)
}

// La fonction qu'on rappelle dans le setInterval
const loopingFunction = function ( ) {
    shortPoll(search_term, sendTweet)
}
// Shortpolling vers l'API Twitter toutes les 5 secondes
setInterval(loopingFunction, 4000);