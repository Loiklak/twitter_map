const {poll} = require('./poll');

/**
 * Fonction qui éxécute le shortpolling ver Twitter
 * @param {string} hashtag
 * @returns {function} - Fonction qui permet d'arrêter le shortpolling
 */
function shortPoll (hashtag, io) {
    interval_id = setInterval(poll(hashtag, io), 2002);
    return ()=>clearInterval(interval_id);
}