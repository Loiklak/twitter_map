const Twit = require('twit');
const config = require('../config');

const T  = new Twit({
    consumer_key: config.twitterCred.consumer_key,
    consumer_secret: config.twitterCred.consumer_secret,
    access_token: config.twitterCred.access_token,
    access_token_secret: config.twitterCred.access_token_secret
});


// Pour vérifier la validité de nos crédentials Twitter
function check_connection () {
    T.get('account/verify_credentials', { skip_status: true })
    .catch(function (err) {
        console.log('caught error', err.stack)
    })
    .then(function () {
        console.log('Login to Twitter successful !')
    });
};

/** 
    * Permet de récupérer les tweets associé au search_term et les envoyer à la fonction de callback.
    * @param {string} search_term - Terme donc on veut les résultats associés
    * @param {int} last_tweet_id - ID du Tweet à partir duquel (exlclus) on veut récupérer des résultats
    * @param {function} callback - Fonction qui recevoir en argument les résultats de la recherche (un array)
*/
function search (search_term, last_tweet_id, callback) {
    T.get('search/tweets', { q: `${search_term}`, count: 2, since_id: last_tweet_id}, callback)
}

module.exports = { search };