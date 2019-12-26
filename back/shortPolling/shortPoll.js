const {poll} = require('./poll');
const db = require('../database');
const sequelize = require('sequelize');

/**
 * Fonction qui éxécute le shortpolling vers Twitter
 * @param {string} search_term
 * @param {sendTweet} - Fonction venant de index permettant d'envoyer un message via la websocket
 * @returns {function} - Fonction qui permet d'arrêter le shortpolling
 */
function shortPoll (search_term, sendTweet) {
    // Cherche l'ID de Tweet maximal en base
    db.Tweet.findAll({
        attributes: [[sequelize.fn('max', sequelize.col('tweetId')), 'maxId']],
        raw: true
    }).then((lastTweetId) => {
        poll(search_term, lastTweetId[0].maxId, sendTweet)
    })
}

module.exports = {shortPoll}