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


function scrapping(err, data, response) {
    function toMySQLDate(twitDate) {
        function toMonthNumber (month) {
            switch (month) {
                case "Jan":
                    return 01;
                case "Feb":
                    return 02;
                case "Mar":
                    return 03;
                case "Apr":
                    return 04;
                case "May":
                    return 05;
                case "Jun":
                    return 06;
                case "Jul":
                    return 07;
                case "Aug":
                    return 08;
                case "Sep":
                    return 09;
                case "Oct":
                    return 10;
                case "Nov":
                    return 11;
                case "Dec":
                    return 12;
            }
        }
        const array = twitDate.split(" ");
        return (array[5] + "-" + toMonthNumber(array[1]) + "-" + array[2] + " " + array[3]);
    };
    data.statuses.map(function (tweet) {
        console.log({
            "id": tweet.id,
            "date": toMySQLDate(tweet.created_at),
            "location": tweet.user.location
        })
    })
}


function search (hashtag, last_tweet_id=0, callback=scrapping) {
    /*Permet de récupérer les tweets associé au hashtag.
    [Arg] Callback : Mettre dedans la fonction qui va mettre les tweets dans la BDD
    [OPTIONAL] Tweets seulement après le last_tweet_id (le dernier tweet en base de donnée typiquement)
    Renvoie un array avec dedans les JSON de chaque tweet
    Les infos utiles sont : (où tweet est un object de data.statuses)
    * tweet.id (pour savoir quel est le dernier tweet que l'on a reçu)
    * tweet.statuses.created_at (la date)
    * tweet.statuses.user.location (pour la localisation du tweet)
    */

    T.get('search/tweets', { q: `#${hashtag}`, count: 100, since_id: last_tweet_id}, callback)
}

search("chaserice", 120214)