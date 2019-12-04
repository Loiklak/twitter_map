const Twit = require('twit');
const config = require('./config');

const T  = new Twit({
    consumer_key: config.twitterCred.consumer_key,
    consumer_secret: config.twitterCred.consumer_secret,
    access_token: config.twitterCred.access_token,
    access_token_secret: config.twitterCred.access_token_secret
});

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


function search (hashtag, last_tweet_id=0) {
    /*Permet de récupérer les tweets associé au hashtag.
    [OPTIONAL] Tweets seulement après le last_tweet_id (le dernier tweet en base de donnée typiquement)
    Renvoie un array avec dedans les JSON de chaque tweet
    Les infos utiles sont : (où tweet est un object de data.statuses)
    * tweet.id (pour savoir quel est le dernier tweet que l'on a reçu)
    * tweet.statuses.created_at (la date)
    * tweet.statuses.user.location (pour la localisation du tweet)
    */

    T.get('search/tweets', { q: `#${hashtag}`, count: 100, since_id: last_tweet_id}, function(err, data, response) {
        //console.log(data.statuses.map(tweet => tweet.user.location));
        return data.statuses
      })
}

search("chaserice", 1202145)