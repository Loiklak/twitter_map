const Twit = require('twit');
const config = require('../config');

const T  = new Twit({
    consumer_key: config.twitterCred.consumer_key,
    consumer_secret: config.twitterCred.consumer_secret,
    access_token: config.twitterCred.access_token,
    access_token_secret: config.twitterCred.access_token_secret
});


/**
 * Vérifie la validité des credentials Twitter
 */
function check_connection () {
    //Vérifier la validité des credentials
    T.get('account/verify_credentials', { skip_status: true })
    .catch(function (err) {
        console.log('caught error', err.stack)
    })
    .then(function () {
        console.log('Login to Twitter successful !')
    });
};

/** Permet de récupérer les tweets associé au hashtag.
    * Renvoie un array avec dedans les JSON de chaque tweet
    * @param {string} hashtag - Hashtag donc on veut les résultats associés
    * @param {int} last_tweet_id - ID du Tweet à partir duquel (exlclus) on veut récupérer des résultats
    * @param {function} callback - Fonction qui recevoir en argument les résultats de la recherche (un array)
    */
function search (hashtag, last_tweet_id=0, callback=(err, data, response)=>console.log(data)) {
    T.get('search/tweets', { q: `#${hashtag}`, count: 200, since_id: last_tweet_id}, callback)
}

module.exports = { search };