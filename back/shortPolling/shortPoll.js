const {poll} = require('./poll');
const db = require('../database');
const sequelize = require('sequelize');

/**
 * Fonction qui éxécute le shortpolling ver Twitter
 * @param {string} hashtag
 * @returns {function} - Fonction qui permet d'arrêter le shortpolling
 */
function shortPoll (hashtag, sendTweet) {
    db.Tweet.findAll({
        attributes: [[sequelize.fn('max', sequelize.col('tweetId')), 'maxId']],
        raw: true
    }).then((lastTweetId) => {
        poll(hashtag, lastTweetId[0].maxId, sendTweet)
    })
}

module.exports = {shortPoll}