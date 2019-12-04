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


function search (hashtag, last_tweet_id) {
    //Permet de récupérer les tweets à partir du last_tweet_id (le dernier tweet en base de donnée typiquement)
    T.get('search/tweets', { q: `#${hashtag}`, count: 100, since_id: last_tweet_id}, function(err, data, response) {
        console.log(data)
      })
}

//search("chaserice", 1202145)